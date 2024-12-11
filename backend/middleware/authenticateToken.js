const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    // check if jwt token is provided
    if (!token) {
        console.error('No token provided in authorization header');
        return res.status(401).json({ message: 'Access denied. No authentication token provided' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach the decoded token to the req.user
        req.user = decoded;
        
        next();

    } catch (error) {

        // token verification failed
        console.error('Invalid token: ', error.message);
        res.status(403).json({ message: 'Invalid token' });

    }
};

module.exports = authenticateToken;