const { response } = require("express");
const db = require('../database/models');



const productController = {
    root: (req, res) => {
        res.render('carrito', {
            user: req.session.user,
            title: 'Express'
        });
    },

    pay: (req, res) => {

        var date = new Date();
        var id = req.session.user_id;

        const newOrder = {
            date: date,
            id_user: id,
            address: req.body.shipping
        };

        async function loadOrder() {
            var order = await db.Orden.create(newOrder);

            for (i = 0; i < req.body.cart.length; i++) {
                const newCompra = {
                    id_orden: order.dataValues.id,
                    id_product: req.body.cart[i].id,
                    total: req.body.cart[i].total
                }

                await db.Compra.create(newCompra);
            }

            // res.json({
            //     status: 201
            // })

        }
        

        loadOrder().then(
            res.json({
                status: 201
            })
        ).catch(e => {
            console.log(e.message);
            // console.log(e);
            res.json({
                status: 500,
                message: e.message
            })
        });
    }
}

module.exports = productController;
