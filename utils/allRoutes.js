import authRoutes from '../user/routes/routes.js';

const allRoutes = (app) => {
  app.use('/api', authRoutes);
};

export default allRoutes;
