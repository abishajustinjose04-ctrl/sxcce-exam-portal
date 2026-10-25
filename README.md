# 🎓 SXCCE ExamPortal
### Smart Online Examination and Proctoring System

A web-based examination management system developed as an **academic mini-project for the Coding and Soft Skills Development subject** at St. Xavier's Catholic College of Engineering.

The project aims to simplify online examination management by providing separate interfaces for students and administrators, timed assessments, automatic evaluation, and result management.

---

## 📌 Table of Contents

- [About the Project](#-about-the-project)
- [Objectives](#-objectives)
- [Features](#-features)
- [Technologies Used](#-technologies-used)
- [System Requirements](#-system-requirements)
- [Project Structure](#-project-structure)
- [Database Configuration](#-database-configuration)
- [Installation and Setup](#-installation-and-setup)
- [How to Use](#-how-to-use)
- [Learning Outcomes](#-learning-outcomes)
- [Limitations](#-limitations)
- [Future Enhancements](#-future-enhancements)
- [Academic Information](#-academic-information)
- [Author](#-author)

---

## 📖 About the Project

Traditional examinations often require manual question preparation, answer evaluation, and result processing. These activities can take time and require considerable administrative effort.

**SXCCE ExamPortal** is a web application designed to demonstrate how these activities can be managed through a single digital platform.

The system provides separate access for students and administrators. Administrators can create examinations and manage questions, while students can attend timed assessments and view their results after submission.

The application uses Java and Spring Boot for backend development, MySQL for database storage, and HTML, CSS, and JavaScript for the user interface.

This project was developed to gain practical experience in web application development, database connectivity, REST APIs, and software debugging.

## 🎯 Objectives

- Develop a functional online examination management application.
- Implement separate student and administrator interfaces.
- Practise backend development using Java and Spring Boot.
- Connect a web application to a MySQL relational database.
- Implement timed examinations and automatic answer evaluation.
- Understand how frontend, backend, and database components communicate.
- Improve programming, problem-solving, and software development skills.

## ✨ Features

### 👨‍💼 Administrator Features

- Administrator login.
- Create and manage examinations.
- Set examination duration.
- Add and manage examination questions.
- Define correct answers for automatic evaluation.
- View examination and result information.

### 👩‍🎓 Student Features

- Student login.
- Access available examinations.
- View examination instructions before starting.
- Attend timed online assessments.
- Select answers through an interactive interface.
- Submit answers for evaluation.
- View scores and answer reviews.
- Monitor browser tab-switching activity during an examination.

### 📝 Examination and Result Management

- Retrieve examination questions from the database.
- Evaluate submitted answers against stored correct options.
- Calculate scores automatically.
- Store examination results in MySQL.
- Display result information and answer reviews.

### 🔍 Basic Proctoring

The project includes basic browser tab-switch monitoring to demonstrate an examination-monitoring feature. It is not a complete remote proctoring solution and does not independently verify a student's identity or prevent all forms of cheating.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Java 17 | Backend programming |
| Spring Boot | Backend application and REST API development |
| HTML5 | Web page structure |
| CSS3 | Styling and responsive user interface |
| JavaScript | Frontend interaction and API communication |
| MySQL 8.0 | Relational database |
| Apache Maven | Dependency management and project build |
| Git | Version control |
| GitHub | Source code hosting and project collaboration |
| Visual Studio Code | Development environment |

## 💻 System Requirements

Install the following software before running the application:

- Java Development Kit (JDK) 17.
- MySQL Server 8.0 or a compatible version.
- Visual Studio Code or another Java-compatible IDE.
- Git, if cloning the repository.
- Internet access for downloading project dependencies during the initial build.

The project uses the Maven Wrapper, so a separate Maven installation may not be required.

## 📂 Project Structure

The main project components are organised approximately as follows. The exact file structure may vary depending on the current repository contents.

```text
sxcce-exam-portal/
├── src/
│   └── main/
│       ├── java/
│       │   └── com/
│       │       └── sxcce/
│       │           └── examportal/
│       │               ├── controller/
│       │               ├── model/
│       │               ├── repository/
│       │               ├── service/
│       │               └── ExamportalApplication.java
│       └── resources/
│           ├── static/
│           │   ├── images/
│           │   ├── index.html
│           │   ├── login.html
│           │   ├── student-dashboard.html
│           │   ├── admin-dashboard.html
│           │   ├── exam.html
│           │   ├── result.html
│           │   ├── style.css
│           │   └── JavaScript files
│           └── application.properties
├── mvnw
├── mvnw.cmd
├── pom.xml
└── README.md
```

**Main components:**

- `controller/` — Handles incoming HTTP requests and API endpoints.
- `model/` — Represents application data, such as users, examinations, questions, and results.
- `repository/` — Provides database access operations.
- `service/` — Contains service-layer logic, if implemented.
- `static/` — Stores frontend HTML, CSS, JavaScript, and image files.
- `application.properties` — Contains application and database configuration.
- `pom.xml` — Defines project dependencies and Maven build configuration.

## 🗄️ Database Configuration

The application uses MySQL to store examination-related information.

The database may contain tables for:

- Users and their roles.
- Examinations and their durations.
- Questions, options, and correct answers.
- Student examination results and scores.

The actual table and column definitions depend on the entity classes and database configuration in the project.

### Step 1: Create the database

Open MySQL and execute:

```sql
CREATE DATABASE exam_db;
```

### Step 2: Configure the database connection

Open:

`src/main/resources/application.properties`

Configure the connection using your local MySQL credentials:

```properties
spring.application.name=examportal

spring.datasource.url=jdbc:mysql://localhost:3306/exam_db
spring.datasource.username=${DB_USERNAME:root}
spring.datasource.password=${DB_PASSWORD}

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
```

Set the `DB_USERNAME` and `DB_PASSWORD` environment variables to match your local MySQL configuration before running the application.

**Security note:** Never commit your real database password or other secrets to a public repository. Use environment variables or another suitable secret-management method.

If your existing application uses a different Spring Boot configuration, retain any required settings and update them carefully.

## 🚀 Installation and Setup

### Step 1: Clone the repository

Open a terminal and run:

```bash
git clone https://github.com/abishajustinjose04-ctrl/sxcce-exam-portal.git
```

### Step 2: Open the project

```bash
cd sxcce-exam-portal
```

Open the folder in Visual Studio Code.

### Step 3: Configure MySQL

- Ensure the MySQL Server service is running.
- Create the `exam_db` database.
- Configure the database username and password.
- Check that the MySQL JDBC dependency is available in `pom.xml`.

### Step 4: Build the application

On Windows PowerShell, run:

```powershell
.\mvnw.cmd clean compile
```

If the build succeeds, continue to the next step.

### Step 5: Start the application

```powershell
.\mvnw.cmd spring-boot:run
```

Wait until Spring Boot reports that the application has started successfully.

### Step 6: Open the application

Open your browser and visit:

```text
http://localhost:8080
```

Use the application's available login page to access the relevant dashboard.

**Important:** This project requires a locally configured MySQL database and valid user records. A fresh installation may require you to create administrator and student accounts before login. Do not assume that demonstration accounts exist automatically.

## 🧭 How to Use

### Administrator Workflow

1. Log in with a configured administrator account.
2. Open the administrator dashboard.
3. Create an examination and set its duration.
4. Add questions and their answer options.
5. Specify the correct answer for each question.
6. Review available examination and result information.

### Student Workflow

1. Log in with a configured student account.
2. View available assessments.
3. Read the examination instructions.
4. Start the assessment.
5. Answer the questions within the time limit.
6. Submit the examination.
7. View the generated score and available answer review.

The exact workflows and available screens depend on the current implementation.

## 📚 Learning Outcomes

Developing this academic mini-project helped me explore:

- Java programming and object-oriented concepts.
- Backend development using Spring Boot.
- REST API development and HTTP request handling.
- Frontend development using HTML, CSS, and JavaScript.
- Relational database design and MySQL connectivity.
- Maven dependency management and application builds.
- Integration between frontend, backend, and database components.
- Debugging, testing, and resolving development errors.
- Version control and source code management using Git and GitHub.

## ⚠️ Limitations

This is an educational mini-project and is not intended for high-stakes or production examinations without further development.

- Authentication and authorization require stronger server-side security.
- Passwords must be securely hashed before the system is used beyond a local demonstration.
- Browser tab-switch monitoring is basic and can be bypassed.
- The application does not provide comprehensive identity verification or AI-based proctoring.
- Deployment to a public server requires additional security, configuration, and testing.

## 🔮 Future Enhancements

Possible improvements include:

- Secure password hashing and stronger authentication.
- Server-side role-based access control.
- Improved examination analytics and performance reports.
- Question randomisation and configurable assessment rules.
- More robust exam timing and submission handling.
- Enhanced accessibility and mobile responsiveness.
- Deployment to a secure hosting environment.
- More comprehensive testing and error handling.

## 🎓 Academic Information

**Project:** SXCCE ExamPortal – Smart Online Examination and Proctoring System

**Project Type:** Academic Mini-Project

**Subject:** Coding and Soft Skills Development

**Institution:** St. Xavier's Catholic College of Engineering

**Department:** Computer Science and Engineering

**Purpose:** To apply programming and software development concepts through a practical web application.

## 👩‍💻 Author

**Abisha J.**

Computer Science and Engineering Student

St. Xavier's Catholic College of Engineering

- **GitHub:** [abishajustinjose04-ctrl](https://github.com/abishajustinjose04-ctrl)
- **Project Repository:** [SXCCE ExamPortal](https://github.com/abishajustinjose04-ctrl/sxcce-exam-portal)
- **LinkedIn:** [Abisha J.](https://www.linkedin.com/in/abisha-j04/)

---

## 📄 License

This repository is an academic mini-project. No specific open-source license is declared here. Unless a license is added, reuse and redistribution are subject to applicable copyright law.

---

⭐ If you find this project useful for learning, feel free to explore the source code and understand how the components work together.
