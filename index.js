const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const upload = require('./src/utils/upload');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // To parse incoming JSON data

// Serve static files for uploaded media
app.use('/uploads/images', express.static('public/uploads/images'));
app.use('/uploads/videos', express.static('public/uploads/videos'));

app.post('/api/upload/image', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Invalid file type or no image uploaded' });
  }

  res.json({ message: 'Image uploaded successfully', imageUrl: `/uploads/images/${req.file.filename}` });
});

app.post('/api/upload/video', upload.single('video'), async (req, res) => {
  const { profileId } = req.body;

  if (!req.file) {
    return res.status(400).json({ error: 'Invalid file type or no video uploaded' });
  }

  if (!profileId) {
    return res.status(400).json({ error: 'Profile ID is required' });
  }

  const videoUrl = `/uploads/videos/${req.file.filename}`;

  try {
    const query = `UPDATE profile SET video_url = ? WHERE id = ?`;
    await db.query(query, [videoUrl, profileId]);

    res.json({ message: 'Video uploaded and saved successfully', videoUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database update failed' });
  }

});


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

    const queryOrder = `
      INSERT INTO order (user_id) VALUES (?)
    `;

    await db.query(queryOrder, [result.insertId]);

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

// Cateogry
app.get('/api/get_category', async (req, res) => {
  try {
    const query = `
    SELECT c.*, COUNT(p.id) AS product_count FROM category c
    LEFT JOIN product p ON c.id = p.category_id
    GROUP BY c.id`;

    const [categories] = await db.query(query);

    res.json({ message: "Success get category", categories });
  } catch (error) {
    console.log("Error api get category")
  }
})

app.post('/api/add_category', async (req, res) => {
  const { name, description, images } = req.body;

  try {
    const query = 'INSERT INTO category (name, description) values (?, ?)';
    const [category] = await db.query(query, [name, description]);
    const category_id = category.insertId;

    if (images && images.length > 0) {
      const queryImg = 'INSERT INTO category_image (category_id, image_url) VALUES (?, ?)';
      for (let img of images) {
        await db.query(queryImg, [category_id, img]);
      }
    }

    res.json({ message: 'Add category successfully' })
  } catch (error) {
    console.error('Error during add category', error);
    res.status(500).json({ error: "Error during add category" })
  }
})

app.get('/api/get_category_detail/:category', async (req, res) => {
  const { category } = req.params;

  try {
    const query = `
      SELECT 
        c.*,
        GROUP_CONCAT(i.image_url) AS images
      FROM category c
      LEFT JOIN category_image i ON i.category_id = c.id 
      WHERE url = ?
      GROUP BY c.id
    `;
    const [categoryDetail] = await db.query(query, [category]);

    res.json({ categoryDetail });
  } catch (error) {
    console.log("Error fetching category details:", error);
    res.status(500).json({ error: "Failed to fetch category details" });
  }
})

// Product
app.get('/api/get_product_item/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const query = `
    SELECT 
        p.*, 
        c.name AS category_name, 
        GROUP_CONCAT(DISTINCT pg.gender) AS genders, 
        GROUP_CONCAT(DISTINCT ps.size) AS sizes,
        GROUP_CONCAT(DISTINCT pi.image_url) AS images,
        GROUP_CONCAT(DISTINCT f.flavour) AS flavours
    FROM product p
    JOIN category c ON p.category_id = c.id
    LEFT JOIN product_gender pg ON p.id = pg.product_id
    LEFT JOIN product_size ps ON p.id = ps.product_id
    LEFT JOIN product_image pi ON p.id = pi.product_id
    LEFT JOIN product_flavour pf ON p.id = pf.product_id 
    LEFT JOIN flavour f ON pf.flavour_id = f.id
    WHERE p.id = ?
    GROUP BY p.id;

    `;
    const [rows] = await db.query(query, [id]);

    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = rows[0];

    product.sell_price = product.sell_price.toLocaleString('vi-VN') + '₫';
    product.genders = product.genders ? product.genders.split(",") : [];
    product.sizes = product.sizes ? product.sizes.split(",") : [];
    product.images = product.images ? product.images.split(",") : [];

    res.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Failed to fetch product" });
  }
});


app.get('/api/get_product', async (req, res) => {
  try {
    const query = `
        SELECT 
        p.*, 
        c.name AS category_name, 
        GROUP_CONCAT(DISTINCT pg.gender) AS genders, 
        GROUP_CONCAT(DISTINCT ps.size) AS sizes,
        GROUP_CONCAT(DISTINCT pi.image_url) AS images,
        GROUP_CONCAT(DISTINCT f.flavour) AS flavours
    FROM product p
    JOIN category c ON p.category_id = c.id
    LEFT JOIN product_gender pg ON p.id = pg.product_id
    LEFT JOIN product_size ps ON p.id = ps.product_id
    LEFT JOIN product_image pi ON p.id = pi.product_id
    LEFT JOIN product_flavour pf ON p.id = pf.product_id  
    LEFT JOIN flavour f ON pf.flavour_id = f.id  
    GROUP BY p.id;
    `;

    const [products] = await db.query(query);

    products.forEach(p => {
      p.sell_price = p.sell_price.toLocaleString('vi-VN') + '₫';
    });

    res.json({ message: "Get post successfully", products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
})

app.get('/api/get_product_by_category/:categoryId', async (req, res) => {
  const { categoryId } = req.params;

  try {
    const query = `
          SELECT 
              p.*, 
              c.name AS category_name, 
              GROUP_CONCAT(DISTINCT pg.gender) AS genders, 
              GROUP_CONCAT(DISTINCT ps.size) AS sizes,
              GROUP_CONCAT(DISTINCT pi.image_url) AS images,
              GROUP_CONCAT(DISTINCT f.flavour) AS flavours
          FROM product p
          JOIN category c ON p.category_id = c.id
          LEFT JOIN product_gender pg ON p.id = pg.product_id
          LEFT JOIN product_size ps ON p.id = ps.product_id
          LEFT JOIN product_image pi ON p.id = pi.product_id
          LEFT JOIN product_flavour pf ON p.id = pf.product_id  
          LEFT JOIN flavour f ON pf.flavour_id = f.id  
          WHERE p.category_id = ?
          GROUP BY p.id;
      `;

    const [products] = await db.query(query, [categoryId]);

    const formattedProducts = products.map(product => ({
      ...product,
      sell_price: product.sell_price.toLocaleString('vi-VN') + '.000₫',
      genders: product.genders ? product.genders.split(',') : [],
      sizes: product.sizes ? product.sizes.split(',') : [],
      images: product.images,
      flavours: product.flavours ? product.flavours.split(',') : []
    }));


    res.json({ products: formattedProducts });
  } catch (error) {
    console.log("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
})

app.post('/api/add_product', async (req, res) => {
  const { productName, description, sellPrice, costPrice, stock,
    isSizeEnabled, isGenderEnabled, size, gender, category, images } = req.body;

  try {
    const queryProduct = 'INSERT INTO product (name, description, sell_price, cost_price, category_id, stock_quantity) VALUES (?, ?, ?, ?, ?, ?)';
    const [result] = await db.query(queryProduct, [productName, description, sellPrice, costPrice, category, stock]);
    const productId = result.insertId;

    if (images && images.length > 0) {
      const queryImg = 'INSERT INTO product_image (product_id, image_url) VALUES (?, ?)';
      for (let img of images) {
        await db.query(queryImg, [productId, img]);
      }
    }

    if (isGenderEnabled) {
      const queryGender = 'INSERT INTO product_gender (product_id, gender) VALUES (?, ?)';
      for (let g of gender) {
        await db.query(queryGender, [productId, g]);

      }
    }

    if (isSizeEnabled) {
      const querySize = 'INSERT INTO product_size (product_id, size) VALUES (?, ?)';
      for (let s of size) {
        await db.query(querySize, [productId, s]);
      }
    }


    res.json({ message: "Product Added" })
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Failed to add product" });
  }
})

// Review 
app.get('/api/get_reviews/:productId', async (req, res) => {
  const { productId } = req.params;
  try {
    const query =
      `SELECT 
          r.*,
          u.username as username,
          u.avatar as user_avatar
        FROM product_review r
        JOIN user u ON r.user_id = u.userId
        WHERE r.product_id = ?   
      `;

    const [reviews] = await db.query(query, [productId]);
    res.json({ reviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }

})

app.post('/api/add_comment', async (req, res) => {
  const { userId, productId, rating, comment } = req.body;

  try {
    const query = 'INSERT INTO product_review (product_id, user_id, rating, content) VALUES (?, ?, ?, ?);';
    db.query(query, [productId, userId, rating, comment]);

    res.status(200).json({ message: "Add comment success!" });
  } catch (error) {
    console.log("Fail to add comment", error);
  }
})

// Cart
app.post('/api/delete_ordered_product', async (req, res) => {
  const { productId, orderId } = req.body;

  try {
    const query = `DELETE FROM orderdetail WHERE product_id = ? AND order_id = ?`;
    await db.query(query, [productId, orderId]);
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Failed to delete item" });
  }
})

app.post('/api/update_quantity_item', async (req, res) => {
  const { newQuantity, productId, orderId } = req.body;

  try {
    const query = 'UPDATE orderdetail SET quantity = ? WHERE product_id = ? AND order_id = ?';
    await db.query(query, [newQuantity, productId, orderId]);

    res.status(200).json({ success: true, message: "Quantity updated successfully" });
  } catch (error) {
    console.error('Error updating quantity:', error);
    res.status(500).json({ success: false, message: "Server error while updating quantity" });
  }
})

app.get('/api/get_order_quantity/:userId', async (req, res) => {
  const { userId } = req.params;

  try {

    const query = `
      SELECT SUM(od.quantity) AS total_products_orderd
      FROM  \`order\` o
      JOIN orderdetail od ON order_id = o.id
      WHERE o.user_id = ?
    `;

    const [result] = await db.query(query, [userId]);
    res.json({ quantity: result[0].total_products_orderd || 0 });
  } catch (error) {
    console.error("Error fetching order quantity:", error);
    res.status(500).json({ error: "Internal server error" });
  }
})

