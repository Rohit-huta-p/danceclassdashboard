# Studio Flowie  

**Studio Flowie** is a comprehensive dance class management system designed to streamline the operations of a dance studio. This application helps manage student data, track attendance, monitor fees, and provides a dashboard for an overview of studio activities.  

---

## Features  

### 1. **Student Management**  
- Add, edit, and remove student profiles.  
- View a complete list of all enrolled students.  

### 2. **Attendance Tracking**  
- Mark daily attendance for students.  
- View attendance history for each student.  

### 3. **Dashboard**  
- Get a bird's-eye view of the studio's performance.  
- Key metrics include total students, attendance trends, and collected fees.  

### 4. **Fee Management**  
- Record and track fee payments for students.  
- View collected fees and pending dues.  

---

## Technology Stack  

- **Frontend**: React.js, TailwindCSS  
- **Backend**: Node.js, Express.js  
- **Database**: MongoDB  
- **Authentication**: JSON Web Tokens (JWT)  

---

## Installation  

1. Clone the repository:  
   ```bash
   git clone <repository-url>
Navigate to the project directory:

bash
Copy
Edit
cd studio-flowie
Install dependencies for both frontend and backend:

bash
Copy
Edit
npm install
cd client && npm install
Set up the environment variables:

Create a .env file in the root directory.
Add the following variables:
env
Copy
Edit
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
PORT=5000
Start the application:

bash
Copy
Edit
# Start the backend server
npm run server

# Start the frontend
cd client && npm start
