import pandas as pd
import sys


def load_file(filename):
    data = pd.read_csv(filename)
    output = data.to_json()
    print(output)


path = sys.argv[1]
load_file(path)
