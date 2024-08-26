const pool = require('../config/database');

// Helper function to exclude the password from the user object
const excludePassword = (user) => {
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

// Create a new user
const createUser = async (user) => {
  const { first_name, last_name, email, password, user_type } = user;
  const query = `
    INSERT INTO users (first_name, last_name, email, password, user_type)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [first_name, last_name, email, password, user_type];

  try {
    const result = await pool.query(query, values);
    return excludePassword(result.rows[0]);
  } catch (err) {
    throw new Error('Error creating user: ' + err.message);
  }
};

// Get all users
const getAllUsers = async () => {
  const query = 'SELECT * FROM users;';

  try {
    const result = await pool.query(query);
    return result.rows.map(excludePassword);
  } catch (err) {
    throw new Error('Error retrieving users: ' + err.message);
  }
};

// Get a user by ID
const getUserById = async (id) => {
  const query = 'SELECT * FROM users WHERE id = $1;';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return excludePassword(result.rows[0]);
  } catch (err) {
    throw new Error('Error retrieving user: ' + err.message);
  }
};

// Update a user by ID
const updateUserById = async (id, user) => {
  const { first_name, last_name, email, password } = user;
  const query = `
    UPDATE users
    SET first_name = $1, last_name = $2, email = $3, password = $4
    WHERE id = $5
    RETURNING *;
  `;
  const values = [first_name, last_name, email, password, id];

  try {
    const result = await pool.query(query, values);
    return excludePassword(result.rows[0]);
  } catch (err) {
    throw new Error('Error updating user: ' + err.message);
  }
};

// Delete a user by ID
const deleteUserById = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING *;';
  const values = [id];

  try {
    const result = await pool.query(query, values);
    return excludePassword(result.rows[0]);
  } catch (err) {
    throw new Error('Error deleting user: ' + err.message);
  }
};

// Get a user by email
const getUserByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1;';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (err) {
    throw new Error('Error retrieving user by email: ' + err.message);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  getUserByEmail
};
