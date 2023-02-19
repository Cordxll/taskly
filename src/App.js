import "./App.css";
import { Fragment, useEffect } from "react";
import Layout from "./components/layout/Layout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CalendarAndTasks from "./components/calendar/CalendarAndTasks";
import EditCard from "./components/goals/actions/EditCard";
import HomePublic from "./components/home/HomePublic";

function App() {
  return (
    <Fragment>
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePublic/>}/>
          <Route exact path="/Layout" element={<Layout />} />
          <Route exact path="/Edit" element={<EditCard />} />
          <Route exact path="/Cal" element={<CalendarAndTasks />} />
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
