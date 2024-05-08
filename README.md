
# Authentication API (TASK1)

This API provides authentication functionalities such as user registration, login, password reset, and password update.

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
- uuid

## Installation

1. Clone the repository:

```
git clone https://github.com/Zeomite/task1
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
   TWILIO_sid=YOUR_TWILIO_SID
   TWILIO_auth_token=YOUR_TWILIO_AUTH_TOKEN
   TWILIO_phnumber=YOUR_TWILIO_PHONE_NUMBER
   GITHUB_TOKEN = access-token
   REPO_OWNER = GithubUsername
   REPO_NAME =  RepoName
   ```

4. Start the server:

```
npm start
```

## Endpoints

- `POST /user/signup`: Register a new user.
- `POST /user/signin`: Sign in with existing credentials.
- `POST /user/forgotpass`: Request a password reset via email or phone OTP.
- `POST /user/updatepassword`: Update password after receiving OTP.
- `POST /post/create`: Create a new post with optional image upload.
- `POST /post/update`: Update an existing post with optional image update.
- `POST /post/delete`: Delete a post.
- `POST /post/read`: Read posts by post ID or user ID.
- `POST /post/like`: Like or unlike a post.
- `POST /comment/create`: Create a new comment.
- `POST /comment/update`: Update an existing comment.
- `POST /comment/delete`: Delete a comment.

## Usage

1. Sign up using the `/user/signup` endpoint with a username, email, and password.
2. Sign in using the `/user/signin` endpoint with your registered email and password.
3. If you forget your password, use the `/user/forgotpass` endpoint to request a reset link via email or phone OTP.
4. Provide the necessary details to `/user/updatepassword` to reset your password.
5. Create a new post using the `/post/create` endpoint with a caption and optional image upload(uses github repo as image database).
6. Update an existing post using the `/post/update` endpoint with the post ID, caption, and optional image update.
7. Delete a post using the `/post/delete` endpoint with the post ID.
8. Read posts using the `/post/read` endpoint with the post ID or user ID.
9. Like or unlike a post using the `/post/like` endpoint with the post ID and user ID.
10. Create a new comment using the `/comment/create` endpoint with the post ID, user ID, and content.
11. Update an existing comment using the `/comment/update` endpoint with the comment ID, user ID, and content.
12. Delete a comment using the `/comment/delete` endpoint with the comment ID and user ID.
