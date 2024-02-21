const pool = require('../../src/postgresdb');

const getAllUsers = async (req, res) => {
  try {
    const users = await pool.query('SELECT * FROM users');
    res.json(users.rows);
  } catch (error) {
    console.error('Error retrieving users:', error.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getAllUsers };
