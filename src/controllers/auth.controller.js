import { pool } from '../database'
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const refreshTokens = [];
const secret = "exam2-secret-access-token";
const refreshTokenSecret = "exam2-secret-refresh-access-token";
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const response = await pool.query('SELECT * FROM usuarios u join usuarios_roles ur on u.idusuario = ur.idusuario join roles r on ur.idrol = r.idrol where username = $1', [username]);
        if (response.rows.length != 0) {
            const passold = response.rows[0].password;
            if (await bcrypt.compare(password, passold)) {
                const usuario = {
                    idusuario: response.rows[0].idusuario,
                    username: response.rows[0].username,
                    rol: response.rows[0].nombre
                }
                const accessToken = jwt.sign({ usuario }, secret, { expiresIn: '7200s' });
                const refreshToken = jwt.sign({ usuario }, refreshTokenSecret);
                refreshTokens.push(refreshToken);
                return res.status(200).json({
                    accessToken,
                    refreshToken
                });
            } else {
                return res.status(403).json({
                    message: 'Datos incorrectos...!'
                });
            }
        }
        return res.status(403).json({
            message: 'Datos incorrectos...!'
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({ message: 'Error al validar usuario...!' });
    }
};
export const token = async (req, res) => {
    try {
        const { token } = req.body;
        if (!token) {
            return res.sendStatus(401);
        }
        if (!refreshTokens.includes(token)) {
            return res.sendStatus(403);
        }
        jwt.verify(token, refreshTokenSecret, (err) => {
            if (err) {
                return res.sendStatus(403);
            }
        });
    } catch (e) {
        console.log(e);

    }
};