# PERN-Stack-Task

## Overview

This project is an admin dashboard application built with the PERN (PostgreSQL, Express, React, Node.js) stack. It allows CRUD operations for managing clients and helpers, and enables admins to match helpers with clients based on location.

## Setup Instructions

### Backend (Server)

1. Navigate to the `server` directory:

   cd server

2. Install dependencies:

   npm install

3. Set up the environment variables:

   - Create a `.env` file in the `server` directory
   - Copy the `.env.example` file to `.env`
   - Update the database credentials and other configurations as needed

4. Run the development server:

   npm run dev

### Frontend (Client)

1. Navigate to the `client` directory:

   cd client

2. Install dependencies:

   npm install

3. Start the development server:

   npm run dev

The frontend will be available at http://localhost:8002

## Available Scripts

### Backend

- `npm run dev`: Start the development server with hot-reloading
- `npm run build`: Compile TypeScript to JavaScript
- `npm start`: Build and start the production server
- `npm run seed`: Populate the database with sample data.

- `npm test`: Run tests

### Frontend

- `npm run dev`: Start the development server with hot-reloading
- `npm run build`: Build the project for production
- `npm run lint`: Run ESLint to check for code quality issues
- `npm run preview`: Preview the production build locally

## Running Tests

To run the backend tests:

1. Navigate to the `server` directory
2. Run the following command:

   npm test

This will execute the test suite using Jest with the following configuration:

- Environment: NODE_ENV=test
- Force exit after tests complete
- Detect open handles

## Additional Information

- The backend server runs on port 3002 by default. You can change this in the `.env` file.
- Make sure to run the database seeders (`npm run seed`) to populate the database with initial data.
- For production deployment, use `npm run build` to compile the TypeScript code and `npm start` to run the production server.
