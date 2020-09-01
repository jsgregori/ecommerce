
function userMiddleware(req, res, next){

    console.log(`USER MIDDLEWARE ------------------------------------`);
    if(req.session.user != undefined){

        // if(req.session.category == 'admin'){
        //     next();
        // } else {
        //     res.render('login', {
		// 		error: 'Ingrese como administrador',
		// 		user: req.session.user
		// 	});
        // }
        console.log('NO HAY SESIÓN INICIADA');
        console.log(`EL USUARIO ES: ${req.session.user}`);
        next();
    } else {
        console.log('DEBE INICIAR SESIÓN');
        // res.json({
        //     status: 'como salmónx'
        // })
        res.redirect('/users/login/');
    }
}

module.exports = userMiddleware;