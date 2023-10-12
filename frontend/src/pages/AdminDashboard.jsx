import React, { useState, useEffect } from "react";
import DataGrid from "../components/DataGrid";
import { GetAllUsers, UserData } from "../services/API/Functins";
import axios from "axios";
import DynamicTabs from "../components/DynamicTabs";
import "../styles/AdminDashboard.css";
import NavigationBar from "../components/NavigationBar";


function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [userData, setUserData] = useState([]);

  const [showGrid, setShowGrid] = useState(false);
  const [showDashBoard, setShowDashBoard] = useState(false);

  // const ShowGrid = () => {
  //   setShowDashBoard(false);
  //   setShowGrid(true);
  // };

  // const ShowDashBoard = () => {
  //   setShowGrid(false);
  //   setShowDashBoard(true);
  // }


  const FetchData = async () => {
    try {
      const userList = await GetAllUsers();
      if (userList) {
        setUsers(userList);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const FetchUserData = async () => {
    try {
      const uData = await UserData();
      if (uData) {
        setUserData(uData);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    FetchData();
    FetchUserData();
  }, []);

  return (
    <div>
      {/* <div>
      <NavigationBar  FetchData={FetchData}
            users={users}
            FetchUserData={FetchUserData}
            userData={userData}
            showGrid={ShowGrid}
            showDashBoard={ShowDashBoard}
            />
      </div> */}
      {/* <div>
        <Sidebar FetchData={FetchData}
            users={users}
            FetchUserData={FetchUserData}
            userData={userData}/>
      </div> */}

      <div className="admin-dash">
        <div>
          <DynamicTabs
            FetchData={FetchData}
            users={users}
            FetchUserData={FetchUserData}
            userData={userData}
          />
        </div>
      </div>
      {/* <div>
{showGrid && (
  <div>
    <DataGrid users={users} fetchData={FetchData} />
    </div>
)}
{showDashBoard && (
  <div>
    <DataGrid users={users} fetchData={FetchData} />
    </div>
)}
      </div> */}
    </div>
  );
}

export default AdminDashboard;
