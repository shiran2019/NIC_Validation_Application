module.exports = (sequelize, DataTypes) => {
    const Login = sequelize.define("Login", {

      UserName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Role: {
        type: DataTypes.STRING,
        allowNull: false,
      }, 
      

    });

    Login.associate = (models) => {
      Login.belongsTo(models.User, {
        foreignKey: {
          name: "UserId",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    };
  
  
    return Login;
  };
  