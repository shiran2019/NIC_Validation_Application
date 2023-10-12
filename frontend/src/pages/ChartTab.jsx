import React from "react";
import Piechart from "../components/PieChart";
import Barchart from "../components/BarChart";
import { Row, Col, Alert } from "react-bootstrap";
import { useRef } from "react";
import "../styles/DynamicTabs.css";
import { useReactToPrint } from "react-to-print";
import LineChart from "../components/LineChart";

function ChartTab(userData) {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Analytics",
  });
  return (
    <>
    <div>
    <button onClick={handlePrint} className="chart-print" >
          Export
        </button>
 <hr></hr>
    </div>
    <div className="chart-div" ref={componentRef}>
      <Row>
        <Col lg={6} md={12} sm={12}>
          <Row>
            <div className="user-counts">
            <b>
              <Row><Col ><p>All Users :</p></Col><Col> {userData.userCount}</Col></Row>
              <Row><Col> <p>Active Users :</p></Col><Col> {userData.userCount}</Col></Row>
              
              </b>
            </div>
          </Row>
          <Row>
            <div className="pie-container">
              {" "}
              <div>
                <Piechart userData={userData} />
                <center>
                  {" "}
                  <p>Male and Female count of the registred users. </p>
                </center>
              </div>
            </div>
          </Row>
        </Col>
        <Col lg={6} md={12} sm={12}>
          <div className="bar-container">
            <div>
              <Barchart userData={userData} />
            </div>
          </div>
        </Col>
        <Col lg={12} md={12} sm={12}>
          <div className="bar-container">
            <div>
              <LineChart userData={userData} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
    </>
  );
}

export default ChartTab;
