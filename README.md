# AdminJS Express Application

A Node.js application with Express, Sequelize, MySQL, and AdminJS integration.

## Features

- User authentication (register/login) with JWT
- AdminJS dashboard for user management
- Password hashing with bcrypt
- MySQL database with Sequelize ORM
- RESTful API endpoints

## Prerequisites

- Node.js (v14 or higher)
- MySQL server
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd <repository-name>
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
DB_NAME=adminjs_db
DB_USER=your_mysql_username
DB_PASS=your_mysql_password
DB_HOST=localhost
JWT_SECRET=your_jwt_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=admin123
```

4. Create the MySQL database:
```sql
CREATE DATABASE adminjs_db;
```

5. Start the application:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

The server will start on port 3000 by default.

## API Endpoints

### Authentication

- `POST /api/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `POST /api/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

## Admin Dashboard

Access the AdminJS dashboard at `http://localhost:3000/admin`

Default admin credentials:
- Email: admin@example.com
- Password: admin123

## Features

- User management (CRUD operations)
- Secure password handling
- JWT authentication
- Admin dashboard with user management
- Database auto-sync with Sequelize

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Secure session handling
- Environment variable configuration
- Password field protection in AdminJS

## Project Structure

```
├── admin/
│   └── index.js
├── config/
│   └── database.js
├── models/
│   └── User.js
├── routes/
│   └── auth.js
├── .env
├── app.js
├── package.json
└── README.md
``` 