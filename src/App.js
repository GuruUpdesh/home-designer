import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/styles.css";
import Clients from "./pages/Clients";
import Layout from "./components/Layout";
import Addresses from "./pages/Addresses";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import BillingHours from "./pages/BillingHours";

const rootElement = document.getElementById("root");

function App() {
	return (
		<HashRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Navigate to="/clients"/>} />
					<Route exact path="/clients" element={<Clients />} />
					<Route path="/addresses" element={<Addresses />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/employees" element={<Employees />} />
					<Route path="/billing-hours" element={<BillingHours />} />
				</Routes>
			</Layout>
		</HashRouter>
	);
}
export default App;
