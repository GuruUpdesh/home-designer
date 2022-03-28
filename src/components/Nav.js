import React from "react";
import { useNavigate } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { AiFillContainer, AiFillHome } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { BsFileEarmarkPersonFill, BsArrowDownUp } from "react-icons/bs";
import { animateScroll as scroll } from "react-scroll";

const Nav = (props) => {
	const navigate = useNavigate();
	function scrollToTop() {
		scroll.scrollToTop({
			duration: 100,
			isDynamic: true,
			smooth: "ease-in-out",
		});
	}
	return (
		<nav className={"navbar padding-24 " + (props.navLocked ? "navLocked" : "")}>
			<ul className='flex-column' role='list'>
				<li>
					<button
						className='nav-controller'
						onClick={() => {
							props.toggleNavLocked();
						}}
						>
						{props.navLocked ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
					</button>
				</li>
				<li>
					<button
						className={
							"nav-btn span-label " + (props.activeButton === "" ? "active-btn" : "")
						}
						onClick={() => {
							props.setActiveButton("");
							scrollToTop();
							navigate("/");
						}}
						onContextMenu={() => {
							const copy = {...props.contextFunctions.current}
							copy.link = `${window.location.href.replace(/[^/]*$/, '')}`
							props.contextFunctions.current = copy
						}}>
						<AiFillHome />
						<span className='br-10'>home</span>
					</button>
				</li>
				<li>
					<button
						className={
							"nav-btn span-label " +
							(props.activeButton === "clients" ? "active-btn" : "")
						}
						onClick={() => {
							props.setActiveButton("clients");
							scrollToTop();
							navigate("/clients");
						}} 
						onContextMenu={() => {
							const copy = {...props.contextFunctions.current}
							copy.link = `${window.location.href.replace(/[^/]*$/, '')}clients`
							props.contextFunctions.current = copy
						}}>
						<MdPeopleAlt />
						<span className='br-10'>clients</span>
					</button>
				</li>
				<li>
					<button
						className={
							"nav-btn span-label " +
							(props.activeButton === "addresses" ? "active-btn" : "")
						}
						onClick={() => {
							props.setActiveButton("addresses");
							scrollToTop();
							navigate("/addresses");
						}}
						onContextMenu={() => {
							const copy = {...props.contextFunctions.current}
							copy.link = `${window.location.href.replace(/[^/]*$/, '')}addresses`
							props.contextFunctions.current = copy
						}}>
						<FaAddressCard />
						<span className='br-10'>addresses</span>
					</button>
				</li>
				<li>
					<button
						className={
							"nav-btn span-label " +
							(props.activeButton === "projects" ? "active-btn" : "")
						}
						onClick={() => {
							props.setActiveButton("projects");
							scrollToTop();
							navigate("/projects");
						}}
						onContextMenu={() => {
							const copy = {...props.contextFunctions.current}
							copy.link = `${window.location.href.replace(/[^/]*$/, '')}projects`
							props.contextFunctions.current = copy
						}}>
						<AiFillContainer />
						<span className='br-10'>projects</span>
					</button>
				</li>
				<li>
					<button
						className={
							"nav-btn span-label relationship " +
							(props.activeButton === "projects-employees" ? "active-btn" : "")
						}
						onClick={() => {
							props.setActiveButton("projects-employees");
							scrollToTop();
							navigate("/projects-employees");
						}}
						onContextMenu={() => {
							const copy = {...props.contextFunctions.current}
							copy.link = `${window.location.href.replace(/[^/]*$/, '')}projects-employees`
							props.contextFunctions.current = copy
						}}>
						<BsArrowDownUp />
						<span className='br-10'>projects & employees</span>
					</button>
				</li>
				<li>
					<button
						className={
							"nav-btn span-label " +
							(props.activeButton === "employees" ? "active-btn" : "")
						}
						onClick={() => {
							props.setActiveButton("employees");
							scrollToTop();
							navigate("/employees");
						}}
						onContextMenu={() => {
							const copy = {...props.contextFunctions.current}
							copy.link = `${window.location.href.replace(/[^/]*$/, '')}employees`
							props.contextFunctions.current = copy
						}}>
						<BsFileEarmarkPersonFill />
						<span className='br-10'>employees</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
