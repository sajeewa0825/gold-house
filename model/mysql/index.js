const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        operatorsAliases: false,
    }
)

sequelize.authenticate()
.then(() => {
    console.log('MySql connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.products = require('./productModel.js')(sequelize, DataTypes)
db.user = require('./userModel.js')(sequelize, DataTypes)
db.wishlist = require('./wishlistModel.js')(sequelize, DataTypes);

// Define relationships
db.user.hasMany(db.wishlist, { foreignKey: 'userId' });
db.wishlist.belongsTo(db.user, { foreignKey: 'userId' });

db.products.hasMany(db.wishlist, { foreignKey: 'productId' });
db.wishlist.belongsTo(db.products, { foreignKey: 'productId' });

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})








module.exports = db