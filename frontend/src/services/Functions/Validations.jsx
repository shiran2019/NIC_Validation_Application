

let network ;
let year ;
let days;
let age ;
let gender;

//Full Name validator
const FnameVal = (value) => {
  let error;
  if (!value) {
    error = "Name field is required";
  } else if (!/^[a-zA-Z\s]+$/.test(value)) {
    error = "Only letters are allowed";
  }
  return error;
};

//Address validator
const AddressVal = (value) => {
  document.getElementById("num_btn").innerHTML = "Network Provider";
  document.getElementById("num_btn").style.backgroundColor = "#e7cefe";
  let error;
  if (!value) {
    error = "Address field is required";
  }
  return error;
};

//Mobile number validator
const MobileNoVal = (value) => {

  let error;

  if (!value) {
    error = "Mobile number is required";
    network = "";
  } else if (!/^[0-9]{10}$/.test(value)) {
    error = "Invalid mobile number";
    network = "";
  } else if (!/^07/.test(value)) {
    error = "Mobile number must be a Sri Lankan number";
    network = "";
  } else {
    const thirdDigit = value[2];
    document.getElementById("num_btn").style.backgroundColor = "#cefeec";
    switch (thirdDigit) {
      
      case "0":
      case "1":
        network = "Network provider : MOBITEL";
        document.getElementById("num_btn").innerHTML = "MOBITEL";
        break;
      case "2":
      case "8":
        network = "Network provider : HUTCH";
        document.getElementById("num_btn").innerHTML = "HUTCH";
        break;
      case "3":
      case "4":
      case "6":
      case "7":
        network = "Network provider : DIALOG";
        document.getElementById("num_btn").innerHTML = "DIALOG";
        break;
      case "5":
        network = "Network provider : AIRTEL";
        document.getElementById("num_btn").innerHTML = "AIRTEL";
        break;
      default:
        network = "Network provider : UNKNOWN";
        document.getElementById("num_btn").innerHTML = "UNKNOWN";
        break;
    }
  }

  return error;
};

const NetworkProvider = () => {
  return network;
};

//NIC validator
const NICval = (value) => {
  document.getElementById("bday-button").innerHTML = "Birthday";
  document.getElementById("age-button").innerHTML = "Age";
  document.getElementById("gender-button").innerHTML = "Gender";
  let error;

  if (!value) {
    error = "Parent NIC is required";
  } else if (!/^\d{9}([vV]|\d{3})$/.test(value)) {
    error = "Invalid NIC format";
  } else {
    if (value.length === 12) {
      const firstFourDigits = parseInt(value.substr(0, 4), 10);
      const currentYear = new Date().getFullYear();

      if (currentYear - 16 < firstFourDigits) {
        error = "Invalid NIC: Year of birth is too recent";
      } else {
        year = firstFourDigits;
        age = currentYear - year;
        document.getElementById("age-button").innerHTML = age;
        console.log(year);
        const middleDigits = parseInt(value.substr(4, 3), 10);
        console.log(middleDigits);

        if (
          (middleDigits > 366 && middleDigits < 500) ||
          middleDigits > 866 ||
          middleDigits <= 0
        ) {
          error = "Invalid NIC: Day part is out of range";
        } else {
          if (middleDigits > 500) {
            days = middleDigits - 500;
            gender = "Female"
            document.getElementById("gender-button").innerHTML = gender;
            
            Dob();
          } else {
            days = middleDigits;
            gender = "Male"
            document.getElementById("gender-button").innerHTML = gender;
          
            Dob();
          }
        }
      }
    } else {
      year = parseInt(value.substr(0, 2), 10) + 1900;
      age = new Date().getFullYear() - year;
      document.getElementById("age-button").innerHTML = age;
      
      const middleDigits = parseInt(value.substr(2, 3), 10);
      console.log(middleDigits);

      if (
        (middleDigits > 366 && middleDigits < 500) ||
        middleDigits > 866 ||
        middleDigits <= 0
      ) {
        error = "Invalid NIC: Day part is out of range";
      } else {
        if (middleDigits > 500) {
            days = middleDigits - 500;
            gender = "Female"
            document.getElementById("gender-button").innerHTML = gender;
            Dob();
          } else {
            days = middleDigits;
            gender = "Male"
            document.getElementById("gender-button").innerHTML = gender;
            Dob();
          }
      }
    }
  }
  return error;
};

//Checkbox
const CheckboxVal = (value) => {
  let error;
  if (!value === true) {
    error = "Required for Submition";
  }
  return error;

};

const Dob = () => {
  const januaryFirst = new Date(new Date().getFullYear(), 0, 1); // January is month 0
  const targetDate = new Date(januaryFirst);
  targetDate.setDate(januaryFirst.getDate() + days - 2);

  const month = (targetDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = targetDate.getDate().toString().padStart(2, "0");
  let dob = year + "-" + month + "-" + day;
  document.getElementById("bday-button").innerHTML = dob;
  return dob;
};

//return Age
const Age = () => {
    return age;
}


//return Gender
const Gender = () => {
    return gender;
}

const PasswordVal = (value1 , value2) => {
  let error;
  if (!value1) {
    error = "Password is required";
  } else if (!value2) {
    error = "Confirm password is required";
  } else if (value1 !== value2) {
    error = "Passwords do not match";
  }
  return error;
};

const UsernameVal = (value) => {
  let error;
  if (!value) {
    error = " User name is required";
  }
  return error;
};

const StatusVal = (value) => {
  let error;
  if (!value) {
    error = "Status is required";
  }
  return error;
};

const RoleVal = (value) => {
  let error;
  if (!value) {
    error = "Role is required";
  }
  return error;
};


export {
  FnameVal,
  AddressVal,
  MobileNoVal,
  NetworkProvider,
  NICval,
  CheckboxVal,
  Dob,
  Age,
  Gender,
  PasswordVal,
  UsernameVal,
  StatusVal,
  RoleVal,
};