app.post('/api/get_order_detail', async (req, res) => {
  const { userId } = req.body;

  try {
    const query = `
      SELECT 
        od.*, 
        (od.price * od.quantity) AS total_price_per,
        p.name AS product_name,
        (SELECT pi.image_url FROM product_image AS pi WHERE pi.product_id = p.id LIMIT 1) AS product_image
      FROM \`order\` o
      JOIN orderdetail od ON od.order_id = o.id
      JOIN product p ON p.id = od.product_id
      WHERE o.user_id = ?;
    `;

    const [orderDetails] = await db.query(query, [userId]);
    orderDetails.forEach(od => {
      od.price = od.price.toLocaleString('vi-VN') + '₫';
      od.total_price_per = od.total_price_per.toLocaleString('vi-VN') + '₫';
    });

    const totalPrice = orderDetails.reduce((sum, od) => sum + parseInt(od.total_price_per.replace(/\D/g, ''), 10), 0);

    res.json({
      orderDetails,
      totalPrice: totalPrice.toLocaleString('vi-VN') + ' ₫'
    });
  } catch (error) {
    console.log("error api get order details", error);
  }
})

app.post('/api/add_cart', async (req, res) => {
  const { productId, userId, quantity } = req.body;

  try {
    const [product] = await db.query("SELECT sell_price FROM product WHERE id = ?", [productId]);
    if (!product || product.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    const productPrice = product[0].sell_price;

    const [userOrder] = await db.query("SELECT id FROM `order` WHERE user_id = ? LIMIT 1", [userId]);
    const orderId = userOrder[0].id;

    const [orderDetail] = await db.query("SELECT quantity FROM orderdetail WHERE product_id = ? AND order_id = ?", [productId, orderId]);

    if (orderDetail.length === 0) {
      await db.query("INSERT INTO orderdetail (product_id, order_id, price, quantity) VALUES (?, ?, ?, ?)",
        [productId, orderId, productPrice, quantity]);
    } else {
      await db.query("UPDATE orderdetail SET quantity = quantity + ? WHERE product_id = ? AND order_id = ?",
        [quantity, productId, orderId]);
    }

    res.json({ message: "Cart updated successfully" });

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

app.post('/api/buy_now', async (req, res) => {
  const { productId, userId, quantity } = req.body;

  try {

  } catch (error) {

  }
})

// USER PROFILE
app.post('/api/create_gig_review', async (req, res) => {
  const { userId, gig_id, rating, comment } = req.body;

  try {
    const query = `
      INSERT INTO gig_review (gig_id, user_id, rating, content) VALUES (?, ?, ?, ?);
    `

    await db.query(query, [gig_id, userId, rating, comment])
  } catch (error) {
    console.log("Error add gig review", error);
  }
})

app.get('/api/get_user_gig_detail/:gigId', async (req, res) => {
  const { gigId } = req.params;

  try {
    // Fetch gig details
    const queryGig = `
      SELECT g.*, 
             COALESCE(ROUND(AVG(gr.rating), 1), 0) AS rating,
             COUNT(gr.id) AS numReviews,
             p.id AS profile_id,
             p.level,
             p.about_me,
             p.video_url,
             u.username,
             u.is_personal_trainer,
             u.avatar
      FROM fit_gigs g
      JOIN profile p ON g.profile_id = p.id
      JOIN user u ON p.user_id = u.userId
      LEFT JOIN gig_review gr ON g.id = gr.gig_id
      WHERE g.id = ?
      GROUP BY g.id
    `;

    const [gigRows] = await db.query(queryGig, [gigId]);

    if (gigRows.length === 0) {
      return res.status(404).json({ error: 'Gig not found' });
    }

    const gig = gigRows[0];

    // Fetch expertise related to the profile
    const queryExpertise = `
      SELECT e.id AS expertise_id, e.expertise
      FROM pt_expertise pe
      JOIN expertise e ON pe.expertise_id = e.id
      WHERE pe.profile_id = ?
    `;

    const [expertiseRows] = await db.query(queryExpertise, [gig.profile_id]);

    const profile = {
      id: gig.profile_id,
      level: gig.level,
      about_me: gig.about_me,
      video_url: gig.video_url,
      username: gig.username,
      is_personal_trainer: gig.is_personal_trainer,
      avatar: gig.avatar,
      expertise_list: expertiseRows.map((row) => ({
        id: row.expertise_id,
        expertise: row.expertise,
      })),
    };

    const gigDetail = {
      id: gig.id,
      profile_id: gig.profile_id,
      title: gig.title,
      description: gig.description,
      price: gig.price,
      unit: gig.unit,
      image_url: gig.image_url,
      created_at: gig.created_at,
      update_at: gig.update_at,
      rating: gig.rating,
      numReviews: gig.numReviews,
    };

    res.json({ gig: gigDetail, profile });
  } catch (error) {
    console.error('Error fetching gig detail:', error);
    res.status(500).json({ error: 'Failed to fetch gig detail' });
  }
});

app.get('/api/get_gig_review/:gigId', async (req, res) => {
  const { gigId } = req.params;

  try {
    const query = `
      SELECT 
        gr.*,
        u.username,
        u.avatar,
        u.name_path
      FROM gig_review gr
      JOIN user u ON u.userId = gr.user_id 
      WHERE gig_id = ?
    `;

    const [reviews] = await db.query(query, [gigId]);

    res.json({ reviews });
  } catch (error) {
    console.error('Error fetching gig reviews:', error);
    res.status(500).json({ error: 'Failed to fetch gig reviews' });
  }
})

app.get('/api/get_profile_review/:profileId', async (req, res) => {
  const { profileId } = req.params;

  try {
    const query = `
      SELECT gr.*, u.username, u.avatar, u.name_path
      FROM gig_review gr
      JOIN fit_gigs g ON gr.gig_id = g.id
      JOIN user u ON u.userId = gr.user_id
      WHERE g.profile_id = ?
    `;

    const [reviews] = await db.query(query, [profileId]);

    res.json({ reviews });
  } catch (error) {
    console.error('Error fetching profile reviews:', error);
    res.status(500).json({ error: 'Failed to fetch profile reviews' });
  }
})

app.get('/api/get_user_profile/:name_path', async (req, res) => {
  const { name_path } = req.params;

  try {
    const queryUser = `SELECT userId FROM user WHERE name_path = ?`;
    const [user] = await db.query(queryUser, [name_path]);

    if (user.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    const userId = user[0].userId;

    const queryProfile = `
      SELECT 
        p.*,
       u.username,
    u.is_personal_trainer,
    u.avatar,
    COALESCE(ROUND(AVG(gr.rating), 1), 0) AS rating
  FROM profile p
  JOIN user u ON u.userId = p.user_id
  LEFT JOIN fit_gigs g ON g.profile_id = p.id
  LEFT JOIN gig_review gr ON gr.gig_id = g.id
  WHERE p.user_id = ?
  GROUP BY p.id
`;

    const [profileRows] = await db.query(queryProfile, [userId]);

    if (profileRows.length === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const profile = profileRows[0];

    const queryExpertise = `
      SELECT e.id AS expertise_id, e.expertise
      FROM pt_expertise pe
      JOIN expertise e ON e.id = pe.expertise_id
      WHERE pe.profile_id = ?
    `;

    const [expertiseRows] = await db.query(queryExpertise, [profile.id]);

    profile.expertise_list = expertiseRows.map((row) => ({
      id: row.expertise_id,
      expertise: row.expertise,
    }));


    const queryGig = `
      SELECT g.*, 
        COUNT(gr.id) AS numReviews, 
        COALESCE(ROUND(AVG(gr.rating), 1), 0) AS rating
      FROM fit_gigs g
      LEFT JOIN gig_review gr ON gr.gig_id = g.id
      WHERE g.profile_id = ?
      GROUP BY g.id
    `;

    const [gigs] = await db.query(queryGig, [profile.id]);
    res.json({ profile, gigs });
  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});


app.get('/api/get_my_profile/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const query = `
      SELECT 
        p.*,
        u.username,
        u.is_personal_trainer,
        u.avatar,
        e.id AS expertise_id,
        e.expertise
      FROM profile p
      JOIN user u ON u.userId = p.user_id
      LEFT JOIN pt_expertise pe ON pe.profile_id = p.id
      LEFT JOIN expertise e ON e.id = pe.expertise_id
      WHERE p.user_id = ?
    `;
    const [rows] = await db.query(query, [userId]);

    const profile = {
      id: rows[0].id,
      user_id: rows[0].user_id,
      about_me: rows[0].about_me,
      level: rows[0].level,
      video_url: rows[0].video_url,
      rating: rows[0].rating,
      username: rows[0].username,
      is_personal_trainer: rows[0].is_personal_trainer,
      avatar: rows[0].avatar,
      expertise_list: [],
    };

    rows.forEach((row) => {
      if (row.expertise_id !== null) {
        profile.expertise_list.push({ 'id': row.expertise_id, 'expertise': row.expertise });
      }
    });

    const queryGig = `
      SELECT g.*, 
        COUNT(gr.id) AS numReviews, 
        COALESCE(ROUND(AVG(gr.rating), 1), 0) AS rating
      FROM fit_gigs g
      LEFT JOIN gig_review gr ON gr.gig_id = g.id
      WHERE g.profile_id = ?
      GROUP BY g.id
    `;

    const [gigs] = await db.query(queryGig, [profile.id]);

    res.json({ profile, gigs });

  } catch (error) {
    console.error("Error fetching profile:", error);
    res.status(500).json({ error: "Failed to fetch profile" });
  }
})

// Edit my profile
app.post('/api/edit_about_me', async (req, res) => {
  const { profileId, content } = req.body;

  if (!profileId || !content) {
    return res.status(400).json({ message: "Missing profileId or content." });
  }

  try {
    const query = `
      UPDATE profile
      SET about_me = ?
      WHERE id = ?
    `;

    await db.query(query, [content, profileId]);
    res.json({ message: "Edit content successfully!" });
  } catch (error) {
    console.error("Error updating about_me:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
});

app.get(`/api/get_expertises/:profileId`, async (req, res) => {
  const { profileId } = req.params;

  try {
    if (profileId === 'all') {
      const query = `SELECT * FROM expertise`;
      const [expertise] = await db.query(query);
      return res.json({ expertise });
    } else {
      const query = `
        SELECT e.* 
        FROM expertise e
        WHERE e.id NOT IN (
          SELECT pe.expertise_id FROM pt_expertise pe
          WHERE pe.profile_id = ?
        )
      `;
      const [expertises] = await db.query(query, [profileId]);
      return res.json({ expertises });
    }
  } catch (error) {
    console.error("Error fetching expertises:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post('/api/edit_expertise', async (req, res) => {
  const { expertises, profileId } = req.body;

  try {
    await db.query(`DELETE FROM pt_expertise WHERE profile_id = ?`, [profileId]);

    const query = `INSERT INTO pt_expertise (profile_id, expertise_id) VALUES (?, ?)`;

    for (const exp of expertises) {
      await db.query(query, [profileId, exp.id]);
    }

    res.status(200).json({ message: 'Expertises updated successfully' });
  } catch (error) {
    console.error('Error updating expertises:', error);
    res.status(500).json({ error: 'Failed to update expertises' });
  }
});

app.post('/api/create_gig', upload.single('image'), async (req, res) => {
  const { profile_id, title, description, expertise, packages } = req.body;
  const parsedPackages = packages ? JSON.parse(packages) : [];

  if (!req.file) {
    return res.status(400).json({ error: 'Image is required' });
  }

  const imageUrl = `/uploads/images/${req.file.filename}`;

  try {
    const query = `
      INSERT INTO fit_gigs (profile_id, title, description, expertise_id, image_url)
      VALUES (?, ?, ?, ?, ?)
    `;
    const [result] = await db.query(query, [profile_id, title, description, expertise, imageUrl]);

    const packageQuery = `
      INSERT INTO gig_package (gig_id, title, description, price, duration)
      VALUES (?, ?, ?, ?, ?)
    `;

    for (const pkg of parsedPackages) {
      await db.query(packageQuery, [result.insertId, pkg.title, pkg.description, pkg.price, pkg.duration]);
    }

    res.status(201).json({
      message: 'Gig added successfully',
      gig: {
        id: result.insertId,
        profile_id,
        title,
        description,
        expertise,
        imageUrl,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database insertion failed' });
  }
})
// Package of gig
app.get('/api/get_packages/:gig_id', async (req, res) => {
  const { gig_id } = req.params;

  try {
    const query = `SELECT title, description, price, duration FROM gig_package WHERE gig_id = ?`;
    const [packages] = await db.query(query, [gig_id]);

    res.status(200).json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch packages' });
  }
});

app.get('/api/get_package/:package_id', async (req, res) => {
  const {package_id} = req.params;

  try {
    const query = `
      SELECT * FROM gig_package
      WHERE id = ?
    `

    const [package] = await db.query(query, [package_id]);

    res.json({message: "", package})
  } catch (error) {
    
  }
})

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

module.exports = db;