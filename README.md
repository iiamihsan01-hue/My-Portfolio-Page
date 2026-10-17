# Ihsan Najeeb - Full Stack Developer Portfolio

Welcome to the repository for my personal portfolio website. This project showcases my skills, experience, and projects as a Full Stack Developer. It features a dynamic, interactive frontend and a robust backend for managing content.

## 🔗 Live Demo

Check out the live version of my portfolio here:
👉 **[View Portfolio Website](https://my-portfolio-iiamihsan01.netlify.app/)**

---

## ✨ Features

- **Dynamic Content**: Carousel-based navigation for Education, Projects, Skills, Certifications, and Contact.
- **Admin Dashboard**: Secure backend interface (`/admin`) to manage projects and view messages.
- **Interactive UI**: Custom animations, 3D tilt effects, and smooth transitions.
- **Responsive Design**: Fully optimized for desktop, tablet, and mobile devices.
- **Contact Form**: Functional contact form integrated with the backend database.
- **Dark Mode**: Monochrome design system with excellent contrast and readability.

## 🛠 Tech Stack

**Frontend:**
- HTML5, CSS3 (Custom Design System)
- JavaScript (ES6+, Async/Await)
- 3D Tilt Effects & Custom Animations

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JWT (JSON Web Tokens) for Authentication
- BCryptJS for Password Hashing
- CORS enabled for API access

## 🚀 Installation & Setup

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/iiamihsan01-hue/My-Portfolio-Page.git
    cd My-Portfolio-Page
    ```

2.  **Install Dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a `.env` file in the root directory and add:
    ```env
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    PORT=3000
    ```

4.  **Run the Server:**
    ```bash
    # Run in development mode (with nodemon)
    npm run dev

    # Run in production mode
    npm start
    ```

5.  **Access the Application:**
    - Portfolio: `http://localhost:3000`
    - Admin Panel: `http://localhost:3000/admin`

## 📂 Project Structure

```
├── public/
│   ├── index.html          # Main portfolio page
│   ├── admin/              # Admin panel interface
│   └── styles/             # CSS files
├── models/
│   ├── User.js             # User schema for authentication
│   ├── Project.js          # Project schema
│   └── Message.js          # Contact form messages
├── server.js               # Main Express server entry point
├── package.json            # Project dependencies and scripts
└── .env                    # Environment variables (not committed)
```

## 🔐 Security Features

- JWT-based authentication for admin access
- BCryptJS password hashing
- CORS protection
- Environment variable configuration for sensitive data

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

*Created by Ihsan Najeeb | Last Updated: October 2026*
