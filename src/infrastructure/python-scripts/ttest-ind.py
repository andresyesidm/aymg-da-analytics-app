import pandas as pd
import sys
import random
from scipy.stats import ttest_ind


random.seed(111)


def t_test_ind(filename, column_one, column_two):
    data = pd.read_csv(filename)
    test_result = ttest_ind(data[column_one], data[column_two])
    print(test_result[1])


path = sys.argv[1]
column_p = sys.argv[2]
column_s = sys.argv[3]
t_test_ind(path, column_p, column_s)
