import cv2
import numpy as np
import pyvhr

# Set up video capture
cap = cv2.VideoCapture(0)

# Set ROI for forehead
x, y, w, h = 200, 100, 200, 100

# Create PyVHR object
pyvhr_engine = pyvhr.PyVHR()

while True:
    # Read frame from video capture
    ret, frame = cap.read()

    # Flip the frame horizontally for a mirror effect
    frame = cv2.flip(frame, 1)

    # Convert the frame to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Detect face using Haar cascade classifier
    face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
    faces = face_cascade.detectMultiScale(gray, 1.3, 5)

    # Draw rectangle around the face
    for (x,y,w,h) in faces:
        cv2.rectangle(frame,(x,y),(x+w,y+h),(255,0,0),2)

        # Extract ROI from forehead
        roi_gray = gray[y:y+h, x:x+w]
        roi_color = frame[y:y+h, x:x+w]

        # Apply PyVHR to estimate heart rate
        hr = pyvhr_engine.get_heart_rate(roi_gray, fps=30)

        # Display heart rate on frame
        cv2.putText(frame, f"Heart rate: {hr:.2f} bpm", (10, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2, cv2.LINE_AA)

    # Display the resulting frame
    cv2.imshow('frame',frame)

    # Exit on 'q' key press
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Release video capture and close all windows
cap.release()
cv2.destroyAllWindows()
