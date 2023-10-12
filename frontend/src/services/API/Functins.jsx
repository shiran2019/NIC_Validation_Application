import axios from "axios";

const Submit = (data) => {
  axios
    .post("http://localhost:3001/User/userReg", data)
    .then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Registration Successful");
        window.location = "/";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

const GetAllUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3001/User/all");
    if (response.data.error) {
      alert(response.data.error);
      return null; // Handle error case appropriately
    } else {
      return response.data; // Return the array if successful
    }
  } catch (error) {
    console.log(error);
    return null; // Handle error case appropriately
  }
};

const UpdUser = (params) => {
  console.log(params);
  axios
    .put(`http://localhost:3001/User/upd/${params.UserId}`, params)
    .then((response) => {
      return;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
};

const UserData = async (params) => {
  try {
    const response = await axios.get("http://localhost:3001/User/userData");
    if (response.data.error) {
      alert(response.data.error);
      return null;
    } else {
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const UserById = async (UserId) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/User/user/${UserId}`
    );
    if (response.data.error) {
      alert(response.data.error);
      return null;
    } else {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const GetMobileNo = async (userName) => {
  try {
    const response = await axios.get(
      `http://localhost:3001/User/userOtp/${userName}`
    );
    if (response.data.error) {
      return null;
    } else {
      console.log(response.data);
      return response.data;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
};

const UpdUserPwd = (params) => {
console.log(params);
  const data = {Password: params.ConfirmPassword };
  console.log(data);
 
  axios
    .put(`http://localhost:3001/User/updPass/${params.UserName}`, data)
    .then((response) => {
      window.location = "/";
      return;
    })
    .catch((error) => {
      console.error("An error occurred:", error);
    });
};

const checkUserPw = async (user , pw ) => {
  const data = { userName: user, password: pw };
    try {
      const response = await axios.post("http://localhost:3001/User/checkUser",data);
      if (response.data.error) {
        alert(response.data.error);
        return null;
      } else {
        return response.data;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
};

export {
  Submit,
  GetAllUsers,
  UpdUser,
  UserData,
  UserById,
  GetMobileNo,
  UpdUserPwd,
  checkUserPw
};
