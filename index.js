const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse incoming JSON data

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'MySql@VanTho0948',
  database: 'e_shopping',
}).promise();

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database');
});

app.get('/api/products', (req, res) => {
  const query = 'SELECT * FROM product';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query: ' + err.stack);
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});
// 
// Authentication
app.post('/api/sign_up', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
    const [emailCheckResults] = await db.query(checkEmailQuery, [email]);

    if (emailCheckResults.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }

    const password_hash = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO user (username, email, password_hash, is_personal_trainer, is_admin)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [username, email, password_hash, false, false]);

    res.json({ message: 'User signed up successfully', userId: result.insertId });
  } catch (error) {
    console.error('Error signing up user: ', error);
    res.status(500).json({ error: 'Failed to sign up user' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const checkEmailQuery = 'SELECT * FROM user WHERE email = ?';
    const [emailCheckResult] = await db.query(checkEmailQuery, [email]);

    if (emailCheckResult.length === 0) {
      return res.status(500).json({ error: 'Email does not exist!' });
    }

    const user = emailCheckResult[0];
    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const isTrainer = user.is_personal_trainer === 1;
    const isAdmin = user.is_admin === 1;

    const token = jwt.sign(
      { userId: user.userId, username: user.username, email: user.email, isTrainer, isAdmin },
      'Adassdghjkn-asd@f#gD<lvl',
      { expiresIn: '1h' }
    );

    res.json({ message: 'Login successful', user: { userId: user.userId, email: user.email }, token });
  } catch (error) {
    console.error('Error during login: ', error);
    res.status(500).json({ error: 'An error occurred during login' });
  }
});


// 
app.post('/api/products', (req, res) => {
  const { name, desctiption, sell_price, cost_price, image_url, categoryId, stock_quantity } = req.body;
  const query = 'INSERT INTO product (name, desctiption, sell_price, cost_price, image_url, categoryId, stock_quantity) VALUES (?, ?)';

  db.query(query, [name, desctiption, sell_price, cost_price, image_url, categoryId, stock_quantity], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      return res.status(500).json({ error: 'Failed to insert product' });
    }
    res.json({ message: 'Product added successfully', productId: result.id });
  });
});

// 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  db.end((err) => {
    if (err) {
      console.error('Error closing the database connection: ' + err.stack);
    } else {
      console.log('Database connection closed');
    }
    process.exit();
  });
});
