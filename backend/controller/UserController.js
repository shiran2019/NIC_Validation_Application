const { Login } = require("../models");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
const { json } = require("sequelize");
const { User } = require("../models");

const currentYear = new Date().getFullYear();

module.exports = {
  //for development purposes
  addUser: async (req, res) => {
    const { Password, Role, UserName } = req.body;
    bcrypt.hash(Password, 10).then((hash) => {
      Login.create({
        UserName: UserName,
        Password: hash,
        Role: Role,
        UserId: 1,
      });
    });
    res.json("Done");
  },

  loginUser: async (req, res) => {
    const { password, userName } = req.body;

    if (userName || password) {
      const existingUser = await Login.findOne({
        where: { UserName: userName },
      });

      const checkStatus = await User.findOne({
        where: { Status: "Active" },
      });

      if (!existingUser || !checkStatus) {
        res.json({ error: "Wrong Username and Password Combination" });
      } else {
        bcrypt.compare(password, existingUser.Password).then((match) => {
          if (!match) {
            res.json({ error: "Wrong Username and Password Combination" });
          } else {
            const accessToken = sign(
              {
                user: existingUser.UserName,
                role: existingUser.Role,
                userId: existingUser.UserId,
              },
              "sec"
            );
            res.json(accessToken);
          }
        });
      }
    } else {
      res.json({ error: "Enter both User Name and Password" });
    }
  },

  authUser: async (req, res) => {
    res.json(req.user);
  },

  regUser: async (req, res) => {
    const { FullName, Address, NIC, MobileNo, UserName, Password, Role } =
      req.body;

    if (!FullName || !Address || !NIC || !MobileNo || !UserName || !Password) {
      return res.json({ error: "All required fields must be provided" });
    }

    // Validate FullName (contains only letters)
    const fullNameRegex = /^[A-Za-z\s]+$/;
    if (!fullNameRegex.test(FullName)) {
      return res.json({ error: "FullName must contain only letters" });
    }

    // Validate MobileNo length (must be 10)
    if (MobileNo.length !== 10) {
      return res.json({ error: "MobileNo must be 10 digits long" });
    }

    // Validate NIC (10 or 12 characters with specific structure)
    const nicRegex = /^(?:\d{9}[Vv]|[12]\d{11})$/;
    if (!nicRegex.test(NIC)) {
      return res.json({
        error: "NIC must be 10 or 12 characters with a specific structure",
      });
    }

    const user = {
      FullName: FullName,
      Address: Address,
      NIC: NIC,
      MobileNo: MobileNo,
      Status: "Active",
    };

    const existingNIC = await User.findOne({ where: { NIC: NIC } });
    const existingUser = await Login.findOne({ where: { UserName: UserName } });

    if (existingNIC) {
      return res.json({ error: "This NIC is already registered" });
    } else {
      if (existingUser) {
        return res.json({ error: "This UserName is already registered" });
      } else {
        await User.create(user);

        const existingUser = await User.findOne({
          where: { NIC: NIC },
          attributes: ["UserId"],
        });

        bcrypt.hash(Password, 10).then((hash) => {
          Login.create({
            UserName: UserName,
            Password: hash,
            Role: "NormalUser",
            UserId: existingUser.UserId,
          });
        });
        return res.json("Done");
      }
    }
  },

  getAllUsers: async (req, res) => {
    const listOfUsers = await Login.findAll({
      include: {
        model: User,
        attributes: [
          "UserId",
          "FullName",
          "Address",
          "NIC",
          "MobileNo",
          "Status",
        ],
      },
    });

    // const userRole = await Login.findOne({
    //   where: { UserId: req.user.UserId },
    //   attributes: ["Role"],
    // });

    const formattedList = listOfUsers.map((user) => ({
      UserId: user.User.UserId,
      FullName: user.User.FullName,
      Address: user.User.Address,
      NIC: user.User.NIC,
      MobileNo: user.User.MobileNo,
      Status: user.User.Status,
      Role: user.Role,
    }));
    res.json(formattedList);
  },

  GetData: async (req, res) => {
    try {
      const listOfUsers = await User.findAll();

      const userCount = listOfUsers.length;

      const activeUserCount = listOfUsers.filter(
        (user) => user.Status === "Active"
      ).length;

      let dialog = 0;
      let mobitel = 0;
      let airtel = 0;
      let hutch = 0;

      let dialogMale = 0;
      let dialogFemale = 0;
      let mobitelMale = 0;
      let mobitelFemale = 0;
      let airtelMale = 0;
      let airtelFemale = 0;
      let hutchMale = 0;
      let hutchFemale = 0;

      let level1Male = 0;
      let level2Male = 0;
      let level3Male = 0;

      let level1Female = 0;
      let level2Female = 0;
      let level3Female = 0;

      let year = 0;

      listOfUsers.forEach((user) => {
        if (user.NIC && user.NIC.length == 10) {
          if (366 > parseInt(user.NIC.substring(2, 5))) {
            year = currentYear - parseInt(user.NIC.substring(0, 2)) - 1900;
            if (year > 18 && year < 30) {
              level1Male++;
            } else if (year > 29 && year < 50) {
              level2Male++;
            } else if (year > 50) {
              level3Male++;
            }
          } else {
            year = currentYear - parseInt(user.NIC.substring(0, 2)) - 1900;
            if (year > 18 && year < 30) {
              level1Female++;
            } else if (year > 29 && year < 50) {
              level2Female++;
            } else if (year > 50) {
              level3Female++;
            }
          }
        } else if (user.NIC && user.NIC.length == 12) {
          if (366 > parseInt(user.NIC.substring(5, 8))) {
            year = currentYear - parseInt(user.NIC.substring(0, 4)) ;
            if (year > 18 && year < 30) {
              level1Male++;
            } else if (year > 29 && year < 50) {
              level2Male++;
            } else if (year > 50) {
              level3Male++;
            }
          } else {
            year = currentYear - parseInt(user.NIC.substring(0, 4)) ;
            if (year > 18 && year < 30) {
              level1Female++;
            } else if (year > 29 && year < 50) {
              level2Female++;
            } else if (year > 50) {
              level3Female++;
            }
          }
        }
        

        if (user.MobileNo && user.MobileNo.startsWith("077")) {
          if (user.NIC && user.NIC.length == 10) {
            if (366 > parseInt(user.NIC.substring(2, 5))) {
              dialogMale++;
            } else {
              dialogFemale++;
            }
          } else if (user.NIC && user.NIC.length == 12) {
            if (366 > parseInt(user.NIC.substring(5, 8))) {
              dialogMale++;
            } else {
              dialogFemale++;
            }
          }
        } else if (user.MobileNo && user.MobileNo.startsWith("076")) {
          if (user.NIC && user.NIC.length == 10) {
            if (366 > parseInt(user.NIC.substring(2, 5))) {
              dialogMale++;
            } else {
              dialogFemale++;
            }
          } else if (user.NIC && user.NIC.length == 12) {
            if (366 > parseInt(user.NIC.substring(5, 8))) {
              dialogMale++;
            } else {
              dialogFemale++;
            }
          }
        } else if (user.MobileNo && user.MobileNo.startsWith("073")) {
          if (user.NIC && user.NIC.length == 10) {
            if (366 > parseInt(user.NIC.substring(2, 5))) {
              dialogMale++;
            } else {
              dialogFemale++;
            }
          } else if (user.NIC && user.NIC.length == 12) {
            if (366 > parseInt(user.NIC.substring(5, 8))) {
              dialogMale++;
            } else {
              dialogFemale++;
            }
          }
        } else if (user.MobileNo && user.MobileNo.startsWith("074")) {
          if (user.NIC && user.NIC.length == 10) {
            if (366 > parseInt(user.NIC.substring(2, 5))) {
              dialogMale++;
            } else {
              dialogFemale++;
            }
          } else if (user.NIC && user.NIC.length == 12) {
            if (366 > parseInt(user.NIC.substring(5, 8))) {
              dialogMale++;
            } else {
              dialogFemale++;
            }
          }
        } else if (user.MobileNo && user.MobileNo.startsWith("070")) {
          if (user.NIC && user.NIC.length == 10) {
            if (366 > parseInt(user.NIC.substring(2, 5))) {
              mobitelMale++;
            } else {
              mobitelFemale++;
            }
          } else if (user.NIC && user.NIC.length == 12) {
            if (366 > parseInt(user.NIC.substring(5, 8))) {
              mobitelMale++;
            } else {
              mobitelFemale++;
            }
          }
        } else if (user.MobileNo && user.MobileNo.startsWith("071")) {
          if (user.NIC && user.NIC.length == 10) {
            if (366 > parseInt(user.NIC.substring(2, 5))) {
              mobitelMale++;
            } else {
              mobitelFemale++;
            }
          } else if (user.NIC && user.NIC.length == 12) {
            if (366 > parseInt(user.NIC.substring(5, 8))) {
              mobitelMale++;
            } else {
              mobitelFemale++;
            }
          }
        } else if (user.MobileNo && user.MobileNo.startsWith("072")) {
          if (user.NIC && user.NIC.length == 10) {
            if (366 > parseInt(user.NIC.substring(2, 5))) {
              hutchMale++;
            } else {
              hutchFemale++;
            }
          } else if (user.NIC && user.NIC.length == 12) {
            if (366 > parseInt(user.NIC.substring(5, 8))) {
              hutchMale++;
            } else {
              hutchFemale++;
            }
          }
        } else if (user.MobileNo && user.MobileNo.startsWith("078")) {
          if (user.NIC && user.NIC.length == 10) {
            if (366 > parseInt(user.NIC.substring(2, 5))) {
              hutchMale++;
            } else {
              hutchFemale++;
            }
          } else if (user.NIC && user.NIC.length == 12) {
            if (366 > parseInt(user.NIC.substring(5, 8))) {
              hutchMale++;
            } else {
              hutchFemale++;
            }
          }
        } else if (user.MobileNo && user.MobileNo.startsWith("075")) {
          if (user.NIC && user.NIC.length == 10) {
            if (366 > parseInt(user.NIC.substring(2, 5))) {
              airtelMale++;
            } else {
              airtelFemale++;
            }
          } else if (user.NIC && user.NIC.length == 12) {
            if (366 > parseInt(user.NIC.substring(5, 8))) {
              airtelMale++;
            } else {
              airtelFemale++;
            }
          }
        }
      });

      let male = dialogMale + mobitelMale + airtelMale + hutchMale;
      let female = dialogFemale + mobitelFemale + airtelFemale + hutchFemale;

      res.json({
        userCount,
        activeUserCount,
        dialogCount: dialog,
        mobitelCount: mobitel,
        airtelCount: airtel,
        hutchCount: hutch,
        maleCount: male,
        femaleCount: female,

        dialogMaleCount: dialogMale,
        dialogFemaleCount: dialogFemale,

        mobitelMaleCount: mobitelMale,
        mobitelFemaleCount: mobitelFemale,

        airtelMaleCount: airtelMale,
        airtelFemaleCount: airtelFemale,

        hutchMaleCount: hutchMale,
        hutchFemaleCount: hutchFemale,

        level1MaleCount: level1Male,
        level2MaleCount: level2Male,
        level3MaleCount: level3Male,

        level1FemaleCount: level1Female,
        level2FemaleCount: level2Female,
        level3FemaleCount: level3Female,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "An error occurred while fetching data" });
    }
  },

  UpdateData: async (req, res) => {
    const userId = req.params.UserId;
    const updatedData = req.body;
    console.log(updatedData);

    if (!userId) {
      return res.json({ error: "All required fields must be provided" });
    }

    // Validate FullName (contains only letters)
    if (updatedData.FullName) {
      const fullNameRegex = /^[A-Za-z\s]+$/;
      if (!fullNameRegex.test(updatedData.FullName)) {
        return res.json({ error: "FullName must contain only letters" });
      }
    }

    // Validate MobileNo length (must be 10)
    if (updatedData.MobileNo) {
      if (updatedData.MobileNo.length !== 10) {
        return res.json({ error: "MobileNo must be 10 digits long" });
      }
    }
    // Validate NIC (10 or 12 characters with specific structure)
    if (updatedData.NIC) {
      const nicRegex = /^(?:\d{9}[Vv]|[12]\d{11})$/;
      if (!nicRegex.test(updatedData.NIC)) {
        return res.json({
          error: "NIC must be 10 or 12 characters with a specific structure",
        });
      }
    }

    if (updatedData.Role) {
      if (updatedData.Role !== "Admin" && updatedData.Role !== "NormalUser") {
        return res.json({ error: "Role must be Admin or NormalUser" });
      }
    }

    try {
      const user = await User.findByPk(userId);
      const userRole = await Login.findOne({
        where: { UserId: userId },
        attributes: ["Role", "id"],
      });

      const userRoleId = userRole.id;
      console.log(userRoleId);

      const userole = await Login.findByPk(userRoleId);

      if (!user) {
        return res.status(404).json({ error: "user not found" });
      }

      await user.update(updatedData);
      await userole.update(updatedData);

      res.json({ message: "updated successfully" });
      console.log(updatedData);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUser: async (req, res) => {
    const userId = req.params.UserId;
    try {
      const user = await User.findOne({
        where: { UserId: userId },
        attributes: ["UserId", "FullName", "Address", "NIC", "MobileNo"],
      });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  getUserByName: async (req, res) => {
    const userName = req.params.UserName;
    try {
      const user = await Login.findOne({
        where: { UserName: userName },
        attributes: ["UserId"],
      });

      if (user) {
        const userMob = await User.findOne({
          where: { UserId: user.UserId },
          attributes: ["MobileNo"],
        });

        if (userMob) {
          mobileNo = userMob.MobileNo.slice(1);

          // Add '+94' in front of the mobile number
          mobileNo = "+94" + mobileNo;

          // send the updated mobile number to the user
          res.json({ mobileNo });
        }
      } else {
        res.json({ error: "User not found" });
      }
    } catch (error) {
      console.error(error);
      res.json({ error: "User not found" });
    }
  },

  UpdatePassword: async (req, res) => {
    const userName = req.params.UserName;
    const updatedData = req.body;

    if (!updatedData.Password || !userName) {
      return res.json({ error: "All required fields must be provided" });
    }

    try {
      const user = await Login.findOne({
        where: { UserName: userName },
        attributes: ["id"],
      });

      const userid = await Login.findByPk(user.id);

      if (!userid) {
        return res.status(404).json({ error: "Student not found" });
      }
      await bcrypt.hash(updatedData.Password, 10).then((hash) => {
        userid.update({
          Password: hash,
        });
      });
      res.json({ message: "updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  checkUser: async (req, res) => {
    const { password, userName } = req.body;

    if (userName || password) {
      const existingUser = await Login.findOne({
        where: { UserName: userName },
      });

      const checkStatus = await User.findOne({
        where: { Status: "Active" },
      });

      if (!existingUser || !checkStatus) {
        res.json({ error: "Wrong Password" });
      } else {
        bcrypt.compare(password, existingUser.Password).then((match) => {
          if (!match) {
            res.json({ error: "Wrong Password" });
          } else {
            res.json({ userName: existingUser.UserName });
          }
        });
      }
    } else {
      res.json({ error: "Enter Password" });
    }
  },
};
