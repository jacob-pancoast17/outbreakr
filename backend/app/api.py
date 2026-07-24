'''
This module contains the GET and POST routes for the app.
'''

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import fit_sir, fit_seir

app = FastAPI()

origins = [
    "http://localhost:5173",
    "localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"]
)

@app.get("/", tags = ["root"])
async def read_root() -> dict:
    return {"message" : "Welcome to the website!"}

@app.post("/seir")
async def show_graph(params: dict) -> dict:
    return {"outbreaks" : fit_seir(**params)}

@app.post("/sir")
async def show_graph(params: dict) -> dict:
    return {"outbreaks" : fit_sir(**params)}
