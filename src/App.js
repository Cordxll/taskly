import "./App.css";
import { Fragment, useEffect } from "react";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarAndTasks from "./components/calendar/CalendarAndTasks";
import HomePage from "./components/homepage/HomePage";
import EditCard from "./components/goals/actions/EditCard";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/Layout" element={<Layout />} />
          <Route exact path="/Edit" element={<EditCard />} />
          <Route exact path="/Cal" element={<CalendarAndTasks />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
