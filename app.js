const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Initialize express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Middleware and routes
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);

//Task routes
const taskRoutes = require('./routes/tasks');
app.use('/tasks', taskRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
	.then(() => console.log('MongoDB connected'))
	.catch(err => console.log(err));

// Basic route
app.get('/', (req, res) => {
  res.send('Hello, this is your Task Manager API!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

