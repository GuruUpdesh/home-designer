import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { useLocation, useNavigate } from "react-router-dom";
import { InView } from "react-intersection-observer";
import { animateScroll as scroll } from "react-scroll";
import {AiFillGithub} from 'react-icons/ai'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = (props) => {
	// set the state of the navbar locked or unlocked
	const [navLocked, setNavLocked] = useState(true);
	function toggleNavLocked() {
		setNavLocked(!navLocked);
	}

	// highlight the button corresponding to the current page
	const [activeButton, setActiveButton] = useState("");
	const location = useLocation();
	useEffect(() => {
		setActiveButton(location.pathname.substring(1));
	}, [location.pathname]);

	const navigate = useNavigate();

	return (
		<div className='app'>
			<div className="github" onClick={() => window.open(
              "https://github.com/GuruUpdesh")}><AiFillGithub/><p>Guru Updesh Singh</p></div>
			<Nav
				navLocked={navLocked}
				toggleNavLocked={toggleNavLocked}
				activeButton={activeButton}
				setActiveButton={setActiveButton}
			/>
			<main className={navLocked ? "navLockedMain" : "mainFull"}>{props.children}</main>
			<div className='footerContainer'>
				<InView>
					{({ inView, ref, entry }) => (
						<div
							ref={ref}
							className={navLocked ? "navLockedMain footer" : "mainFull footer"}>
							<h1 className={inView ? "" : "displayNone"}> </h1>
							<div className='gradient' />
							<img
								src='/homedesigner.png'
								className={inView ? "" : "displayNone"}
								alt={""}></img>
							<div>
								<ul className={inView ? "" : "displayNone"}>
								<li
										className={activeButton === "" ? "activeLink" : ""}
										onClick={() => {
											setActiveButton("");
											scroll.scrollToTop({
												duration: 250,
												smooth: "ease-in-out",
											});
											navigate("/");
										}}>
										Home
									</li>
									<li
										className={activeButton === "clients" ? "activeLink" : ""}
										onClick={() => {
											setActiveButton("clients");
											scroll.scrollToTop({
												duration: 250,
												smooth: "ease-in-out",
											});
											navigate("/clients");
										}}>
										Clients
									</li>
									<li
										className={activeButton === "addresses" ? "activeLink" : ""}
										onClick={() => {
											setActiveButton("addresses");
											scroll.scrollToTop({
												duration: 250,
												smooth: "ease-in-out",
											});
											navigate("/addresses");
										}}>
										Addresses
									</li>
									<li
										className={activeButton === "projects" ? "activeLink" : ""}
										onClick={() => {
											setActiveButton("projects");
											scroll.scrollToTop({
												duration: 250,
												smooth: "ease-in-out",
											});
											navigate("/projects");
										}}>
										Projects
									</li>
									<li
										className={
											activeButton === "projects-employees"
												? "activeLink relationship"
												: "relationship"
										}
										onClick={() => {
											setActiveButton("projects-employees");
											scroll.scrollToTop({
												duration: 250,
												smooth: "ease-in-out",
											});
											navigate("/projects-employees");
										}}>
										P & E
									</li>
									<li
										className={activeButton === "employees" ? "activeLink" : ""}
										onClick={() => {
											setActiveButton("employees");
											scroll.scrollToTop({
												duration: 250,
												smooth: "ease-in-out",
											});
											navigate("/employees");
										}}>
										Employees
									</li>
								</ul>
							</div>
							<h3 className={inView ? "" : "displayNone"}>
								by Guru Updesh Singh & Liheng Yi
							</h3>
						</div>
					)}
				</InView>
			</div>
			<ToastContainer
				position="bottom-right"
				autoClose={2500}
				theme={"dark"}
				closeOnClick
				rtl={false}
				pauseOnHover={false}
				pauseOnFocusLoss
				draggable
			/>
		</div>
	);
};

export default Layout;
