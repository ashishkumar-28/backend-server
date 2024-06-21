# Backend Server

This is a simple backend server built with Express and TypeScript.

## Endpoints

- `GET /ping`: Returns `true`
- `POST /submit`: Submits a form
- `GET /read?index={index}`: Retrieves a form by index
- `DELETE /delete?index={index}`: Deletes a form by index
- `PUT /edit?index={index}`: Edits a form by index
- `GET /search?email={email}`: Searches forms by email

## Running the Server

1. Install dependencies:
   ```sh
   npm install
