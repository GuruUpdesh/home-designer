import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import { useLocation } from "react-router-dom";

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

	return (
		<>
			<Nav
				navLocked={navLocked}
				toggleNavLocked={toggleNavLocked}
				activeButton={activeButton}
				setActiveButton={setActiveButton}
			/>
			<main className={navLocked ? "navLockedMain" : "mainFull"}>{props.children}</main>
		</>
	);
};

export default Layout;
