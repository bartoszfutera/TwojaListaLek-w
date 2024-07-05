import React, { useState } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Userform from "./components/userform/userform";
import Druglist from "./components/druglist/Druglist";
import './scss/main.scss';

const App = () => {
    const [patient, setPatient] = useState("");

    const handleSetPatient = (patientData) => {
        setPatient(patientData);

    };

    return (

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Userform setPatient={handleSetPatient} />} />
                    <Route path="/Druglist" element={<Druglist patient={patient} />} />
                </Routes>
            </BrowserRouter>

    );
};

export default App;
