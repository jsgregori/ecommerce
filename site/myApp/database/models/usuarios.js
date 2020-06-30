module.exports= (sequelize, dataType) => {
    const cols = {
        id: {
            type: dataType.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        first_name: { 
             type: dataType.STRING,
             allowNull: false
         },
        last_name: { 
            type: dataType.STRING,
            allowNull: false
        },
        email: {
            type: dataType.STRING,
            allowNull: false
        },
        password: { 
            type: dataType.STRING,
            allowNull: false
        },
        category: { 
            type: dataType.STRING,
            allowNull: false
        },
        image: {
            type: dataType.STRING,
            allowNull: false
         }
     };
 
     const config = {
         tablename: 'usuarios',
         timestamps: false,
     }
 
     return sequelize.define('Usuarios', cols, config);
 } 