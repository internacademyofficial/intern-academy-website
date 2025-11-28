# 🎓 Intern Academy

Official website for **Intern Academy** - India's premier platform connecting students with top internship opportunities and industry-relevant courses.

🌐 **Live at:** [internacademy.co.in](https://internacademy.co.in)

---

## 📋 About

Intern Academy empowers the next generation of tech leaders through:
- 💼 Premium internship opportunities from top companies
- 📚 Industry-relevant courses designed by experts
- 🤝 Mentorship programs
- 📰 Latest industry news and insights

---

## ✨ Features

### Student Portal
- Browse and apply for internships
- Enroll in courses
- Track applications
- Access learning resources

### Company Portal
- Post internship opportunities
- Search for talented students
- Manage applications
- Company profile management

### Course Platform
- 6+ industry-relevant courses
- Filter by category (Development, Data Science, Design, Marketing)
- Interactive enrollment system
- Progress tracking

---

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Styling:** Custom CSS with modern design patterns
  - Glassmorphism effects
  - Gradient backgrounds
  - Smooth animations
- **Icons:** Font Awesome 6.4.0
- **Fonts:** Inter (Google Fonts)
- **Database:** Firebase Firestore
- **Hosting:** Netlify
- **Domain:** GoDaddy

---

## 📁 Project Structure

```
intern_academy_v2/
├── index.html              # Homepage
├── courses.html            # Courses listing with filter
├── internships.html        # Internships listing
├── about.html              # About us page
├── contact.html            # Contact page
├── news.html              # News & blog
├── login.html             # User login
├── register-student.html   # Student registration
├── register-company.html   # Company registration
├── style.css              # Main stylesheet
├── app.js                 # Main JavaScript
├── firebase-config.js     # Firebase configuration
├── .gitignore            # Git ignore rules
└── DEPLOYMENT_GUIDE.md    # Deployment instructions
```

---

## 🚀 Quick Start

### Prerequisites
- Modern web browser
- Git installed
- Node.js (optional, for local server)

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/internacademyofficial/intern-academy-website.git
   cd intern-academy-website
   ```

2. **Open in browser**
   - Simply open `index.html` in your browser
   - Or use a local server:
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js
     npx serve
     ```

3. **Visit**
   ```
   http://localhost:8000
   ```

---

## 🌈 Design Highlights

### Color Palette
- **Primary:** Slate Navy (#0f172a)
- **Accent:** Vibrant Blue (#3b82f6)
- **Gold:** Amber (#f59e0b)
- **Background:** Slate 50 (#f8fafc)

### Key Features
- ✅ Fully responsive design
- ✅ Modern glassmorphism effects
- ✅ Smooth animations and transitions
- ✅ Interactive hover states
- ✅ Accessible and SEO-optimized

---

## 📱 Pages Overview

| Page | Description | Status |
|------|-------------|--------|
| Home | Landing page with hero section, stats, features | ✅ Complete |
| Courses | 6 courses with category filtering | ✅ Complete |
| Internships | Featured internship listings | ✅ Complete |
| News | Latest updates and blog | ✅ Complete |
| About Us | Company information | ✅ Complete |
| Contact | Contact form and details | ✅ Complete |
| Login | User authentication | ✅ Complete |
| Register (Student) | Student signup form | ✅ Complete |
| Register (Company) | Company signup form | ✅ Complete |

---

## 🗄️ Database Structure

### Firebase Collections

**Students Collection**
```javascript
{
  name: string,
  email: string,
  phone: string,
  college: string,
  course: string,
  registeredAt: timestamp
}
```

**Companies Collection**
```javascript
{
  companyName: string,
  contactPerson: string,
  email: string,
  phone: string,
  website: string,
  industry: string,
  registeredAt: timestamp
}
```

---

## 🔧 Configuration

### Firebase Setup

1. Create a Firebase project at [firebase.google.com](https://firebase.google.com)
2. Enable Firestore Database
3. Copy your config to `firebase-config.js`:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};
```

---

## 📦 Deployment

### Deploy to Netlify

1. **Connect to GitHub**
   - Sign up at [netlify.com](https://netlify.com)
   - Connect your GitHub repository

2. **Build Settings**
   - Build command: (leave empty - static site)
   - Publish directory: `/`

3. **Deploy!**
   - Click "Deploy site"
   - Your site will be live at `*.netlify.app`

### Connect Custom Domain

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed DNS setup instructions.

---

## 🎯 Roadmap

- [x] Responsive website design
- [x] Course filtering system
- [x] Registration forms
- [ ] Firebase integration
- [ ] User authentication
- [ ] Payment gateway integration
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Application tracking system
- [ ] Course progress tracker

---

## 👥 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is proprietary and confidential.  
© 2024 Intern Academy. All rights reserved.

---

## 📞 Contact

- **Website:** [internacademy.co.in](https://internacademy.co.in)
- **Email:** contact@internacademy.co.in
- **GitHub:** [@internacademyofficial](https://github.com/internacademyofficial)

---

## 🙏 Acknowledgments

- Font Awesome for icons
- Google Fonts for Inter typography
- Firebase for backend services
- Netlify for hosting

---

**Made with ❤️ in India 🇮🇳**
