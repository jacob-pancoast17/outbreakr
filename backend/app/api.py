from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import matplotlib.pyplot as plt
import numpy as np
from scipy.integrate import odeint

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

@app.get("/api/outbreakr", tags = ["outbreakr"])
async def show_outbreakr() -> dict:
    return {"outbreaks" : "wip"}

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

plt.plot(times, solved_transposed[0], label = "Susceptible")
plt.plot(times, solved_transposed[1], label = "Infected")
plt.plot(times, solved_transposed[2], label = "Removed")

plt.legend()

plt.show()