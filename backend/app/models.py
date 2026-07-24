'''
This module fits the SIR model.
'''

import numpy as np
from scipy.integrate import odeint

def sir_system(A, T, beta, gamma, N):
    '''
    Creates the system of differential equations for the SIR model.

    Args:
        A (list): Values at time point 0 for S, I, R.
        T (list): Time intervals (ex. a list of days 0-100).
        beta (float): Transmission rate (# contacts per person per day * transmissivity).
        gamma (float): Recovery rate (reciprocal of average days in infectious state).
        N (int): Population size.

    Returns:
        list: System of differential equations for SIR model.
    '''
    S = A[0]
    I = A[1]
    R = A[2]

    return [
        -beta / N * I * S,
        beta / N * I * S - gamma * I,
        gamma * I
    ]

def seir_system(A, T, beta, gamma, sigma, N):
    '''
    Creates the system of differential equations for the SEIR model.

    Args:
        A (list): Values at time point 0 for S, I, R.
        T (list): Time intervals (ex. a list of days 0-100).
        beta (float): Transmission rate (# contacts per person per day * transmissivity).
        gamma (float): Recovery rate (reciprocal of average days in infectious state).
        sigma (float): The rate at which exposed individuals become infectious (reciprocal of average latent period).
        N (int): Population size.

    Returns:
        list: System of differential equations for SEIR model.
    '''
    S = A[0]
    E = A[1]
    I = A[2]
    R = A[3]

    return [
        -beta / N * I * S,
        beta * I * S - sigma * E,
        sigma * E - gamma * I,
        gamma * I
    ]

def fit_sir(days, beta, gamma, N, I0, R0):
    '''
    Solves the system of differential equations for the SIR model.

    Args:
        days (int): The length of the study period in days.
        beta (float): Transmission rate (# contacts per person per day * transmissivity).
        gamma (float): Recovery rate (reciprocal of average days in infectious state).
        N (int): Population size.
        I0 (int): The number of people infected at time step 0.
        R0 (int): The number of people recovered at time step 0.

    Returns:
        matrix: A (# days) * 3 matrix showing the solved system of diffeqs for the fit SIR model.
    '''

    times = np.arange(0, days + 1, 1)
    S0 = N - I0

    solved = odeint(sir_system, y0 = [S0, I0, R0], t = times, args = (beta, gamma, N))
    solved_transposed = solved.transpose()
    solved_transposed = [[entry.item() for entry in sublist] for sublist in solved_transposed]

    sir = []

    for n in range(len(solved_transposed[0])):

        s = solved_transposed[0][n]
        i = solved_transposed[1][n]
        r = solved_transposed[2][n]

        sir.append({"day": n, "susceptible": max(0, s), "infectious": max(0, i), "recovered": max(0, r)})

    return sir

def fit_seir(days, beta, gamma, sigma, N, E0, I0, R0):
    '''
    Solves the system of differential equations for the SEIR model.

    Args:
        days (int): The length of the study period in days.
        beta (float): Transmission rate (# contacts per person per day * transmissivity).
        gamma (float): Recovery rate (reciprocal of average days in infectious state).
        sigma (float): The rate at which exposed individuals become infectious (reciprocal of average latent period).
        N (int): Population size.
        I0 (int): The number of people infected at time step 0.
        R0 (int): The number of people recovered at time step 0.

    Returns:
        matrix: A (# days) * 4 matrix showing the solved system of diffeqs for the fit SEIR model.
    '''

    times = np.arange(0, days + 1, 1)
    S0 = N - E0 - I0

    solved = odeint(seir_system, y0 = [S0, E0, I0, R0], t = times, args = (beta, gamma, sigma, N))
    solved_transposed = solved.transpose()
    solved_transposed = [[entry.item() for entry in sublist] for sublist in solved_transposed]

    sir = []

    for i in range(len(solved_transposed[0])):
        sir.append({"day": i, "susceptible": solved_transposed[0][i], "exposed": solved_transposed[1][i], "infectious": solved_transposed[2][i], "recovered": solved_transposed[3][i]})

    return sir