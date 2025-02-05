# React Blog Application

## Description
This is a full-featured blog application built with React.js and Firebase. Users can create, read, update, and delete blog posts, as well as authenticate with Firebase Authentication.

## Features
- Firebase authentication (Login/Signup)
- Create, edit, and delete blog posts
- Display list of blogs with pagination
- Search functionality
- Firebase Firestore for storage
- Responsive design

## Technologies Used
- React.js
- Firebase (Firestore & Authentication)
- Redux Toolkit (for state management)
- React Router DOM
- React Quill (for rich text editor)
- CSS for styling

## Prerequisites
Ensure you have the following installed:
- Node.js (latest version recommended)
- npm or yarn

## Installation

1. Clone the repository


2. Install dependencies:
   ```sh
   npm install
   ```
   or
   ```sh
   yarn install
   ```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Firestore Database and Authentication (Email/Password sign-in)
   - Copy your Firebase configuration and create a `.env` file in the root directory:
     ```sh
     REACT_APP_FIREBASE_API_KEY=your_api_key
     REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
     REACT_APP_FIREBASE_PROJECT_ID=your_project_id
     REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     REACT_APP_FIREBASE_APP_ID=your_app_id
     ```

4. Start the application:
   ```sh
   npm start
   ```
   or
   ```sh
   yarn start
   ```

## Usage
- Open `http://localhost:3000` in your browser.
- Sign up or log in.
- Create new blog posts, edit or delete your own posts.
- Search for blogs using the search bar.

## Deployment
You can deploy this project using:
```sh
npm run build
```
Then deploy the `build/` folder to Firebase Hosting, Vercel, Netlify, or any hosting provider of your choice.

## License
This project is open-source and available for modification and distribution.

## Author
Ashish Tailor- [GitHub Profile](https://github.com/ashish-tailor)

