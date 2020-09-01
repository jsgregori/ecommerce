const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

function loginMiddleware(req, res, next){
    if(req.cookies.user != undefined){
        req.session.user = req.cookies.user;
        
        const email = req.session.user;
        user = users.find(user => user.email == email);             //debería buscar en la base de datos
        req.session.category = user.category;
    }
    next();
}

module.exports = loginMiddleware;