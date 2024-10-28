
# Real-Time Comment System

## Project Overview

The Real-Time Comment System is a web application that allows users to post, view, and manage comments in real time. Built with a robust backend using Node.js and PostgreSQL, this application ensures efficient data handling and seamless user interaction. The project leverages WebSockets for real-time communication, providing users with instant feedback on their comments without the need for page refreshes.

## Features

- **Real-Time Comments:** Users can submit comments and see them appear instantly without refreshing the page.
- **User Management:** Simple user authentication and management to ensure only authorized users can post comments.
- **Persistent Storage:** Utilizes PostgreSQL for reliable data storage, with support for complex queries and efficient data retrieval.
- **RESTful API:** Well-structured RESTful API endpoints for managing comments and users, ensuring easy integration with front-end frameworks.
- **Testing with Postman:** Comprehensive API testing using Postman for validating the functionality and performance of the backend services.

## Technologies Used

- **Backend:** Node.js
- **Database:** PostgreSQL
- **Real-Time Communication:** WebSockets
- **Package Manager:** npm for backend dependencies, pnpm for Next.js
- **Testing Tool:** Postman

## Getting Started

To get a local copy up and running, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <repository-url>


### Installation

1. **Go to backend folder:**
   ```bash
   npm install

2. **Compose the docker-compose.yaml file**
   ```bash
   sudo docker-compose up -d

3. **Setup postgresSQL URL in the .env file**
  
    DATABASE_URL=postgresql://<username>:<password>@<hostname>:<port>/<database_name>

4. **Run the server**
   ```bash
   node index.js

5. **Go to the frontend folder:**
   ```bash
    cd frontend
6. **Run the command:**
   ```bash
    pnpm i

7. **Run the command:**
   ```bash
    pnpm dev



## License

Information about the project's license.
