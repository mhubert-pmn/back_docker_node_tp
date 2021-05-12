const jwt = require('jsonwebtoken');
const jwt_decode = require("jwt-decode")
const jwtKey = process.env.JWT_KEY;

exports.verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            console.log(payload)
            if (error) {
                res.status(403);
                res.json({
                    message: 'Accès interdit : token invalide.'
                });
            } else {
                next();
            }
        })

    } else {
        res.status(403);
        res.json({
            message: 'Accès interdit : token manquant.'
        });
    }
}

exports.verifyTokenAdmin = (req, res, next) => {
    let token = req.headers['authorization'];

    if (token !== undefined) {
        jwt.verify(token, jwtKey, (error, payload) => {
            console.log(payload)
            if (error) {
                res.status(403);
                res.json({
                    message: 'Accès interdit : token invalide.'
                });
            } else {
                let decoded = jwt_decode(token)
                if (decoded.user.admin === true) {  
                    next();
                }
                else {
                    console.log("erreur : user n'est pas admin")
                }
            }
        })

    } else {
        res.status(403);
        res.json({
            message: 'Accès interdit : token manquant.'
        });
    }
}