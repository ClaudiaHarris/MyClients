# Clients Module - CRM System
A React-based client management interface that allows users to view, add, and manage client information.

## Live Demo (Recommended Method)

The easiest way to review the application is through the live deployment at:
https://clients-module.vercel.app/clients

**Demo Login Credentials:**
- Email: domalley@liberty.edu
- Password: capstone

The live version uses Supabase as the backend and contains the most up-to-date data.

## Local Development Setup (Optional)

If you wish to run the code locally:

1. **Extract the Project**
   - Unzip the project file to your desired location
   - Open a terminal/command prompt
   - Navigate to the project directory

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Application**
   ```bash
   npm start
   ```
   The application will open in your default browser at `http://localhost:3000` and will connect to the same Supabase backend as the live demo.

## Project Structure

- `/src` - Main application source code
  - `/components` - React components
  - `/services` - API and data services
  - `/contexts` - React context providers
  - `/config` - Application configuration

## Features

- User Authentication via Supabase
- View and manage client list
- Add new clients
- Edit client details
- Delete clients
- View client contracts and projects
- Form validation
- Error handling

## Troubleshooting

1. **Connection Issues**
   - Verify internet connection (required for Supabase access)
   - Clear browser cache and reload
   - Check browser console for any error messages

2. **Login Issues**
   - Ensure you're using the provided demo credentials
   - Try clearing browser cookies and cache

## Technical Notes

- Built with React 18
- Uses Vite as the build tool
- Integrates with Supabase for authentication and data storage
- Styled with CSS modules

## Assessment Notes for Professor

- The application demonstrates full CRUD operations
- Implements proper state management using React Context
- Features protected routes and authentication
- Includes error boundaries and form validation
- Demonstrates proper component organization and reusability
- Uses modern React practices including hooks and functional components
- Uses Supabase as the backend service for data persistence and authentication

For any technical questions or issues, please contact Claudia Harris via charris294@liberty.edu