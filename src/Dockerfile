# syntax=docker/dockerfile:1

FROM python:3.9.17-bullseye

WORKDIR /src

COPY requirements.txt requirements.txt

RUN pip3 install -r requirements.txt

COPY . .

CMD ["python", "-m", "uvicorn", "simbad_query:app", "--host=0.0.0.0", "--port=8080"]