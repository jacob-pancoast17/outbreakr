'''
This module fits the SIR model.
'''

import numpy as np
from scipy.integrate import odeint

def dAdt(A, T, beta, gamma, N):
    S = A[0]
    I = A[1]
    R = A[2]

    return [
        -beta / N * I * S,
        beta / N * I * S - gamma * I,
        gamma * I
    ]

def fit_sir(days, beta, gamma, N, I0, R0):

    times = np.arange(0, days, 1)
    S0 = N - I0

    solved = odeint(dAdt, y0 = [S0, I0, R0], t = times, args = (beta, gamma, N))
    solved_transposed = solved.transpose()
    solved_transposed = [[entry.item() for entry in sublist] for sublist in solved_transposed]

    sir = []

    for i in range(len(solved_transposed[0])):
        sir.append({"day": i, "susceptible": solved_transposed[0][i], "infectious": solved_transposed[1][i], "recovered": solved_transposed[2][i]})

    return sir