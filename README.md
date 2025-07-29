# Doctor Finder: Connecting Patients with the Right Doctors 🌟
![thumbnail](./public/assets/landingPage-76a3571c-3790-4551-9082-da681141b7fe)

## 🗂️ Description

Doctor Finder is a web application designed to bridge the gap between patients and healthcare professionals. It allows users to find and book appointments with suitable doctors based on their symptoms, specialty, and availability. The platform aims to streamline the process of seeking medical care, making it more efficient and accessible for both patients and doctors.

## ✨ Key Features

### **User Features** 🌟
- **Symptom Checker**: Users can describe their symptoms and find relevant doctors.
- **Doctor Listings**: Browse through a list of available doctors, filterable by specialty, location, and more.
- **Appointment Booking**: Schedule appointments with chosen doctors.
- **Profile Management**: Users can manage their profiles, including updating personal details.

### **Doctor Features** 💼
- **Profile Creation**: Doctors can create profiles showcasing their specialty, experience, and availability.
- **Appointment Management**: View and manage scheduled appointments.
- **Profile Editing**: Update profile information, including specialty, clinic details, and availability.

## 🗂️ Folder Structure

```mermaid
graph TD;
    src-->config;
    src-->models;
    src-->middleware;
    src-->router;
    src-->views;
    src-->email;
    src-->days;
    src-->specialities;
    src-->index.js;
    config-->db.js;
    models-->user.js;
    models-->doctor.js;
    models-->appointment.js;
    middleware-->custom.js;
    middleware-->deletee.js;
    router-->user.routes.js;
    router-->doctor.routes.js;
```

## 🛠️ Tech Stack

![Express.js](https://img.shields.io/badge/Express.js-000?logo=express&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?logo=mongodb&logoColor=white&style=for-the-badge)
![Mongoose](https://img.shields.io/badge/Mongoose-800?logo=mongoose&logoColor=white&style=for-the-badge)
![EJS](https://img.shields.io/badge/EJS-F5F5DC?logo=ejs&logoColor=black&style=for-the-badge)
![Nodemailer](https://img.shields.io/badge/Nodemailer-80C5DE?logo=nodemailer&logoColor=white&style=for-the-badge)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black&style=for-the-badge)

## ⚙️ Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/amitdey43/Doctor-Finder.git
   ```
2. **Install Dependencies**:
   ```bash
   cd Doctor-Finder
   npm install
   ```
3. **Environment Setup**:
   - Create a `.env` file in the root directory and add your MongoDB connection string and other environment variables.
   ```plaintext
   DB_CONNECTION_STRING=your_mongodb_connection_string
   ```
4. **Start the Server**:
   ```bash
   npm start
   ```
5. **Access the Application**:
   - Open your web browser and navigate to `http://localhost:3000`.

## 🤖 GitHub Actions

This project utilizes GitHub Actions for continuous integration and deployment. The workflow is defined in the `.github/workflows/main.yml` file and includes steps for:

- **Checkout Code**: Checks out the repository code.
- **Install Dependencies**: Installs project dependencies.
- **Run Tests**: Executes tests (if implemented).
- **Deploy to Production**: Deploys the application to a production environment.

```yml
name: Main Workflow

on:
  push:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v2

      - name: Install dependencies
        run: npm install

      - name: Build and deploy
        run: npm start
```

## 📝 Known Issues and Future Enhancements

- **Symptom Checker Accuracy**: Enhance the symptom checker algorithm for more accurate doctor recommendations.
- **User Authentication**: Implement more robust authentication mechanisms, including two-factor authentication.
- **Payment Gateway Integration**: Integrate a secure payment gateway for appointment bookings.



<br><br>
<div align="center">
<img src="https://avatars.githubusercontent.com/u/222601664?v=4" width="120" />
<h3>null</h3>
<p>No information provided.</p>
</div>
<br>
<p align="right">
<img src="https://gitfull.vercel.app/appLogo.png" width="20"/>  <a href="https://gitfull.vercel.app">Made by GitFull</a>
</p>
    