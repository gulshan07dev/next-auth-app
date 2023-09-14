# Next.js Authentication App

This is a full-stack authentication app built with Next.js, NextAuth.js, and MongoDB. It provides several features for user authentication and profile management.

## Features

- ****User Authentication:****
  - **Sign Up:** Users can create new accounts with a valid email address and password.
  - **Log In:** Registered users can log in to their accounts securely.
  - **Forgot Password:** Users can request a password reset link if they forget their password.
  - **Reset Password:** Users can reset their passwords using the link sent to their email.
  - **Change Password:** Authenticated users can change their passwords anytime.

- ****Profile Management:****
  - **View Profile:** Users can view their profile information, including their name, email, and account verification status.
  - **Edit Profile:** Authenticated users can update their profile information, including their name and profile picture.
  
- **Responsive and Attractive UI:**
  - The app features a responsive design that works well on various screen sizes and devices.
  - The user interface is designed to be attractive and user-friendly.

## Technologies Used

- **Next.js:** A popular React framework for building server-rendered React applications.
- NextAuth.js: An authentication library for Next.js applications.
- **MongoDB:** A NoSQL database used for storing user data.
<!-- - **Cloudinary:** A cloud-based image and video management service for storing profile pictures. -->
- **Tailwind CSS:** A utility-first CSS framework for styling the app with ease.
<!-- - **Multer**: Middleware for handling file uploads. -->
- **React:** JavaScript library for building user interfaces.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

   ``` 
   https://github.com/gulshan07dev/next-auth-app.git
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Configure environment variables:

   - Create a `.env.local` file in the root directory.
   - Add your MongoDB connection string and Cloudinary credentials and you take refrence `.env.example.js` file.

4. Start the development server:

   ```
   npm run dev
   ```

5. Open your browser and visit [http://localhost:3000](http://localhost:3000) to see the app in action. 