import React, { useState } from 'react';
import TravelPlan from './pages/TravelPlan.jsx';
import CustomInput from './pages/CustomInput.jsx';
import APITest from './pages/APITest.jsx';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {

    const [styles, setStyles] = useState({
        "destination" : "",
        "people_count" : 0,
        "relationship" : "",
        "duration" : 0,
        "date_range" : "",
        "budget" : ""
    })

    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<CustomInput styles={styles} setStyles={setStyles} />} />
                    <Route path="/results" element={<TravelPlan styles={styles} />} />
                    <Route path="/test" element={<APITest />} />
                </Routes>
            </Router>
        </div>

    );
}

export default App;