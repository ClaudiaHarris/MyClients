-->My Clients Module for a fictitious CRM by Claudia Harris
A React-based client management interface that allows users to view, add, and manage client information.

-->Prerequisites

- Node.js (v16 or higher)
- npm (v8 or higher)

Installation

-->Install the required dependencies in the project directory:

(npm install if Powershell)

-->Running the Application

The application requires two servers to run simultaneously:

1. Start the React development server (main application):

(npm start if powershell)

This will open the application in your browser at `http://localhost:3000`

2. In a new terminal, start the JSON server (mock API):

(npm run start:server if powershell)

This will start the mock API server at `http://localhost:8000`
 
 -->Features as of 2025-04-07

- View list of clients
- Add new clients
- Some Form Validation
- Some Error handling

-->Notes

- The application currently uses a mock API server for demonstration purposes
- Both servers must be running for the application to work properly
- Default port for React app is 3000, and JSON server runs on port 8000

-->Troubleshooting

If you encounter any issues:

1. Make sure both servers are running
2. Check the browser console for errors
3. Verify that ports 3000 and 8000 are available
4. Try clearing the browser cache