import React from "react";
import { Routes, Route } from "react-router-dom";
import PingBackend from "./PingBackend";

export default function App() {
  return (
    <Routes>
      <Route path="/" element="sssss" />
      <Route path="/test" element={<PingBackend />} />
    </Routes>
  );
}
