# JMPN Fit V1

## Description

JMPN Fit V1 is a comprehensive fitness application designed to help users track their workouts, monitor their progress, and achieve their fitness goals. The application provides a user-friendly interface and a variety of features to support a healthy lifestyle.

## Features

### Frontend

- **React Native with Expo:** Built using React Native and Expo for cross-platform compatibility.
- **User Authentication:** Allows users to register and log in.
- **Workout Tracking:** Users can input workout details, including type, duration, level, and exercises.
- **Date and Weekday Display:** Automatically displays the current date and weekday.
- **Data Validation:** Ensures all required fields are filled before submission.
- **Exercise List Conversion:** Converts a newline-separated string of exercises into an array.
- **Loading Indicator:** Displays a loading state while data is being submitted.
- **Error Handling:** Alerts the user if there is an issue with data submission.

### Backend

- **Express Server:** Handles API requests and responses.
- **MongoDB Integration:** Uses Mongoose for MongoDB operations.
- **User Registration and Authentication:** Allows users to register and log in securely using bcrypt for password hashing and JWT for authentication.
- **Save Workout Routines:** Allows authenticated users to save workout routines to their profile.

## Installation

### Prerequisites

- Node.js
- MongoDB
- Expo CLI

### Setup

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/R-LaRoi/jmpn-fit-v1.git](https://github.com/R-LaRoi/jmpn-fit-v1.git)
    ```

2.  **Navigate to the project directory:**

    ```bash
    cd jmpn-fit-v1
    ```

3.  **Install the dependencies:**

    ```bash
    npm install
    ```

### Environment Variables

1.  Create a `.env` file in the root directory.
2.  Add the following environment variables:

    ```
    PORT=8000
    JWT_SECRET=your_jwt_secret
    MONGODB_URI=your_mongodb_connection_string
    ```

## Usage

### Starting the Backend Server

To start the backend server, run the following command:

```bash
npm start

API Endpoints
GET /

Description: Checks the status of the server.
Response: { data: "started" }
POST /register

Description: Registers a new user.

Request Body (JSON):
{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "password123"
}
Response: "User registered successfully" or error message.

POST /login-user

Description: Authenticates a user and returns a JWT token.

Request Body (JSON):

JSON

{
  "email": "user@example.com",
  "password": "password123"
}
Response: JWT token, userType, username, userId or error message.

POST /save-routine

Description: Saves a workout routine for an authenticated user.

Request Body (JSON):

JSON

{
  "userId": "user_id",
  "duration": "30 min",
  "type": "Cardio",
  "level": "Beginner",
  "date": "March 21, 2025",
  "weekday": "Friday",
  "exercises": '["Pushups", "Squats"]'
}
Response: "Routine saved successfully!" or error message.
```
