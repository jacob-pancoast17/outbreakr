'''
This module contains the GET and POST routes for the app.
'''

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import fit_sir

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

@app.get("/api", tags = ["api"])
async def show_outbreakr() -> dict:
    return {"outbreaks" : fit_sir(days=100, beta=1/2, gamma=1/5, N=1000, I0=6, R0=0)}


