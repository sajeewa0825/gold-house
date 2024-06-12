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

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})








module.exports = db