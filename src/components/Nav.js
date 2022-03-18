import React from "react";
import { useNavigate } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { AiFillContainer, AiFillHome } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { BsFileEarmarkPersonFill, BsArrowDownUp } from "react-icons/bs";
import {animateScroll as scroll} from "react-scroll";

const Nav = (props) => {
	const navigate = useNavigate();
	return (
		<nav
			className={props.navLocked ? "navLocked" : ""}>
			<div
				className='navController'
				onClick={() => {
					props.toggleNavLocked();
				}}>
				{props.navLocked ? <HiChevronDoubleLeft /> : <HiChevronDoubleRight />}
			</div>
			<ul>
			<li>
					<button
						className={props.activeButton === "" ? "activeBtn" : ""}
						onClick={() => {
							props.setActiveButton("");
							scroll.scrollToTop({
								duration: 250,
								smooth: 'ease-in-out',
							  })
							navigate("/");
						}}>
						<AiFillHome />
						<span>home</span>
					</button>
				</li>
				<li>
					<button
						className={props.activeButton === "clients" ? "activeBtn" : ""}
						onClick={() => {
							props.setActiveButton("clients");
							scroll.scrollToTop({
								duration: 250,
								smooth: 'ease-in-out',
							  })
							navigate("/clients");
						}}>
						<MdPeopleAlt />
						<span>clients</span>
					</button>
				</li>
				<li>
					<button
						className={props.activeButton === "addresses" ? "activeBtn" : ""}
						onClick={() => {
							props.setActiveButton("addresses");
							scroll.scrollToTop({
								duration: 250,
								smooth: 'ease-in-out',
							  })
							navigate("/addresses");
						}}>
						<FaAddressCard />
						<span>addresses</span>
					</button>
				</li>
				<li>
					<button
						className={props.activeButton === "projects" ? "activeBtn" : ""}
						onClick={() => {
							props.setActiveButton("projects");
							scroll.scrollToTop({
								duration: 250,
								smooth: 'ease-in-out',
							  })
							navigate("/projects");
						}}>
						<AiFillContainer />
						<span>projects</span>
					</button>
				</li>
				<li>
					<button
						className={props.activeButton === "projects-employees" ? "activeBtn relationship" : "relationship"}
						onClick={() => {
							props.setActiveButton("projects-employees");
							scroll.scrollToTop({
								duration: 250,
								smooth: 'ease-in-out',
							  })
							navigate("/projects-employees");
						}}>
						<BsArrowDownUp />
						<span>projects_employees</span>
					</button>
				</li>
				<li>
					<button
						className={props.activeButton === "employees" ? "activeBtn" : ""}
						onClick={() => {
							props.setActiveButton("employees");
							scroll.scrollToTop({
								duration: 250,
								smooth: 'ease-in-out',
							  })
							navigate("/employees");
						}}>
						<BsFileEarmarkPersonFill />
						<span>employees</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
