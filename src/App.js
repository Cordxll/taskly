import "./App.css";
import { Fragment, useEffect } from "react";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/homepage/HomePage";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/Layout" element={<Layout />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
