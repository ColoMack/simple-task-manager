const express = require('express');
const cors = require("cors");
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authenticateToken = require("./middleware/authenticateToken");

const User = require('./models/user');
const Task = require('./models/task');

dotenv.config();

const app = express();

// a specific port which is 3000 (frontend)
const corsOptions = {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // for cookies
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));

app.use(express.json());

// routes for authentication and tasks
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', authenticateToken, require('./routes/taskRoutes'));

//sync the database
sequelize.sync({ force: false }) //avoid overwritting data
 .then(() => console.log('Database Synced'))
 .catch(err => console.error('Error syncing database:', err));

//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// basic error handling
app.use((err, req, res, next) => {
    console.error('Unhandled Error:', err.stack);

    res.status(err.status || 500).json({
        message:err.message || 'Internal Server Error',
    });
});