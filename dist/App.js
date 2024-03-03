import React from "react";
import { Routes, Route } from "react-router-dom";
export default function App() {
    return (React.createElement(Routes, null,
        React.createElement(Route, { path: "/", element: "SPA" })));
}
