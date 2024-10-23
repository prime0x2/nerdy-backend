# NerdDevs Backend

This is a task from NerdDevs

## Prerequisite

Node <= 20.18.0

## Installation

1. Clone the repository
   ```sh
   git clone https://github.com/prime0x2/nerdy-backend.git
   ```
2. Navigate to the project directory
   ```sh
   cd nerdy-backend
   ```
3. Install dependencies
   ```sh
   npm i
   ```

## Environment Setup

1. Setup `.env` file with the following environment variables:

   ```sh
   NODE_ENV=development
   PORT=8080
   CORS_ORIGIN=http://localhost:3000

   MONGO_URI=mongodb://localhost:27017/your_database_name
   REDIS_URI=redis://localhost:6379

   JWT_SECRET=your_jwt_secret_key
   JWT_EXPIRY=60d

   MAIL_SERVICE=Gmail
   MAIL_HOST=smtp.gmail.com
   MAIL_PORT=587
   MAIL_SECURITY=false
   MAIL_USER=your_mail@gmail.com
   MAIL_FROM="Nerd Devs Task"
   MAIL_PASS="your_google_app_password"
   MAIL_TOKEN_EXPIRY=1h
   ```

## Usage

1. Start the server
   ```sh
   npm run dev
   ```
2. The server will be running at `http://localhost:8080`
