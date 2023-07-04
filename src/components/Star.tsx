import {useState, useEffect} from 'react';
/*
Represents one star. Grabs from the backend to supply data.
*/

export default function Star() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect ( () => {
        fetch('http://amesite.fly.dev')
        .then(response=> {
            if (response.ok) {
                return response.json()
            }
            throw response;
        })
        .then(data => {
            setData(data);
            console.log("logging...")
            console.log(data);
        }).finally( () => {
            setLoading(false);
            });
    });

    if(loading) return (
        <div>
        Loading data...
        </div>
    )
    

    return (
        <div>
            <a href="#">loaded<span className="tooltip">test</span></a>
        </div>
    )
}



