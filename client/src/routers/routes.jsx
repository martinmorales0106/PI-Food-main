import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing/Landing";
import Home from "../pages/Home/Home";
import Detail from "../pages/Detail/Detail";
import Form from "../pages/Form/Form";

export function MyRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/form" element={<Form />} />
      </Routes>
    </Router>
  );
}
