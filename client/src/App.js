import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import { MyRoutes } from "./routers/routes";
import { useLocation } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = "http://localhost:3001";

function App() {
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="App">
        {pathname !== "/" && (
          <NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
        )}
        <MyRoutes currentPage={currentPage} setCurrentPage={setCurrentPage}/>
   
    </div>
  );
}

export default App;
