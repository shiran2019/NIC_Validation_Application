import * as React from "react";
import { BarChart } from "@mui/x-charts/BarChart";
import { Row, Col } from "react-bootstrap";

function Barchart(userData) {
  const data = [
    userData.userData.dialogCount,
    userData.userData.mobitelCount,
    userData.userData.hutchCount,
    userData.userData.airtelCount,
  ];

  const dataMale = [
    userData.userData.dialogMaleCount,
    userData.userData.mobitelMaleCount,
    userData.userData.hutchMaleCount,
    userData.userData.airtelMaleCount,
  ];

  const dataFemale = [
    userData.userData.dialogFemaleCount,
    userData.userData.mobitelFemaleCount,
    userData.userData.hutchFemaleCount,
    userData.userData.airtelFemaleCount,
  ];

  const chartData = [dataFemale, dataMale];

  return (
    <>
      <center>
        {" "}
        <p>
          {" "}
          Popular network providers and the Male \ Female counts for each
          provider
        </p>
      </center>
      <Row>
        <Col>
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Dialog", "Mobitel", "Hutch", "Airtel"],
              },
            ]}
            series={chartData.map((data, i) => ({
              data,
              type: "bar",
              name: `series ${i + 1}`,
              color: i === 0 ? "#d764e9" : "#64e9b7",
            }))}
            width={500}
            height={300}
          />
        </Col>
        <Col>
          <Row>
            <Col lg={8}>
              <p>Female</p>
            </Col>
            <Col lg={4}>
              <button
                type="button"
                style={{
                  backgroundColor: "#d764e9",
                  width: "8px",
                  height: "8px",
                }}
                class="btn btn-outline-primary"
              ></button>
            </Col>
          </Row>
          <Row>
            <Col lg={8}>
              <p>Male</p>
            </Col>
            <Col lg={4}>
              <button
                type="button"
                style={{
                  backgroundColor: "#64e9b7",
                  width: "8px",
                  height: "8px",
                }}
                class="btn btn-outline-primary"
              ></button>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>
    </>
  );
}
export default Barchart;
