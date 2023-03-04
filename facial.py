import cv2

# Load the Haar cascade classifier for face detection
face_cascade = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

# Access the webcam
cap = cv2.VideoCapture(0)

while True:
    # Capture frames from the webcam
    ret, frame = cap.read()

    # Convert the frames to grayscale
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    # Apply the Haar cascade classifier to detect faces
    faces = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5)

    # Draw a rectangle around the detected faces
    for (x, y, w, h) in faces:
        cv2.rectangle(frame, (x, y), (x+w, y+h), (0, 255, 0), 2)

    # Display the frames with the detected faces
    cv2.imshow('Facial detection', frame)

    # Exit the loop and release resources when the user closes the window or presses a key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
