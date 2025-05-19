import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import User from './models/user.js'; 

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const admin = new AdminJS({
  resources: [User],
  rootPath: '/admin',
  branding: {
    companyName: 'Admin Panel',
    softwareBrothers: false,
  }
});

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
  admin,
  {
    authenticate: async (email, password) => {
      if (
        email === process.env.ADMIN_EMAIL &&
        password === process.env.ADMIN_PASSWORD
      ) {
        return { email };
      }
      return null; 
    },
    cookieName: 'adminjs',
    cookiePassword: process.env.JWT_SECRET,
  },
  null,
  {
    resave: false,
    saveUninitialized: false,
    secret: process.env.JWT_SECRET,
    cookie: {
      httpOnly: true,
      secure: false, 
      maxAge: 24 * 60 * 60 * 1000,
    },
  }
);

export { admin, adminRouter };
