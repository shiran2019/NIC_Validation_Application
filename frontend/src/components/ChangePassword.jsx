import React from "react";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, useFormikContext } from "formik";
import { Row, Col } from "react-bootstrap";
import "../styles/Register.css";
import Modal from "react-bootstrap/Modal";
import { PasswordVal } from "../services/Functions/Validations";
import { UpdUserPwd } from "../services/API/Functins";

function ChangePassword({user , show, SetShow}) {

    const [password, setPassword] = useState("");
  const [dta, setDta] = useState({
    UserName: user.user,
    Password: "",
    ConfirmPassword: "",
  });

  console.log(user);
  if (show) {
  return (
    <div>
      <div>
        <div>
          <Modal
            size="lg"
            show={show}
            onHide={() => SetShow(false)}
            aria-labelledby="example-modal-sizes-title-lg"
          >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Change Password
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <Formik
                  initialValues={{
                    ...dta,
                  }}
                  onSubmit={async (data) => {
                    UpdUserPwd(data);
                   
                  }}
                >
                  <Form>
                    <Row>
                      <Col xs={12} lg={12}>
                        <label>User Name :</label>
                        <Field
                          readOnly={true}
                          id="inputCreatePost"
                          name="UserName"
                          className="form-control"
                          value={user.user}
                        />
                      </Col>
                      <Col xs={12} lg={6}>
                        <label>Password :</label>
                        <Field
                          type="password"
                          id="inputCreatePost"
                          name="Password"
                          className="form-control"
                          onChange={(event) => {
                            setPassword(event.target.value);
                          }}
                          value={password}
                        />
                        <ErrorMessage
                          name="Password"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Col>
                      <Col xs={12} lg={6}>
                        <label>Confirm Password :</label>
                        <Field
                          id="inputCreatePost"
                          type="password"
                          name="ConfirmPassword"
                          className="form-control"
                          validate={(value) => {
                            return PasswordVal(value, password);
                          }}
                        />
                        <ErrorMessage
                          name="ConfirmPassword"
                          component="div"
                          style={{ color: "red" }}
                        />
                      </Col>

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
      </div>
    </div>
  );
                        }
}

export default ChangePassword;
