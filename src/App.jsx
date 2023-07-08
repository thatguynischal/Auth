import "./App.css";
import { useEffect } from "react";
import Register from "./Component/Register";
import Login from "./Component/Login";
import Task from "./Component/Task";
import Home from "./Component/Home";
import Unauthorized from "./Component/Unauthorized";
import Layout from "./Component/Layout";
import Missing from "./Component/Missing";
import RequireAuth from "./Component/RequireAuth";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* public route */}
          <Route path="login" element={<Login />} />
          <Route path="unauthorized" element={<Unauthorized />} />

          {/* protected route */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="task" element={<Task />} />
          </Route>
          {/* catch all */}
          <Route path="*" element={<Missing />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
