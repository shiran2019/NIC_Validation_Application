import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import { Row, Col, Alert } from "react-bootstrap";
import Popup from "./PopUpRegForm";
import "../styles/DataGrid.css";
import SearchBar from "./SearchBar";
import { NavigateReg } from "../services/Other/Funtions";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";



const DataGrid = (users, fetchData) => {
  const componentRef = useRef();

  const [selectedRow, setSelectedRow] = useState(null);
  const [show, setShow] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryNIC, setSearchQueryNIC] = useState("");

  const handleRowClick = (rowId) => {
    const selectedRowData = users.find((item) => item.UserId === rowId);
    if (selectedRowData) {
      setSelectedRow(selectedRowData);
      setShow(true);
    }
  };

  useEffect(() => {
    console.log(show);
    console.log(selectedRow);
  }, [show, selectedRow]);

  useEffect(() => {

    const filteredResults = users.filter((item) =>
      item.FullName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredResultsNIC = filteredResults.filter((item) =>
      item.NIC.toLowerCase().includes(searchQueryNIC.toLowerCase())
    );

    setSearchResults(filteredResultsNIC);

  }, [searchQuery,searchQueryNIC, users]);

    
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "Analytics",
  });

  return (
    <div>
      <Row>
        <Col lg={3}>
          <SearchBar
            value={searchQuery}
            placeholder={"Search by Name"}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </Col>
        <Col lg={3}>
          <SearchBar
            value={searchQueryNIC}
            placeholder={"Search by NIC"}
            onChange={(e) => setSearchQueryNIC(e.target.value)}
          />
        </Col>
      
      

        <Col lg={2}>
        <button onClick={NavigateReg} className="add-user-bn" >
                  Add User
                </button>
        </Col>
        <Col lg={4}> <button onClick={handlePrint} className="chart-print" >
          Export
        </button></Col>
      </Row>
      <Row>
        <Col xs={12} lg={6}>
          <div className="table-container"  ref={componentRef}> 
          <table className="grid">
            <thead>
              <tr>
                <th className="grid th">FullName</th>
                <th className="grid th">Address</th>
                <th className="grid th">NIC</th>
                <th className="grid th">MobileNo</th>
                <th className="grid th">Role</th>
                <th className="grid th">Status</th>
              </tr>
            </thead>
            <tbody>
              {searchResults &&
                searchResults.map((item) => (
                  <tr
                    className="grid tr"
                    key={item.UserId}
                    onClick={() => handleRowClick(item.UserId)}
                  >
                    <td className="grid td">{item.FullName}</td>
                    <td className="grid td">{item.Address}</td>
                    <td className="grid td">{item.NIC}</td>
                    <td className="grid td">{item.MobileNo}</td>
                    <td className="grid td">{item.Role}</td>
                    <td className="grid td">{item.Status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
          </div>
        </Col>
        {show && (
          <div>
            <Popup
              selectedRow={selectedRow}
              show={show}
              setShow={setShow}
              fetchData={fetchData}
            />
          </div>
        )}
      </Row>
    </div>
  );
};

export default DataGrid;
