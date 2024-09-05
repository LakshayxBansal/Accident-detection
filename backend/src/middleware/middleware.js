import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;

// Middleware to authenticate JWT tokens
export const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.status(401).json({
        error: "Token unavailable"
    });

    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(403).json({
            error : "Error during jwt verification"
        });
        req.user = user;
        next();
    });
};

