import React from "react";
import { useEffect, useState } from "react";
import { UserById, checkUserPw } from "../services/API/Functins";
import { AuthContext } from "../helpers/AuthContext";
import { Formik, Form, Field } from "formik";
import "../styles/ProfilePage.css";
import { useContext } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBTypography,
  MDBIcon,
} from "mdb-react-ui-kit";
import "../styles/ProfilePage.css";
import Popup from "../components/PopUpRegForm";
import { Row, Col } from "react-bootstrap";
import ChangePassword from "../components/ChangePassword";
import { Logout } from "../services/Other/Funtions";

const ProfilePage = (FetchData) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userDetails, setUserDetails] = useState([]);
  const authState = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [chckpw, setChckpw] = useState(false);
  const [showPwdChange, setShowPwdChange] = useState(false);
  const [myObject, setMyObject] = useState({user:authState.authState.userName});
  const [dta, setDta] = useState({
    userName: authState.authState.userName,
    password: "",
  });



  const FetchUserDetails = async () => {
    try {
      const uData = await UserById(authState.authState.userID);
      if (uData) {
        setUserDetails(uData);
        console.log(uData);

        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const FetchPw = async (user, pw) => {
    
    const data = await checkUserPw(user, pw);
    console.log("ggg"+data);
    try {
      if (data) {
        setShowPwdChange(true);
       
      }
    } catch (error) {
      console.error(error);
      alert("Password Not Matched");
    }
  };

  useEffect(() => {
    FetchUserDetails();
  }, []);

  const handleRowClick = () => {
    setShow(true);
  };

  const handlePwdClick = () => {
    setShowPwd(true);
  };

  const SetShow = (x) => {
    setShowPwdChange(x);
  };

  return (
    <div>
      <section className="vh-100">
        <MDBContainer className="profile-container">
          <MDBRow className="mdb-row">
            <MDBCol lg="12" className="mb-4 mb-lg-0">
              <MDBCard className="mb-3" style={{ borderRadius: ".5rem" }}>
                <Row>
                  <Col>
                    <MDBRow className="g-0">
                      <MDBCol md="12">
                        <MDBCardBody className="p-4">
                          <MDBTypography tag="h6">
                            {authState.authState.userName}'s profile
                          </MDBTypography>
                          <hr className="mt-0 mb-4" />

                          <MDBRow className="pt-1">
                            <MDBCol size="6" lg={6} sm={12} className="mb-3">
                              <MDBTypography tag="h6">Name</MDBTypography>
                              <MDBCardText className="text-muted">
                                {userDetails.FullName}
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol size="6" lg={6} sm={12} className="mb-3">
                              <MDBTypography tag="h6">Address</MDBTypography>
                              <MDBCardText className="text-muted">
                                {userDetails.Address}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>

                          <MDBRow className="pt-1">
                            <MDBCol size="6" lg={6} sm={12} className="mb-3">
                              <MDBTypography tag="h6">NIC No</MDBTypography>
                              <MDBCardText className="text-muted">
                                {userDetails.NIC}
                              </MDBCardText>
                            </MDBCol>
                            <MDBCol size="6" lg={6} sm={12} className="mb-3">
                              <MDBTypography tag="h6">Phone</MDBTypography>
                              <MDBCardText className="text-muted">
                                {userDetails.MobileNo}
                              </MDBCardText>
                            </MDBCol>
                          </MDBRow>
                          <Row>
                            <Col lg={4} sm={12}>
                              <button
                                onClick={handleRowClick}
                                className="edit-profile-btn"
                              >
                                Edit Profile
                              </button>
                            </Col>
                            <Col lg={4} sm={12}>
                              <button
                                onClick={handlePwdClick}
                                className="edit-profile-btn"
                              >
                                Change Password
                              </button>
                            </Col>
                            {authState.authState.role === "NormalUser" && (
                            <Col lg={4} sm={12}>
                              <button
                                onClick={Logout}
                                className="edit-profile-btn"
                              >
                                Logout
                              </button>
                            </Col>
                            )}
                          </Row>

                          {show && (
                            <div>
                              <Popup
                                selectedRow={userDetails}
                                show={show}
                                setShow={setShow}
                                fetchData={FetchData}
                                fetchUserDetails={FetchUserDetails}
                              />
                            </div>
                          )}
                        </MDBCardBody>
                      </MDBCol>
                    </MDBRow>
                  </Col>

                  {showPwd && (
                    <>
                      <Col>
                        <hr className="h-r" />
                        <Formik
                          initialValues={{
                            ...dta,
                          }}
                          onSubmit={async (data) => {
                            FetchPw(data.userName, data.password);
                            if (chckpw) {
                              setShowPwd(false);
                              setShow(true);
                            }
                          }}
                        >
                          <Form>
                            <div className="loginContainer">
                              <label htmlFor="userName">Username:</label>
                              <Field
                                type="text"
                                id="userName"
                                name="userName"
                                className="input-field" // Add your custom styles here
                              />

                              <label htmlFor="password">
                                Current Password:
                              </label>
                              <Field
                                type="password"
                                id="password"
                                name="password"
                                required
                                className="input-field" // Add your custom styles here
                              />

                              <div className="button-content">
                                <button type="submit" className="login-button">
                                  <b>Next</b>
                                </button>
                              </div>
                            </div>
                          </Form>
                        </Formik>
                      </Col>
                    </>
                  )}
                  {showPwdChange && (
                    <div>
                      <ChangePassword
                        user={myObject}
                        show={showPwdChange}
                        SetShow={SetShow}
                      />
                    </div>
                  )}
                </Row>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>
    </div>
  );
};

export default ProfilePage;
