import React, { useState } from "react";
import { authentification } from "../../services/Firebase/Firebase";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import "../../styles/OtpVerification.css";
import { GetMobileNo } from "../../services/API/Functins";
import ChangePassword from "../../components/ChangePassword";

function OtpVerification() {
  const [uname, setUname] = useState();
  const [otp, setOtp] = useState("");
  const [expandForm, setExpandForm] = useState(false);
  const [expandForm2, setExpandForm2] = useState(true);
  const [mob, setMob] = useState("");

  const [show, setShow] = useState(false);

  const FetchMobileData = async (Uname) => {
    try {
      const mobile = await GetMobileNo(Uname);
      if (mobile) {
        console.log(mobile.mobileNo);
        setMob(mobile.mobileNo);
        return;
      }else {setMob("")}
    } catch (error) {
      console.error(error);
      setMob("")
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "mobile") {
      FetchMobileData(value);
      setUname(value);
    } else if (name === "otp") {
      setOtp(value);
    }
  };

  const GenerateRecaptcha = () => {

    window.recaptchaVerifier = new RecaptchaVerifier(
      authentification,
      "sign-in-button",
      {
        size: "invisible",
        callback: function (response) {},
      },
      authentification
    );
  };

  const onSignInSubmit =  (e) => {
    
    e.preventDefault();
    if (mob) {
      alert("Click on OK to get OTP");
     
      
      GenerateRecaptcha()
      
      let appVerifier = window.recaptchaVerifier;

     
      

      signInWithPhoneNumber(authentification, mob, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setExpandForm2(false);
          setExpandForm(true);
        })
        .catch((error) => {
          console.log(error);
        });
    
    }
    else{alert("User Name Not Found")}
  };

  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = otp;
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        const user = result.user;
        console.log(JSON.stringify(user));
        setExpandForm(false);
        setShow(true);
        
      })
      .catch((error) => {
        alert("Invalid OTP");
      });
  };

  const SetShow = (x) => {
    setShow(x);
  };

  const Back = () => {
    window.location = "/";
  }

  return (
    <div className="otp-div">
      {expandForm2 && (
        <>
          <form onSubmit={onSignInSubmit} className="otp-form">
            <div id="sign-in-button"></div>
            <input
              name="mobile"
              placeholder="User Name"
              className="form-control"
              required
              onChange={handleChange}
            />
            <button type="submit" className="otp-send-btn">
              Send OTP
            </button>
            <p>Enter your User Name and click "Send OTP" button . </p>
          </form>
        </>
      )}
      {expandForm && (
        <>
          <h2 className="otp-text">Enter OTP</h2>
          <form onSubmit={onSubmitOTP} className="otp-form">
            <input
              type="number"
              className="form-control"
              name="otp"
              placeholder="OTP Number"
              required
              onChange={handleChange}
            />
            <button type="submit" className="otp-verify-btn">
              Verify
            </button>

          </form>
         
        </>
      )}

       {show && (
          <div>
            <ChangePassword
              user={{user:uname}}
              show={show}
              SetShow={SetShow}
            />
          </div>
        )}
         <button className="otp-back-btn" onClick={Back}>Back to Login</button>
    </div>
  );
}

export default OtpVerification;
