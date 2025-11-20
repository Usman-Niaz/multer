# Multer + Cloudinary Image Upload with JWT Authentication

## Project Overview

This project is a **Node.js backend** that allows multiple users to **register, login, and securely manage image uploads**. The application uses **Multer for file uploads**, **Cloudinary for cloud storage**, and **JWT for user authentication**. Users can only upload or delete images after logging in and providing a valid token. Unauthorized actions are blocked.

---

## Features

* **User Registration & Login**

  * Multiple users can register.
  * Passwords are securely hashed using **bcrypt**.
  * JWT authentication implemented for login sessions.

* **Image Upload & Management**

  * Users can upload images using **Multer**.
  * Uploaded images are stored in **Cloudinary**.
  * Users can delete their uploaded images.
  * Actions require a valid **JWT token**; no token = no access.

* **Custom Error Handling**

  * Several **custom error classes** (e.g., `badRequest`, `notFound`) are implemented.
  * All asynchronous operations are wrapped with an **async wrapper** for cleaner error handling.

* **Security**

  * Passwords are hashed before storage.
  * JWT token ensures that only authenticated users can upload/delete images.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB (via Mongoose)
* Multer (for handling file uploads)
* Cloudinary (cloud storage)
* bcrypt (password hashing)
* JWT (authentication)
* dotenv (environment variables)

---

## Usage

1. **Install dependencies:**

```bash
npm install
```

2. **Create `.env` file** with:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
CLOUD_NAME=your_cloudinary_cloud_name
CLOUD_API_KEY=your_cloudinary_api_key
CLOUD_API_SECRET=your_cloudinary_api_secret
JWT_SECRET=your_jwt_secret
```

3. **Run the server:**

```bash
npm run dev
```

4. **Register a user:**

* Endpoint: `POST /register`
* Body: `{ "name": "John", "email": "john@example.com", "password": "password123" }`

5. **Login user:**

* Endpoint: `POST /login`
* Body: `{ "email": "john@example.com", "password": "password123" }`
* Response: JWT token

6. **Upload an image:**

* Endpoint: `POST /upload-file`
* Headers: `Authorization: Bearer <JWT_TOKEN>`
* Form-data: `file` → select image

7. **Delete an image:**

* Endpoint: `POST /delete-file`
* Headers: `Authorization: Bearer <JWT_TOKEN>`
* Body: `{ "publicId": "<cloudinary_public_id>" }`

---

## Notes

* Multiple file upload and delete is supported.
* Users cannot upload/delete images without a valid token.
* All asynchronous routes are wrapped in **asyncWrapper** to handle errors gracefully.
* Custom errors give clear responses for invalid requests or missing resources.

---

## Author

**Usman Niaz**
