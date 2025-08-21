# 🧑‍⚕️ Aesthetic Clinic Management System

A full-stack project to manage **skin & aesthetic clinic services**.  
The system helps in handling **Concerns → Treatments → Packages → Enquiries** efficiently with a clean React frontend and Node.js backend.

---

## 📌 Project Overview
This project is designed to streamline how aesthetic clinics organize their services:

- Users can **browse concerns** like acne scars, wrinkles, or dark circles.  
- Each concern is mapped to **relevant treatments**.  
- **Packages** combine multiple treatments into affordable plans.  
- Clients can make **enquiries** by submitting their name, email, and message.  

This makes it easy for clinics to present their services and for clients to understand treatment options.

---

## 🔒 Authentication & Access

Currently, this project is built as a **demo prototype** and does not include authentication (login/signup).  
- The **Admin Panel** is publicly accessible in this version.  
- No private routes or role-based access control are implemented yet.  
- If required, authentication (JWT, OAuth, or any custom login system) can be integrated to secure the Admin Panel and user-specific routes.  

This was done intentionally to keep the demo simple and focused on **Concerns → Treatments → Packages → Enquiry flow**.


## 🚀 Features

### 🔹 Concerns
- Manage skin & facial concerns (Acne Scars, Dark Circles, Double Chin, Wrinkles, etc.)
- Each concern has a description.

### 🔹 Treatments
- Treatments mapped to one or more concerns.
- Each treatment has a detailed description.
- Examples: Microneedling, Chemical Peel, PRP, Botox, HIFU, Laser Resurfacing, etc.

### 🔹 Packages
- Bundled treatments for holistic care.
- Pricing included for packages.
- Examples:
  - **Wrinkle Relax & Lift** – Botox + HIFU  
  - **Bright Eyes Rejuvenation** – PRP + Under-eye Filler  
  - **Complete Anti-Aging Package** – Microneedling + PRP + Botox  

### 🔹 Enquiries
- Clients can enquire about packages.
- Each enquiry stores:
  - Name
  - Email
  - Message
  - Linked package

---

## 🛠️ Tech Stack

### Frontend
- **React.js**
- **Tailwind CSS**
- Components: ConcernList, TreatmentList, PackageList, EnquiryForm, AdminDashboard

### Backend
- **Node.js** + **Express.js**
- **MongoDB** (Mongoose ORM)
- REST APIs:
  - `GET /search?concern=<text>` → returns concern, matched treatments, and packages
  - `POST /create-enquiry` → saves enquiry
  - `GET /get-all-enquiry` → lists all enquiries

---


---

## 📊 Sample Data

### Concerns
- Acne Scars
- Dark Circles
- Double Chin
- Wrinkles
- Oily Skin

### Treatments (with descriptions)
- **Microneedling** – Improves skin texture and reduces acne scars.
- **Chemical Peel** – Removes dead skin cells and brightens complexion.
- **PRP (Platelet Rich Plasma)** – Promotes collagen production and skin rejuvenation.
- **Botox** – Reduces fine lines and wrinkles.
- **HIFU** – Non-surgical facelift and skin tightening.
- **Kybella** – Reduces double chin fat.

### Packages
1. **Wrinkle Relax & Lift** – Botox + HIFU (₹15,000)  
2. **Bright Eyes Rejuvenation** – PRP + Under-eye Filler (₹12,000)  
3. **Acne Scar Repair** – Microneedling + PRP + Chemical Peel (₹18,000)  
4. **Double Chin Slimming** – Kybella + HIFU (₹20,000)  
5. **Complete Anti-Aging** – Microneedling + PRP + Botox + HIFU (₹30,000)

---

## 📨 Sample Enquiries

```json
[
  {
    "name": "Ananya Sharma",
    "email": "ananya@example.com",
    "message": "I am interested in the Bright Eyes Rejuvenation package. Please share details.",
    "package": "Bright Eyes Rejuvenation"
  },
  {
    "name": "Ravi Mehta",
    "email": "ravi.mehta@example.com",
    "message": "Can you suggest something for double chin reduction?",
    "package": "Double Chin Slimming"
  },
  {
    "name": "Simran Kaur",
    "email": "simran@example.com",
    "message": "Looking for anti-aging treatment. Please guide me.",
    "package": "Complete Anti-Aging"
  }
]
```

## ⚙️ Installation & Setup

### 1. Clone the repo
```bash
  https://github.com/SatynarayanMaurya/Cosma-Beauty-Demo.git
  cd Cosma-Beauty-Demo
```
### 2. Setup Backend
```bash
  cd backend
  npm install
  npm start
```
### 3. Setup Frontend
```bash
  cd frontend
  npm install
  npm start
```
<img width="919" height="3430" alt="image" src="https://github.com/user-attachments/assets/eba58904-d19e-4158-89ae-447f936ff8db" />
