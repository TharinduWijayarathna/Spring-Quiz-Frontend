import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AddQuestion from "../components/pages/AddQuestion";
import App from "../App";

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/add-question" element={<AddQuestion />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
