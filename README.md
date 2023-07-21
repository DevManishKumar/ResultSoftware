# Description:
Result Software is a comprehensive MERN Stack application designed to facilitate efficient management of students' grades and percentages for educators and teachers. With an intuitive user interface, ResultSoftware simplifies the process of recording, calculating, and analyzing student performance. This documentation serves as a guide for installation, usage instructions, and an overview of the application's features and functionalities.

## Key Features:

### Secure User Authentication:
- User-friendly registration and login functionality.
- Enhanced security with password hashing using passport JWT.

### Class Management:
- Create, edit, and delete classes.
- Define exams for each class.

### Student Management:
- Add, edit, and remove students' information.
- Store essential details like name, email, and more.

### Grade Recording and Calculation:
- Record student grades for exams and assignments.
- Automatic overall grade calculation based on weightage.
- Ability to update and view student grades.

### Report Generation:
- Generate detailed reports for individual students.
- Includes essential information such as percentage with verdicts.

## Installation
- To set up ResultSoftware locally, follow these steps:

- Clone the repository:

      git clone url
      
- Navigate to the project directory:

      cd ResultSoftware

- Install the required dependencies for backend:

      npm i express dotenv colors bcryptjs jsonwebtoken mongoose nodemon
     
- Navigate to the client directory: 

       cd client
    
- Install the dependencies for the client: 

       npm i react-router-dom redux react-redux axios npm install @mui/material @emotion/react @emotion/styled @reduxjs/toolkit react-hot-toast
    
- Create a .env file in the root directory with the following environment variables:

       mongo_url = mongodb+srv://<user>:<pass>@cluster0.l17quyr.mongodb.net/database

       jwt_secret = A_Secret_Value

       PORT = 4000

- Start the server: 

       npm start
    
- In a new terminal window, navigate to the client directory:

       cd client
    
- Start the client: 

       npm start
    
- Access the application. Open your web browser and visit http://localhost:3000 to access the ResultSoftware application.

## Usage:
Upon accessing the application through your web browser, you can:

- Log in using your credentials or sign up as a new user.
- Create a new class and specify details such as the class name, subject, and term.
- Add students to the class by providing their information, including name and email.
- Record grades for students based on assignments and exams, with automatic overall grade calculations.
- Generate detailed reports for individual students or the entire class, including grades and additional - - information.

## Technology Stack
- MongoDB: NoSQL database for data storage.
- Express: Backend framework for building RESTful APIs.
- React: Frontend framework for building interactive user interfaces.
- Node.js: JavaScript runtime environment for scalable server-side applications.
- JWT: JSON Web Token for user authentication and authorization.
- Bcrypt: Library for secure password hashing.


