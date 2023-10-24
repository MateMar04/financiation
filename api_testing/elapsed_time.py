import numpy as np
import requests
from scipy import stats


def get_token(endpoint, cred):
    return requests.post(endpoint, data=cred).json()["access"]


AUTH_URL = "http://localhost:8000/auth/jwt/create/"
CREDENTIALS = {"ssn": "20459344730",
               "password": "pepe1234"}

TEST_URL = "http://localhost:8000/api/visits"

elapsed_time = []
number_of_calls = 10
cont = 0

tokens = get_token(AUTH_URL, CREDENTIALS)

while cont != number_of_calls:
    response = requests.get(TEST_URL, headers={"Authorization": f"JWT {tokens}"})

    if response.status_code == 401:
        tokens = get_token(AUTH_URL, CREDENTIALS)

    elif response.status_code == 200:
        print(f"{cont}/{number_of_calls}")
        elapsed_time.append(round(response.elapsed.total_seconds(), 2))
        cont = cont + 1

average = sum(elapsed_time) / len(elapsed_time)
max_value = max(elapsed_time)
min_value = min(elapsed_time)
mean = np.mean(elapsed_time)
median = np.median(elapsed_time)
mode = stats.mode(elapsed_time)
std_dev = np.std(elapsed_time)
variance = np.var(elapsed_time)

print(f"Average: {average}")
print(f"Maximum: {max_value}")
print(f"Minimum: {min_value}")
print(f"Mean: {mean}")
print(f"Median: {median}")
print(f"Mode: {mode}")
print(f"Standard Deviation: {std_dev}")
print(f"Variance: {variance}")
print(f"Total: {sum(elapsed_time)}")
