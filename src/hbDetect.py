import cv2
from deepface import DeepFace
import numpy as np
import matplotlib.pyplot as plt
import tkinter as tk
import serial


# Define the serial port and baud rate for the ESP32
ser = serial.Serial('/dev/cu.usbserial-0001', 9600)
current_value = 0

def update_slider():
    # Display the current slider value in the label
    value_label.config(text=f"Slider value: {slider.get()}")

def send_value():
    global current_value
    # Send the current slider value to the ESP32
    value = slider.get()
    current_value = value
    ser.write(str(value).encode())
    # Display a message to indicate that the value was sent
    status_label.config(text=f"Sent value: {value}")
    # Close the window
    window.destroy()


# Create the main window
window = tk.Tk()

# Create a slider and add it to the window
slider = tk.Scale(window, from_=0, to=255, orient=tk.HORIZONTAL, command=update_slider)
slider.pack()

# Create a label to display the current slider value
# value = send_value()

value_label = tk.Label(window, text="Slider value: 0")
value_label.pack()

# Create a "Submit" button
submit_button = tk.Button(window, text="Submit", command=send_value)
submit_button.pack()

# Create a label to display the status of the submission
status_label = tk.Label(window, text="")
status_label.pack()

window.mainloop()

def on_closing():
    fearValues = []
    avgFear = []
    
    faceCascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

    cap = cv2.VideoCapture(0)

    with open('output.txt', 'w') as f:
        while True:
            # Read the next frame
            ret, frame = cap.read()

            frame = cv2.flip(frame, 1)

            small_frame = cv2.resize(frame, (0, 0), fx=0.2, fy=0.2, interpolation = cv2.INTER_CUBIC)

            result = DeepFace.analyze(frame, actions = ['emotion'], enforce_detection=False)

            fearValues.append(result[0]['emotion']['fear'])
            avgFearTemp = (np.mean(fearValues[-60:]) / 100.0) * current_value
            avgFear.append(avgFearTemp)
            print(avgFearTemp)
            ser.write(str(avgFearTemp).encode())

            f.write(str(avgFearTemp)+ '\n')
            f.flush()

            gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
            faces = faceCascade.detectMultiScale(gray,1.1,4)

            for (x, y, w, h) in faces:
                cv2.rectangle(small_frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

            font = cv2.FONT_HERSHEY_SIMPLEX

            cv2.putText(small_frame,
                        str(result[0]['dominant_emotion']),
                        (50, 200),
                        font, 3,
                        (0, 0, 255),
                        2,
                        cv2.LINE_4)

            cv2.imshow('Video', small_frame)

            if cv2.waitKey(2) & 0xFF == ord('q'):
                break

        cap.release()
        cv2.destroyAllWindows()

    fearValues = np.array(fearValues)
    avgFear = np.array(avgFear)
    x = np.arange(avgFear.size)

    plt.plot(x, avgFear)
    plt.xlabel('x')
    plt.ylabel('fear')
    plt.show()
root = tk.Tk()
root.protocol("WM_DELETE_WINDOW", on_closing())

print(current_value)