module.exports = (sequelize, DataTypes) => {

    const Product = sequelize.define("ads", {
        video: {
            type: DataTypes.STRING,
            allowNull: false
        },
        images: {
            type: DataTypes.TEXT, 
            allowNull: false
        }

    }, {
        timestamps: true
    })

    return Product

}
