# Cinema Central

Cinema Central Application is a Spring Boot and React application that provides user authentication and authorization functionalities using Spring Security and JWT (JSON Web Tokens). It allows users to register, log in, check movie details, watch trailers and access protected resources (comment, moderate comment) based on their assigned roles.

## Features

- **Filters / Search:** Users are able to use a vast colletion of filters based on genre or official language. They can also search for any movie they like.

- **User registration:** Users can create an account by providing a unique username, email and password.

- **User authentication:** Registered users can log in using their credentials.

- **Role-based authorization:** Users are assigned roles (e.g., ROLE_USER, ROLE_ADMIN) that determine their access right to different resources.

- **JWT token generation:** Upon successful authentication, users receive a JWT token that can be used to access protected resources.

- **Responsiveness:** Fully responsive frontend using different designs on different screens and media queries.

## Technologies Used

- **Java**
- **Spring Boot**
- **Spring Security**
- **JWT** ( JSON Web Tokens )
- **Spring Data JPA** ( Java Persistence API )
- **PostgreSQL Database**

## Getting Started

Follow these instructions to get the project up and running on your local machine.

#### Prerequisites

- Java Development Kit (JDK) 8 or later

#### Installation

1. Clone the repository `git clone https://github.com/AlinDedu/cinema-central-AlinDedu.git`

2. Navigate to frontend directory `cd frontend`

3. Run `npm install`

4. Run `npm run dev` to start frontend application.

5. Run backend application.

6. Open your web browser and visit `http://127.0.0.1:5173/movies`

### Aknowledgements

The Cinema Central project was developed by Alin Dedu. It was inspired by the IMDB website. Special thanks to the team at [Codecool](https://codecool.com/ro/?utm_source=Google&utm_medium=CPC&utm_campaign=RO_Search_FS_NS&utm_content=Brand&gclid=Cj0KCQjwmtGjBhDhARIsAEqfDEfamMslN5iKjSQk3Uhijnekqeo5oxwjoqmUPO2CeBEVm_DLoLC1VE0aAkzaEALw_wcB) for their support and guidance during the development process.
