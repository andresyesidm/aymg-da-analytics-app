import pandas as pd
import sys
import random
from scipy.stats import ttest_1samp


random.seed(111)


def t_test(filename, sample, column_selected):
    data = pd.read_csv(filename)
    data_sample = data[column_selected].sample(int(sample))
    data_mean = data[column_selected].mean()
    test_result = ttest_1samp(data_sample, data_mean)
    print(test_result[1])


path = sys.argv[1]
size_sample = sys.argv[2]
column = sys.argv[3]
t_test(path, size_sample, column)
