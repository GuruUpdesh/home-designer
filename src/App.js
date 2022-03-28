import React, { useState, useEffect, useRef } from "react";
import { HashRouter, Routes, Route, BrowserRouter } from "react-router-dom";
import "./styles/styles.css";
import Clients from "./pages/Clients";
import Layout from "./components/Layout";
import Addresses from "./pages/Addresses";
import Projects from "./pages/Projects";
import Employees from "./pages/Employees";
import ProjectsEmployee from "./pages/ProjectsEmployee";
import Home from "./pages/Home";
import ContextMenu from "./components/ContextMenu";
import NotFound from "./pages/NotFound";

function App() {
	const contextFunctions = useRef({
		create: null,
		edit: [null, null],
		delete: [null, null],
		link: null
	});

	return (
		<HashRouter>
			<ContextMenu contextFunctions={contextFunctions}/>
			<Layout contextFunctions={contextFunctions}>
				<Routes>
					<Route path='*' element={<NotFound/>} />

					<Route path='/' element={<Home  contextFunctions={contextFunctions}/>} />
					<Route
						exact
						path='/clients'
						element={
							<Clients
								contextFunctions={contextFunctions}
							/>
						}
					/>
					<Route
						path='/addresses'
						element={
							<Addresses
								contextFunctions={contextFunctions}
							/>
						}
					/>
					<Route
						path='/projects'
						element={
							<Projects
								contextFunctions={contextFunctions}
							/>
						}
					/>
					<Route
						path='/projects-employees'
						element={
							<ProjectsEmployee
								contextFunctions={contextFunctions}
							/>
						}
					/>
					<Route
						path='/employees'
						element={
							<Employees
								contextFunctions={contextFunctions}
							/>
						}
					/>
				</Routes>
			</Layout>
		</HashRouter>
	);
}
export default App;
