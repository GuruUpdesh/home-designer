import React, { useState } from "react";
import Nav from "./Nav";

const Layout = (props) => {
	const [navLocked, setNavLocked] = useState(true);
	function toggleNavLocked() {
		setNavLocked(!navLocked);
	}

	const [activeButton, setActiveButton] = useState("client");

	return (
		<>
			<Nav
				navLocked={navLocked}
				toggleNavLocked={toggleNavLocked}
				activeButton={activeButton}
				setActiveButton={setActiveButton}
			/>
			<main className={navLocked ? "navLockedMain" : "mainFull"}>
				{props.children}
			</main>
		</>
	);
};

export default Layout;
