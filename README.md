# Doctor Finder
![thumbnail](./public/assets/landingPage-76a3571c-3790-4551-9082-da681141b7fe)
## 🗂️ Description

Doctor Finder is a web application designed to connect patients with doctors. The platform allows users to search for doctors based on their symptoms, book appointments, and manage their appointments. Doctors can create profiles, manage their appointments, and interact with patients. The application uses a robust tech stack to ensure a seamless user experience.

The application is built with a focus on simplicity, scalability, and maintainability. It uses a microservices architecture, with separate modules for user management, doctor management, appointment management, and email services.

## ✨ Key Features

### **User Features**

*   **Symptom Checker**: Users can describe their symptoms and find suitable doctors.
*   **Doctor Search**: Users can search for doctors based on their location, specialty, and availability.
*   **Appointment Booking**: Users can book appointments with doctors.
*   **Appointment Management**: Users can view and manage their appointments.

### **Doctor Features**

*   **Profile Management**: Doctors can create and manage their profiles.
*   **Appointment Management**: Doctors can view and manage their appointments.
*   **Patient Interaction**: Doctors can interact with patients through the platform.

### **Admin Features**

*   **User Management**: Admins can manage user accounts.
*   **Doctor Management**: Admins can manage doctor accounts.

## 🗂️ Folder Structure

```mermaid
graph TD;
src-->config;
src-->controllers;
src-->models;
src-->middleware;
src-->router;
src-->views;
src-->email;
src-->days;
src-->specialities;
src-->utils;
```

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodejs&logoColor=white&style=for-the-badge)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?logo=mongodb&logoColor=white&style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-4ea94b?logo=mongoose&logoColor=white&style=for-the-badge)
![EJS](https://img.shields.io/badge/EJS-F7F7F7?logo=ejs&logoColor=black&style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-8B9467?logo=nodemailer&logoColor=white&style=for-the-badge)
![Cloudinary](https://img.shields.io/badge/Cloudinary-03BFFF?logo=cloudinary&logoColor=white&style=for-the-badge)

## ⚙️ Setup Instructions

### **Prerequisites**

*   Node.js (version 16 or higher)
*   MongoDB (version 5 or higher)
*   A code editor or IDE

### **Installation**

1.  Clone the repository: `git clone https://github.com/amitdey43/Doctor-Finder.git`
2.  Navigate to the project directory: `cd Doctor-Finder`
3.  Install dependencies: `npm install`
4.  Create a `.env` file and add your environment variables:
    *   `MONGO_URI`: Your MongoDB connection string
    *   `EMAIL`: Your email address
    *   `PASSWORD`: Your email password
5.  Start the server: `npm start`

## 🚀 GitHub Actions

The repository uses GitHub Actions for continuous integration and deployment. The workflow is defined in the `.github/workflows/main.yml` file.

```yml
name: Node.js CI

on:
  push:
    branches: [ main ]

jobs:
  build:

    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v2
    - name: Use Node.js 16
      uses: actions/setup-node@v2
      with:
        node-version: '16'
    - run: npm install
    - run: npm run test
    - run: npm run build
```

## 📝 Commit Messages

Commit messages should follow the standard format:

`fix: <description>`

`feat: <description>`

`docs: <description>`

`style: <description>`

`refactor: <description>`

`perf: <description>`

`test: <description>`

`build: <description>`

`ci: <description>`

`chore: <description>`



<br><br>
<div align="center">
<img src="https://avatars.githubusercontent.com/u/222601664?v=4" width="120" />
<h3>Amit kumar dey </h3>
<p>Developer interested in coding.</p>
</div>
<br>
<p align="right">
<img src="https://gitfull.vercel.app/appLogo.png" width="20"/>  <a href="https://gitfull.vercel.app">Made by GitFull</a>
</p>
    