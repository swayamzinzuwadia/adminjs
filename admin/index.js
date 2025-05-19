import AdminJS from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import AdminJSSequelize from '@adminjs/sequelize';
import User from '../models/User.js';
import session from 'express-session';

AdminJS.registerAdapter({
  Resource: AdminJSSequelize.Resource,
  Database: AdminJSSequelize.Database,
});

const adminJsOptions = {
  resources: [
    {
      resource: User,
      options: {
        properties: {
          password: {
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
            isTitle: false,
          },
          createdAt: {
            isVisible: {
              list: true,
              edit: false,
              filter: true,
              show: true,
            },
          },
          updatedAt: {
            isVisible: {
              list: true,
              edit: false,
              filter: true,
              show: true,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  password: request.payload.password,
                };
              }
              return request;
            },
          },
          edit: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  password: request.payload.password,
                };
              }
              return request;
            },
          },
        },
      },
    },
  ],
  rootPath: '/admin',
  branding: {
    companyName: 'AdminJS Demo',
    logo: false,
    softwareBrothers: false,
  },
};

const admin = new AdminJS(adminJsOptions);

const sessionStore = new session.MemoryStore();

// const adminRouter = AdminJSExpress.buildAuthenticatedRouter(
//   admin,
//   {
//     authenticate: async (email, password) => {
//       if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
//         return { email: process.env.ADMIN_EMAIL };
//       }
//       return false;
//     },
//     cookieName: 'adminjs',
//     cookiePassword: process.env.JWT_SECRET || 'swayam',
//   },
//   null,
//   {
//     store: sessionStore,
//     resave: true,
//     saveUninitialized: true,
//     secret: process.env.JWT_SECRET || 'swayam',
//     cookie: {
//       httpOnly: process.env.NODE_ENV === 'production',
//       secure: process.env.NODE_ENV === 'production',
//       maxAge: 1000 * 60 * 60 * 24, // 24 hours
//     },
//     name: 'adminjs',
//   }
// );

const adminRouter = AdminJSExpress.buildAuthenticatedRouter(admin, {
  authenticate: async (email, password) => {
    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      return { email };
    }
    return false;
  },
  cookieName: 'adminjs',
  cookiePassword: process.env.JWT_SECRET || 'swayam',
});


export { admin, adminRouter }; 