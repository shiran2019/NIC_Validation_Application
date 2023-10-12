import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import DataGrid from "./DataGrid";
import "../styles/DataGrid.css";
import { Row, Col, Alert } from "react-bootstrap";
import { Logout, NavigateReg } from "../services/Other/Funtions";

import "../styles/DynamicTabs.css";
import ProfilePage from "../pages/ProfilePage";
import ChartTab from "../pages/ChartTab";

function DynamicTabs({ FetchData, users, FetchUserData, userData }) {
  return (
    <div>
      <Row>
        <Col lg={11}>
          <Tabs
            defaultActiveKey="prof"
            id="uncontrolled-tab-example"
            className="mb-3"
          >
             <Tab eventKey="prof" title="Profile">
              <div className="grid-container">{ProfilePage(FetchData)}</div>
            </Tab>
            <Tab eventKey="users" title="Users">
              <div className="grid-container">{DataGrid(users, FetchData)}</div>
            </Tab>
           
            <Tab eventKey="charts" title="Dashboard">
            <div>{ChartTab(userData)}</div>
            </Tab>

            <Tab eventKey="logout" title="Logout">
              <div className="logout-container">
                <Alert variant="danger">
                  <Alert.Heading>Are you sure?</Alert.Heading>
                  <p>
                    You will be logged out of the system. If you want to
                    continue, click on the button below.
                  </p>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <button onClick={Logout} className="btn btn-outline-danger">
                      Logout
                    </button>
                  </div>
                </Alert>
              </div>
            </Tab>
<button  className="btn btn-outline-primary">dfb</button>
          </Tabs>
        </Col>
      </Row>
    </div>
  );
}

export default DynamicTabs;
