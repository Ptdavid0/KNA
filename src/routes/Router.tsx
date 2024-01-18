import { Routes, Route } from "react-router-dom";
import Home from "../modules/Home";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export default Router;
