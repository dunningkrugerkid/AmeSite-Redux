from astroquery.simbad import Simbad
import astropy.coordinates as coord
import json, random
import numpy
import os
from fastapi import FastAPI
from fastapi import Response
import random
import uvicorn

Simbad.ROW_LIMIT = 15

class NumpyEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, numpy.integer):
            return int(obj)
        if isinstance(obj, numpy.floating):
            return float(obj)
        if isinstance(obj, numpy.ndarray):
            return obj.tolist()
        return super().default(obj)
    

app = FastAPI()

@app.get("/")
def read():
    done = False
    while not done:
        try:
            # formulate a coordinate and radius in terms of gmt relative
            coord_hrs1 = random.randint(0, 12)
            coord_min1 = random.randint(0, 59)
            coord_sec1 = random.randint(0, 59)
            coord_hrs2 = random.randint(0, 12)
            coord_min2 = random.randint(0, 59)
            coord_sec2 = random.randint(0, 59)
            radius_min = random.randint(0,59)
            radius_sec = random.randint(0, 59)
            
            coord_string = str(coord_hrs1)+"h"+str(coord_min1)+"m"+str(coord_sec1)+"s "+str(coord_hrs2)+"h"+str(coord_min2)+"m"+str(coord_sec2)+"s"
            radius_string = "0d"+str(radius_min)+"m"+str(radius_sec)+"s"
            result = Simbad.query_region(coord.SkyCoord(coord_string), radius=radius_string)
            done = True

        except ValueError: # Ensuring within range is not something I'm interested in doing atm, we're just going to reroll the strings until it works.
            continue

    # Get a list of the keys - these are the names of the columns
    keys = list(result.keys())

    # Iterate through all rows. Use `zip` with keys and the row to create a list of K/V pairs, which then passing to dict turns into a dictionary
    data = []
    for row in result.iterrows():
        data.append(dict(zip(keys, row)))

    # Once JSON encoding, you'll need to pass cls=NumpyEncoder to your call to json.dump / json.dumps to be able to handle Numpy's fancy special int types
    return Response(content=json.dumps(random.choice(data), cls=NumpyEncoder, indent=4), media_type="application/json")
    
    

