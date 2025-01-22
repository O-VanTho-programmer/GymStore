const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse incoming JSON data

// MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: 'MySql@VanTho0948',
  database: 'e_shopping', 
});

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

app.post('/api/products', (req, res) => {
  const { name, desctiption, sell_price, cost_price, image_url, categoryId, stock_quantity } = req.body; 
  const query = 'INSERT INTO product (name, desctiption, sell_price, cost_price, image_url, categoryId, stock_quantity) VALUES (?, ?)';
  
  db.query(query, [name, desctiption, sell_price, cost_price , image_url, categoryId, stock_quantity], (err, result) => {
    if (err) {
      console.error('Error inserting data: ' + err.stack);
      return res.status(500).json({ error: 'Failed to insert product' });
    }
    res.json({ message: 'Product added successfully', productId: result.id });
  });
});

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
