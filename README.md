
# Authentication and Social Media API (TASK1 + TASK2 + TASK3)

This API provides authentication functionalities such as user registration, login, password reset, as well as social media features like creating, updating, and deleting posts, liking posts, and commenting on posts with JWT Authentication.

## Task1 and Task2 Objectives
- User Registration using Email Password and username
- User Login using username and password
- Forget User password API
- Build CRUD operation for posting social media post.
- Likes & add a comment to a post API.
- Add Jwt auth token in all apis.
- Perform data encryption.

## Requirements

- Node.js
- Express.js
- MongoDB
- bcrypt
- dotenv
- twilio
- nodemailer
- mongoose
- axios
- multer
- passport
- passport-jwt

## Installation

1. Clone the repository:

```
git clone https://github.com/Zeomite/task1.git
```

2. Install dependencies:

```
npm install
```

3. Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables:

   ```
   PORT=5000
   MONGO_URL=mongodb://localhost:27017/auth
   SECRET_KEY=yourjwtsecretkey
   TWILIO_sid=YOUR_TWILIO_SID
   TWILIO_auth_token=YOUR_TWILIO_AUTH_TOKEN
   TWILIO_phnumber=YOUR_TWILIO_PHONE_NUMBER
   REPO_OWNER=YOUR_GITHUB_USERNAME
   REPO_NAME=YOUR_GITHUB_REPO_NAME
   GITHUB_TOKEN=YOUR_GITHUB_PERSONAL_ACCESS_TOKEN
   ```

4. Start the server:

```
npm start
```

## Endpoints

### WELCOME
- `GET /`: Welcome message.

### User Endpoints

- `POST /user/signup`: Register a new user.
- `POST /user/signin`: Sign in with existing credentials.
- `POST /user/forgotpass`: Request a password reset via email or phone OTP.
- `POST /user/updatepassword`: Update password after receiving OTP.

### Post Endpoints

- `POST /post/create`: Create a new post with optional image upload.
- `POST /post/update`: Update an existing post with optional image update.
- `POST /post/delete`: Delete a post.
- `POST /post/read`: Read posts by post ID or user ID.
- `POST /post/like`: Like or unlike a post.

### Comment Endpoints

- `POST /comment/create`: Create a new comment.
- `POST /comment/update`: Update an existing comment.
- `POST /comment/delete`: Delete a comment.

## Usage

1. **User Authentication:**
   - Sign up using the `/user/signup` endpoint with a username, email, and password.
   - Sign in using the `/user/signin` endpoint with your registered email and password.
   - If you forget your password, use the `/user/forgotpass` endpoint to request a reset link via email or phone OTP.
   - Provide the necessary details to `/user/updatepassword` to reset your password.

2. **Social Media Features:**
   - Create a new post using the `/post/create` endpoint with a caption and optional image upload (Using a github Repo as the Image Database).
   - Update an existing post using the `/post/update` endpoint with the post ID, caption, and optional image update.
   - Delete a post using the `/post/delete` endpoint with the post ID.
   - Read posts using the `/post/read` endpoint with the post ID or user ID.
   - Like or unlike a post using the `/post/like` endpoint with the post ID and user ID.
   - Create a new comment using the `/comment/create` endpoint with the post ID, user ID, and content.
   - Update an existing comment using the `/comment/update` endpoint with the comment ID, user ID, and content.
   - Delete a comment using the `/comment/delete` endpoint with the comment ID and user ID.
