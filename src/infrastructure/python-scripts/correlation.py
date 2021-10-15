import pandas as pd
import sys


def correlation_test(filename):
    data = pd.read_csv(filename)
    numerics = ['int16', 'int32', 'int64', 'float16', 'float32', 'float64']
    new_df = data.select_dtypes(include=numerics)
    corr = new_df.corr().to_json()
    print(corr)


path = sys.argv[1]
correlation_test(path)
