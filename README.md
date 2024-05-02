
# Authentication API (TASK1)

Create APIs for

1.1 User Registration using Email Password and username

1.2 User Login using username and password

1.3 Forget User password AP


## Requirements

- Node.js
- Express.js
- MongoDB
- bcrypt
- dotenv
- twilio
- nodemailer
- mongoose

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
   ```

4. Start the server:

```
npm start
```

## Endpoints

- `POST /signup`: Register a new user.
- `POST /signin`: Sign in with existing credentials.
- `POST /forgotpass`: Request a password reset via email or phone OTP.
- `POST /updatepassword`: Update password after receiving OTP.
- `GET /`: Welcome message.

## Usage

1. Sign up using the `/signup` endpoint with a username, email, and password.
2. Sign in using the `/signin` endpoint with your registered email and password.
3. If you forget your password, use the `/forgotpass` endpoint to request a reset link via email or phone OTP.
4. Provide the necessary details to `/updatepassword` to reset your password.



## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
