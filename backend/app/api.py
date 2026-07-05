from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import matplotlib.pyplot as plt
import numpy as np
from scipy.integrate import odeint
import json

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

def dAdt(A, T, beta, gamma, N):
    S = A[0]
    I = A[1]
    R = A[2]

    return [
        -beta / N * I * S,
        beta / N * I * S - gamma * I,
        gamma * I
    ]

times = np.arange(0, 100, 1)
beta = 1/2
gamma = 1/5
N = 1000
S0, I0, R0 = N - 6, 6, 0

solved = odeint(dAdt, y0 = [S0, I0, R0], t = times, args = (beta, gamma, N))
solved_transposed = solved.transpose()
solved_transposed = [[entry.item() for entry in sublist] for sublist in solved_transposed]

sir = []

for i in range(len(solved_transposed[0])):
    sir.append({"day": i, "susceptible": solved_transposed[0][i], "infectious": solved_transposed[1][i], "recovered": solved_transposed[2][i]})

@app.get("/api", tags = ["api"])
async def show_outbreakr() -> dict:
    return {"outbreaks" : sir}



