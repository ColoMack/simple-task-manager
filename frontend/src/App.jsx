import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import MoreInfo from './pages/More_Info';
import EditTaskForm from './components/EditTaskForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/tasks/:id' element={<MoreInfo />} />
        <Route path='/tasks/:id/edit' element={<EditTaskForm />} />
      </Routes>
    </Router>
  );
};

export default App;
