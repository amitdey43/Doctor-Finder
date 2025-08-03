# 🩺 SymptoCare

SymptoCare is a powerful web application designed to connect patients with suitable doctors based on their symptoms and medical needs. 🧠💊  
Users describe their symptoms in free text, get matched to appropriate specialists, view doctor profiles and availability, and book or cancel appointments seamlessly.

Doctors have their own dedicated panel to manage profile details, availability, and upcoming appointments.

---

## 🛠️ Built With

- 🟢 Node.js
- 🚂 Express.js
- 🍃 MongoDB (Compass / Atlas)
- 🎨 EJS Templates
- 🌈 Tailwind CSS
- 🔐 JWT Authentication (HTTP-only Cookies)
- ☁️ Cloudinary (for image uploads)
- 📧 Nodemailer (Gmail SMTP with App Password)

---

## 🌟 Key Features

## 📁 Folder Structure

HACK-PRO/
├── config/
│ ├── db.js
│ ├── days/
│ │ ├── day.js
│ │ └── day1.js
├── email/
│ └── conformationtouser.js
├── middleware/
│ ├── custom.js
│ ├── deletee.js
│ └── deleteee.js
├── models/
│ ├── appointment.js
│ ├── doctor.js
│ ├── dr_app.js
│ └── user.js
├── node_modules/
├── public/
│ ├── assets/
│ ├── images/
│ ├── javascript/
│ └── stylesheets/
│ └── style1.css
├── router/
│ ├── doctor.routes.js
│ └── user.routes.js
├── specialities/
│ └── objectkey.js
├── views/
│ ├── available.ejs
│ ├── confirmation.ejs
│ ├── create.ejs
│ ├── createdr.ejs
│ ├── edit.ejs
│ ├── index.ejs
│ ├── kal.ejs
│ ├── list.ejs
│ ├── login1.ejs
│ ├── login.ejs
│ ├── page1.ejs
│ ├── page3.ejs
│ ├── panel.ejs
│ ├── panel2.ejs
│ └── symptoms.ejs
├── .env
├── .gitignore
├── index.js
├── package-lock.json
├── package.json
├── README.md
└── vercel.json

### 👤 User Features

#### 🩻 Symptom Checker

- 📝 Free-text symptom input
- 🤖 Keyword & basic NLP mapping
- 👨‍⚕️ Specialist recommendation based on input

#### 📅 Appointment Booking

- 🔍 View available doctors by specialty
- 🔎 Search by doctor name, specialty, or clinic address
- 📆 Pick date/time (today to 14 days out)
- ✅ Instant on-screen confirmation & email receipt
- ⏳ Shows booking status: `Pending` until doctor approval → `Confirmed`

#### 📋 Dashboard

- 📌 List of booked appointments
- ❌ Users can cancel appointments **up to 1 hour before** the scheduled time  
  📩 Email notifications are sent to both patient and doctor
- 👁️ Approved appointments remain visible to the patient for **1 hour after** the scheduled time

#### 🧑‍💼 Profile Management

- 🔐 Sign up / Log in with JWT + HTTP-only cookies
- ✏️ Update personal details

#### 📧 Email Confirmation Requirement

Users **must show** their appointment confirmation email or booking list to the doctor at the clinic.  
📩 Only patients with email confirmation appear in the doctor’s **"Approved Appointments"** list for up to **1 hour after the scheduled time**.

---

### 🩺 Doctor Features

#### 🖼️ Profile Creation & Editing

- 📸 Upload profile photo via Cloudinary
- 🏥 Set specialties, clinic address, fee, experience, available days & time slots
- 🛠️ Edit personal details, availability, or photo on the fly

#### 📥 Appointment Approval Flow

- 🕐 View pending appointment requests
- ✅ Accept or ❌ Reject bookings
- 📋 Approved bookings move to **Approved Appointments**
- 🕒 Approved patient details remain visible for **1 hour after** appointment time

#### 📊 Dashboard & Notifications

- 📅 View upcoming & approved appointments (with patient name, contact, date/time)
- 📩 Receive email notifications on:
  - New bookings
  - Cancellations

#### 📆 Availability Management

- 🔄 Update available days and time slots dynamically

---

## 🔐 Core Features

### ✅ Authentication & Authorization

- 🔒 Secure JWT-based auth with HTTP-only cookies for both users and doctors

### 📬 Email Notifications

- 📧 Powered by Nodemailer using Gmail SMTP + App Password
- 📨 Sends:
  - Booking confirmations to patients
  - Booking/cancellation notifications to doctors

### 📱 Responsive UI

- 💻 Tailwind CSS + EJS templates
- 📲 Fully mobile-friendly and fast

### 🖼️ Image Uploads

- ☁️ Doctor profile images stored securely on Cloudinary

---

## 🚀 Future Scope (Optional)

- 💬 Add chat between doctor and patient
- 🧾 Integrate prescription download feature
- 🔔 Real-time notifications via WebSockets

---

Feel free to contribute or open issues if you have ideas or find bugs!  
🧑‍💻 Happy healing with SymptoCare!
