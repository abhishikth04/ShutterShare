# ShutterShare

A modern collaborative gallery platform where users can create temporary shared spaces, upload memories together, and experience immersive media sharing in a cinematic interface.

---

## Project Overview

ShutterShare is a fullstack MERN application built to simplify collaborative photo sharing.

Users can:

* Create shared spaces
* Join spaces using public invite codes
* Upload and view images collaboratively
* Experience a modern gallery interface inspired by premium media applications
* Manage active collaborative spaces in real time

The platform is designed with scalability, clean architecture, and modern UI/UX principles in mind.

---

## Features

### Authentication System

* User Signup & Login
* JWT-based Authentication
* Protected Routes
* Persistent Sessions

### Collaborative Spaces

* Create temporary gallery spaces
* Join spaces using public codes
* Active Spaces dashboard
* Member-based access system
* Automatic expiry handling for temporary spaces

### Image Upload System

* Cloudinary image hosting
* Multi-image uploads
* Upload previews before submission
* Fullscreen image viewer
* Download support

### Modern UI/UX

* Cinematic dark theme
* Glassmorphism-inspired interface
* Responsive layouts
* Masonry gallery design
* Smooth interactive hover effects
* Fullscreen media experience

### Dashboard Experience

* Floating glass navigation bar
* Immersive action panels
* Active space previews
* Live expiry countdowns
* Public code copy functionality

---

## Tech Stack

### Frontend

* React.js
* Tailwind CSS
* Axios
* React Router DOM
* Lucide React Icons
* React Icons

### Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication
* Multer
* Cloudinary

---

## Project Architecture

```bash
ShutterShare/
│
├── Client/
│   ├── src/
│   │   ├── components/
│   │   ├── assets/
│   │   ├── pages/
│   │   └── App.jsx
│   └── package.json
│
├── Server/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── config/
│   └── server.js
│
└── README.md
```

---


## API Highlights

### Authentication

* `POST /api/auth/signup`
* `POST /api/auth/login`

### Spaces

* `POST /api/spaces/create`
* `POST /api/spaces/join`
* `GET /api/spaces/my-spaces`
* `GET /api/spaces/:id`

### Uploads

* `POST /api/spaces/:id/upload`

---

## Security Features

* JWT token verification
* Protected API routes
* Member-only space access
* Expired space filtering
* Secure Cloudinary uploads

---

##  Current Development Status

### Implemented

* Authentication
* Space creation & joining
* Collaborative image uploads
* Active spaces dashboard
* Cloudinary integration
* Cinematic gallery UI
* Fullscreen image viewer
* Expiry system

### In Progress

* Personal spaces
* Image deletion
* Mobile optimization
* Deployment setup
* Docker support
* Advanced gallery interactions

---

## Key Learning Outcomes

This project helped strengthen understanding of:

* Fullstack MERN architecture
* REST API development
* Authentication workflows
* File upload pipelines
* Cloud storage integration
* Responsive UI design
* State management in React
* Backend route protection
* MongoDB schema design
* Collaborative application workflows

---


## Future Enhancements

* Real-time collaboration
* Image reactions & comments
* AI-powered image search
* Drag-and-drop uploads
* Gallery sharing links
* Notifications system
* Dockerized deployment
* Progressive Web App (PWA)

---

## Author

Built with passion by Abhishikth.

---
