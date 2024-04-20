import "./App.css";
import { useState } from "react";
import AdminInventory from "./component/AdminInventory";
import UserInventory from "./component/UserInventory";

function App() {
  const [isAdminMode, setIsAdminMode] = useState<boolean>(true);

  const handleToggleMode = () => {
    setIsAdminMode((prevMode) => !prevMode);
  };
  return (
    <>
      <h1>Inventory Management System</h1>
      <button
        className={`toggle-button ${isAdminMode ? "on" : "off"}`}
        onClick={handleToggleMode}
      >
        {isAdminMode ? "Switch to User" : " Switch to Admin"}
      </button>
      {isAdminMode ? <AdminInventory /> : <UserInventory />}
    </>
  );
}

export default App;
