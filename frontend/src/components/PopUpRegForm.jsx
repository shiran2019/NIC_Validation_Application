import { useState } from "react";
import React from "react";
import Modal from "react-bootstrap/Modal";
import {
  AddressVal,
  CheckboxVal,
  FnameVal,
  MobileNoVal,
  NICval,
  RoleVal,
  StatusVal,
} from "../services/Functions/Validations";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { Row, Col } from "react-bootstrap";
import { UpdUser } from "../services/API/Functins";
import "../styles/Register.css";
import { AuthContext } from "../helpers/AuthContext";
import { useContext } from "react";

function Popup({ selectedRow, show, setShow, fetchData, fetchUserDetails }) {
  const [network, setNetwork] = useState("");
  const [dob, setDob] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");

  const authState = useContext(AuthContext);

  const [dta, setDta] = useState({
    FullName: selectedRow.FullName,
    Address: selectedRow.Address,
    NIC: selectedRow.NIC,
    MobileNo: selectedRow.MobileNo,
    Status: selectedRow.Status,
    UserId: selectedRow.UserId,
    Age: "",
    Gender: "",
    BirthDay: "",
    checked: "",
    Role: selectedRow.Role,
  });

  if (show) {
    return (
      <>
        <div>
          <Modal
            size="lg"
            show={show}
            onHide={() => setShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Edit User Details
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Formik
                  initialValues={{
                    ...dta,
                  }}
                  onSubmit={async (data) => {
                    UpdUser(data);
                    await setShow(false);
                    await fetchData();
                    fetchData();
                    fetchUserDetails();
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
                          <button
                            id="num_btn"
                            disabled="true"
                            className="check-button"
                          >
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
                            <p className="check-p">
                              {" "}
                              - Check details and tick the box
                            </p>
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

                      {selectedRow.UserId !== authState.authState.userID && (
                        <>
                          <Row>
                            <Col xs={12} lg={6}>
                              <label>Status:</label>
                              <Field
                                as="select"
                                id="inputCreatePost"
                                name="Status"
                                className="form-control"
                                validate={(value) => {
                                  return StatusVal(value);
                                }}
                              >
                                <option value="">Select item</option>
                                <option value="Active">Active</option>
                                <option value="Dissable">Dissable</option>
                              </Field>
                              <ErrorMessage
                                name="Status"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </Col>
                          </Row>
                          <hr className="devider-hr" />
                          <Row>
                            <Col>
                              <label>Role :</label>
                              <Field
                                as="select"
                                id="inputCreatePost"
                                name="Role"
                                className="form-control"
                                validate={(value) => {
                                  return RoleVal(value);
                                }}
                              >
                                <option value="">Change Role</option>
                                <option value="NormalUser">User</option>
                                <option value="Admin">Admin</option>
                              </Field>
                              <ErrorMessage
                                name="Role"
                                component="div"
                                style={{ color: "red" }}
                              />
                            </Col>
                          </Row>
                          <hr className="devider-hr" />
                        </>
                      )}

                      <hr className="devider-hr" />
                    </Row>
                    <div className="button-div">
                      <button type="submit" className="btn-primary">
                        Save
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </>
    );
  }
}

export default Popup;
