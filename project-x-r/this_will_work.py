import tkinter as tk
import serial

# Define the serial port and baud rate for the ESP32
ser = serial.Serial('/dev/cu.usbserial-0001', 9600)

def update_slider():
    # Display the current slider value in the label
    value_label.config(text=f"Slider value: {slider.get()}")

def send_value():
    # Send the current slider value to the ESP32
    value = slider.get()
    ser.write(str(value).encode())
    # Display a message to indicate that the value was sent
    status_label.config(text=f"Sent value: {value}")

# Create the main window
window = tk.Tk()

# Create a slider and add it to the window
slider = tk.Scale(window, from_=0, to=255, orient=tk.HORIZONTAL, command=update_slider)
slider.pack()

# Create a label to display the current slider value
value_label = tk.Label(window, text="Slider value: 0")
value_label.pack()

# Create a "Submit" button
submit_button = tk.Button(window, text="Submit", command=send_value)
submit_button.pack()

# Create a label to display the status of the submission
status_label = tk.Label(window, text="")
status_label.pack()

# Start the main loop
window.mainloop()
