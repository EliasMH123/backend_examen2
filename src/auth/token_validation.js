const jwt = require('jsonwebtoken');
const secret = "exam2-secret-access-token";
const refreshTokenSecret = "exam2-secret-refresh-access-token";

module.exports = {
    checkToken: (req, res, next) => {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            const bearerToken = bearerHeader.split(" ")[1];
            const token = bearerToken;

            jwt.verify(token, secret, (err) => {
                if (err) {
                    res.status(403).json({
                        success: 0,
                        message: "Token Inválido"
                    });
                } else {
                    next();
                }
            });
        } else {
            res.status(403).json({
                success: 0,
                message: "Acceso Prohibido"
            });
        }
    }
}