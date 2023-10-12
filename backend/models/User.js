module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {

      UserId : {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      FullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Address: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      NIC: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      MobileNo: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      Status: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 

    });
    return User;
  };
 
  