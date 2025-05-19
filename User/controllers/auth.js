import db from '../../utils/allModels.js';

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await db.User.create({ name, email, password, createdAt: new Date(), updatedAt: new Date() });
    res.status(201).json({ success: true, user });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email } });
    if (!user || user.password !== password) return res.status(401).json({ success: false, message: 'Invalid credentials' });

    res.status(200).json({ success: true, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

export default { register, login };
