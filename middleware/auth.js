const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
    const authHeader = req.header('Authorization');
    const token = authHeader ? authHeader.split(' ')[1] : null;
    if (!token) return res.status(401).json({ message: 'Acceso denegado,token no proporcionado' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token no válido' });
    }
}
module.exports = authenticateToken;