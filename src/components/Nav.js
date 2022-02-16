import React from "react";
import { MdPeopleAlt } from "react-icons/md";
import { AiFillContainer } from "react-icons/ai";
import { FaAddressCard, FaMoneyBillWaveAlt } from "react-icons/fa";
import { HiChevronDoubleRight, HiChevronDoubleLeft } from "react-icons/hi";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Nav = (props) => {
	const navigate = useNavigate();
	return (
		<nav className={props.navLocked ? "navLocked" : ""}>
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
						className={props.activeButton === "clients" ? "activeBtn" : ""}
						onClick={() => {
							props.setActiveButton("clients");
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
							navigate("/projects");
						}}>
						<AiFillContainer />
						<span>projects</span>
					</button>
				</li>
				<li>
					<button
						className={props.activeButton === "employees" ? "activeBtn" : ""}
						onClick={() => {
							props.setActiveButton("employees");

							navigate("/employees");
						}}>
						<BsFileEarmarkPersonFill />
						<span>employees</span>
					</button>
				</li>
				<li>
					<button
						className={props.activeButton === "billing-hours" ? "activeBtn" : ""}
						onClick={() => {
							props.setActiveButton("billing-hours");

							navigate("/billing-hours");
						}}>
						<FaMoneyBillWaveAlt />
						<span>billing hours</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
