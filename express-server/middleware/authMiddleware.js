import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]

    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) { return res.status(401).json({ message: 'Invalid token.' }); }
            req.userId = decoded.id; // Attach userId to request object
            next();
        })
        // req.user = decoded
        // next()
    } catch (error) {
        res.status(401).json({ message: "Invalid Token!" });
    }
}
