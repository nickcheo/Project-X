import time
import numpy as np

while True:
    with open('output.txt', 'r') as input_file:
        # read the last 5 lines of the file
        lines = input_file.readlines()[-10:]
        float_list = [float(x) for x in lines]

        # process the lines
        avgFearTemp = np.mean(float_list)
        print(avgFearTemp)

    # wait for some time before reading the file again
    time.sleep(1)