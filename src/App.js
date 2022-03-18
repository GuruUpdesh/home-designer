import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles/styles.css";
import Clients from "./pages/Clients";
import Layout from "./components/Layout";
import Addresses from "./pages/Addresses";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import ProjectsEmployee from "./pages/ProjectsEmployee";
import Home from "./pages/Home";

function App() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home/>} />
					<Route exact path="/clients" element={<Clients />} />
					<Route path="/addresses" element={<Addresses />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/projects-employees" element={<ProjectsEmployee />} />
					<Route path="/employees" element={<Employees />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}
export default App;
