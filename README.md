
# Art Gallery System

The Krookskala Art Gallery System is an interactive web application designed to enhance the way users interact with art galleries. It provides a seamless platform for browsing and managing artworks, artists, and exhibitions. Whether you're an art enthusiast exploring collections or an administrator managing gallery data, this system offers a robust and user-friendly experience.

![Image](https://github.com/user-attachments/assets/d6232ff6-f407-4f22-a7e3-2d343534a63c)

![Image](https://github.com/user-attachments/assets/1bd04fb0-e85f-4468-bf5c-373b2d1556da)

![Image](https://github.com/user-attachments/assets/9e85d2b2-b38a-4cf9-a69a-992b2f42bed0)

![Image](https://github.com/user-attachments/assets/fb63ba6c-35bd-48a3-ba73-50be52a86b1b)

![Image](https://github.com/user-attachments/assets/6cc2987d-cdbf-4b50-9471-eee2173582ff)

![Image](https://github.com/user-attachments/assets/4b9cce4b-d376-4296-b680-acca320ec4da)


## Table Of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Detailed File Descriptions](#usage)
- [Contributing](#contributing)
- [Links](#links)
- [License](#license)
## Project Overview

The Krookskala Art Gallery System combines modern web technologies to provide an immersive experience for gallery visitors and administrators. The project features responsive design, robust security, and extensive tools for managing and interacting with artistic content.
## Features

**Core Features**

- **Dynamic Content:** Responsive and visually engaging pages rendered with Handlebars templates, adapting seamlessly to various devices.
- **Secure User Authentication:** Robust signup and login system with bcrypt password hashing and session management.
- **Role-Based Access Control (RBAC):** Customized experiences for guests, registered users, and administrators, ensuring secure and appropriate access.


**User-Centric Features**


- **Personalized Bookmarks:** Users can bookmark exhibitions for easy access and revisit.
- **Favorites Management:** Save and manage preferred artistic styles, tailored to individual preferences.
- **Activity Feed:** View a history of personal interactions and actions within the system for enhanced user engagement.
- **Interactive Art Exploration:** Browse detailed profiles of artists, styles, and exhibitions, enriched with visual and textual data.
- **Pagination Support:** Effortlessly navigate through extensive collections without compromising performance.


**Administrative Features**


- **Comprehensive CRUD Operations:** Administrators can create, read, update, and delete records for:
    - Artists
    - Artworks
    - Styles
    - Exhibitions
- **User Management Tools:** Assign roles, track activity, and ensure data integrity.
- **System Data Control:** Effortlessly maintain the quality and accuracy of gallery content.


**Advanced Functionalities**


- **Search and Filtering:** Quickly locate artworks, artists, or exhibitions using advanced search capabilities.
- **Dynamic Validation:** Input validation on both client and server sides to prevent errors and ensure data accuracy.
- **Exhibition Management:** Manage upcoming events, including their details and visual presentations.
- **Data Relationships:** Explore connections between artists, styles, and their associated artworks.


 **Visual Appeal and UX**
 
 
 - **UI Customization:** Sleek and responsive design using the UKit CSS framework and custom CSS.
- **Interactive UI:** Mouse-hover effects, transitions, and tooltips for intuitive navigation.
- **Gallery Showcase:** Highlights featured artworks and exhibitions, providing users with a visually captivating preview of the most notable pieces.


**Security Features**
 

- **Password Encryption:** Employs bcrypt to securely hash and store user credentials.
- **Session Management:** Maintains secure user sessions with Passport.js.
- **Error Handling:** Comprehensive logging and error management for both backend and frontend operations.


**Performance and Scalability**



- **Lightweight Backend:** Optimized API routes with Express.js ensure fast response times.
- **Database Optimization:** SQLite integration with Sequelize ORM for efficient query handling and relationship management.
- **Future-Ready:** Designed for easy upgrades to a production database like PostgreSQL.


**Future-Proof Roadmap**


- **Multi-Language Support:** Enable internationalization (i18n) for global accessibility.
- **Single Page Application (SPA):** Upgrade to frameworks like React or Vue.js for a seamless experience.
- **Analytics Dashboard:** Provide detailed insights into user engagement, popular exhibitions, and artworks.
- **Cloud Storage:** Store high-resolution images and assets securely on cloud platforms.
- **Real-Time Features:** Implement live chat or comments for user discussions about artworks and exhibitions.
 
 
 
## Getting Started

Follow these instructions to set up the Krookskala Art Gallery System on your local machine for development, testing, or deployment.

### Prerequisites

Ensure you have the following software installed on your machine:

- Node.js (v14.0 or higher)
- npm (Node Package Manager)
- SQLite (for local database setup)
- Git (to clone the repository)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/krookskala/Art-Gallery-System

2. **Install dependencies**
   ```bash
    npm install
    npm init -y
    npm install express dotenv express-session passport passport-local
    npm install express-handlebars
    npm install sequelize sqlite3
    npm install express-session
    npm install connect-session-sequelize

3. **Set up the database**
   ```bash
   npx sequelize-cli db:seed:all

4. **Start the application**
   ```bash
   npm start

5. **Access the game**
   ```bash
   Navigating to http://localhost:3000 in your web browser
   
### Docker Deployment
If you prefer to use Docker, you can build and run the game in a container:

1. **Build the Docker image**
   ```bash
   docker build -t art-gallery-system 

2. **Run the Docker container**
   ```bash
   docker run -p 3000:3000 art-gallery-system

3. **Access the system**
    ```bash
    http://localhost:3000

### Testing
Run automated tests to ensure everything is working correctly:

```bash
npm test

```
## Detailed File Descriptions

- **server.js:** The main Node.js file, serving as the entry point for the backend application. Manages routing, middleware, and server configuration.
- **/models:** Sequelize models for database entities such as **User**, **Artist**, **Artwork**, **Style**, and **Exhibition**.
- **/routes:** API route handlers for managing users, artworks, exhibitions, and authentication.
- **/views:** Handlebars templates for rendering the frontend user interface, including pages for browsing artworks and managing exhibitions.
- **/public:** Static assets like CSS, JavaScript, and image files used for styling and interactivity.
- **.env:** Environment configuration file to manage application secrets, such as database credentials and session keys.
- **/config:** Configuration files for database connections and Sequelize settings.
- **/migrations:** Scripts for creating and modifying database schema.
- **/seeders:** Predefined data scripts to populate the database with initial records for testing and demonstration.
- **/tests:** Unit and integration tests for verifying the application's functionality and security.

## Contributing

Contributions are welcome!

If you find any issues or have ideas for improvements, feel free to open an issue or submit a pull request.

Please make sure to follow the project's code of conduct.

1. **Fork the repository**
2. **Create your feature branch (git checkout -b feature/YourFeature)**
3. **Commit your changes (git commit -am 'Add some feature')**
4. **Push to the branch (git push origin feature/YourFeature)**
5. **Open a pull request**



## Links

[![Gmail](https://img.shields.io/badge/ismailsariarslan7@gmail.com-D14836?style=for-the-badge&logo=gmail&logoColor=white)](ismailsariarslan7@gmail.com)

[![instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/ismailsariarslan/)

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ismailsariarslan/)
## License

The code in this repository is licensed under the [MIT License.](https://choosealicense.com/licenses/mit/)
