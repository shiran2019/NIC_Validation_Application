import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Row, Col } from "react-bootstrap";
import { Submit } from "../services/API/Functins";
import "../styles/Register.css";

import {
  AddressVal,
  CheckboxVal,
  FnameVal,
  MobileNoVal,
  NICval,
  PasswordVal,
  UsernameVal,
} from "../services/Functions/Validations";

const Register = () => {
  const [network, setNetwork] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const [dta, setDta] = useState({
    FullName: "",
    Address: "",
    NIC: "",
    MobileNo: "",
    Age: "",
    Gender: "",
    BirthDay: "",
    UserName: "",
    Password: "",
    Role: "",
    checked: "",
  });



  return (
    <div className="reg-container">
      <h1 className="header-text">Registration Form</h1>
      <div className="form-container">
        <Formik
          initialValues={{
            ...dta,
          }}
          onSubmit={(data) => {
            Submit(data);
          }}
        >
          <Form>
            <Row>
              <Col xs={12} lg={12}>
                <label>Full Name :</label>
                <Field
                  id="inputCreatePost"
                  name="FullName"
                  className="form-control"
                  validate={(value) => {
                    return FnameVal(value);
                  }}
                />
                <ErrorMessage
                  name="FullName"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>
              <Col xs={12} lg={12}>
                <label>Address :</label>
                <Field
                  id="inputCreatePost"
                  name="Address"
                  as="textarea"
                  className="form-control"
                  validate={(value) => {
                    return AddressVal(value);
                  }}
                />
                <ErrorMessage
                  name="Address"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>
              <hr className="devider-hr" />
              <Row>
                <Col xs={12} lg={6}>
                  <label>Mobile Number :</label>
                  <Field
                    id="inputCreatePost"
                    name="MobileNo"
                    className="form-control"
                    validate={(value) => {
                      return MobileNoVal(value);
                    }}
                  />
                  <ErrorMessage
                    name="MobileNo"
                    component="div"
                    // id="serviceProvider"
                    style={{ color: "red" }}
                  />
                </Col>
                <Col xs={12} lg={1}>
                  <button id="num_btn" disabled="true" className="check-button">
                    Network Provider
                  </button>
                </Col>
                <Col xs={12} lg={6}>
                  <p className="network-provider">{network}</p>
                </Col>
              </Row>
              <hr className="devider-hr" />
              <Row>
                <Col xs={12} lg={6}>
                  <label>NIC Number :</label>
                  <Field
                    id="inputCreatePost"
                    name="NIC"
                    className="form-control"
                    validate={(value) => {
                      return NICval(value);
                    }}
                  />
                  <ErrorMessage
                    name="NIC"
                    component="div"
                    style={{ color: "red" }}
                  />
                </Col>
              </Row>
              <Col xs={12} lg={6}>
                <label>Age :</label>
                <button
                  readOnly={true}
                  disabled="true"
                  id="age-button"
                  name="Age"
                  className="form-control"
                  value={age}
                >
                  age
                </button>
                <ErrorMessage
                  name="Age"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>
              <Col xs={12} lg={6}>
                <label>BirthDay :</label>
                <button
                  disabled="true"
                  readOnly={true}
                  id="bday-button"
                  name="BirthDay"
                  className="form-control"
                  value={dob}
                >
                  BirthDay
                </button>
                <ErrorMessage
                  name="BirthDay"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>
              <Col xs={12} lg={6}>
                <label>Gender :</label>
                <button
                  disabled="true"
                  readOnly={true}
                  id="gender-button"
                  name="Gender"
                  className="form-control"
                  value={gender}
                >
                  Gender
                </button>
                <ErrorMessage
                  name="Gender"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>
              <Row>
                <p className="check-label">
                  <Col lg={0.8}>
                    <Field
                      id="inputCreatePost"
                      type="checkbox"
                      name="checked"
                      className="form-check"
                      validate={(value) => {
                        return CheckboxVal(value);
                      }}
                    />
                  </Col>

                  <Col lg={6}>
                    <p className="check-p"> - Check details and tick the box</p>
                  </Col>
                </p>
              </Row>
              <Row lg={12} className="check-error-raw">
                <ErrorMessage
                  name="checked"
                  component="div"
                  style={{ color: "red" }}
                />
              </Row>

              <hr className="devider-hr" />
              <Col xs={12} lg={12}>
                <label>User Name for your account :</label>
                <Field
                  id="inputCreatePost"
                  name="UserName"
                  className="form-control"
                  validate={(value) => {
                    return UsernameVal(value);
                  }}
                />
                <ErrorMessage
                  name="UserName"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>
              <Col xs={12} lg={6}>
                <label>Password :</label>
                <Field
                  type="password"
                  id="inputCreatePost"
                  name="cPassword"
                  className="form-control"
                  onChange={(event) => {
                    setPassword(event.target.value);
                  }}
                  value={password}
                />
                <ErrorMessage
                  name="cPassword"
                  component="div"
                  style={{ color: "red" }}
                />
              </Col>
              <Col xs={12} lg={6}>
                <label>Confirm Password :</label>
                <Field
                  id="inputCreatePost"
                  type="password"
                  name="Password"
                  className="form-control"
                  validate={(value) => {
                    return PasswordVal(value, password);
                  }}
                />
                <ErrorMessage
                  name="Password"
                  component="div"
                  style={{ color: "red" }}

                />
              </Col>
            </Row>
            <div className="button-div">
              <button type="submit" className="btn-primary">
                SUBMIT
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;
