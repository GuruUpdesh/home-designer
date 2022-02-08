import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/styles.css"
import Clients from "./pages/Clients";
const rootElement = document.getElementById("root");

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Clients />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
