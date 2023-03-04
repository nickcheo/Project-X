import cv2
import numpy as np
import pyvhr

# Initialize the webcam
cap = cv2.VideoCapture(0)

# Load the Haar Cascade classifier for face detection
face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")

# Create PyVHR object
pyvhr_engine = pyvhr.PyVHR()

while True:
    # Read frame from video capture
    ret, frame = cap.read()

    # Flip the frame horizontally for a mirror effect
    frame = cv2.flip(frame, 1)

    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))
    if len(faces) == 0:
        return None
    (x, y, w, h) = faces[0]
    return gray[y:y+w, x:x+h]

# Define a function to calculate the average pixel intensity of the ROI
def average_pixel_intensity(roi):
    if roi is None:
        return None
    return np.mean(roi)

# Define a function to calculate the heart rate based on changes in the average pixel intensity over time
def calculate_heart_rate(intensity_values, fps):
    if intensity_values is None:
        return None
    peaks, _ = find_peaks(intensity_values, distance=fps*0.5)
    if len(peaks) < 2:
        return None
    bpm = 60 * fps / np.diff(peaks).mean()
    return bpm

# Loop through the webcam frames and call the above functions to detect the face, calculate the average pixel intensity, and calculate the heart rate
intensity_values = []
while True:
    ret, frame = cap.read()
    roi = detect_face(frame)
    intensity = average_pixel_intensity(roi)
    intensity_values.append(intensity)
    bpm = calculate_heart_rate(intensity_values, cap.get(cv2.CAP_PROP_FPS))
    cv2.putText(frame, f"BPM: {bpm:.0f}", (30, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)
    cv2.imshow("Heart Rate Detection", frame)
    if cv2.waitKey(1) == ord("q"):
        break

# Release the webcam and close the window
cap.release()
cv2.destroyAllWindows()
