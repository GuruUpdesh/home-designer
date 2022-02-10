import React, { useState } from "react";
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
				className="navController"
				onClick={() => {
					props.toggleNavLocked();
				}}
			>
				{props.navLocked ? (
					<HiChevronDoubleLeft />
				) : (
					<HiChevronDoubleRight />
				)}
			</div>
			<ul>
				<li>
					<button
						className={
							props.activeButton === "client" ? "activeBtn" : ""
						}
						onClick={() => {
							props.setActiveButton("client");
							navigate("/clients");
						}}
					>
						<MdPeopleAlt />
						<span>clients</span>
					</button>
				</li>
				<li>
					<button
						className={
							props.activeButton === "address" ? "activeBtn" : ""
						}
						onClick={() => {
							props.setActiveButton("address");
							navigate("/addresses");
						}}
					>
						<FaAddressCard />
						<span>addresses</span>
					</button>
				</li>
				<li>
					<button
						className={
							props.activeButton === "project" ? "activeBtn" : ""
						}
						onClick={() => {
							props.setActiveButton("project");
							navigate("/projects");
						}}
					>
						<AiFillContainer />
						<span>projects</span>
					</button>
				</li>
				<li>
					<button
						className={
							props.activeButton === "employee" ? "activeBtn" : ""
						}
						onClick={() => {
							props.setActiveButton("employee");

							navigate("/employees");
						}}
					>
						<BsFileEarmarkPersonFill />
						<span>employees</span>
					</button>
				</li>
				<li>
					<button
						className={
							props.activeButton === "billing" ? "activeBtn" : ""
						}
						onClick={() => {
							props.setActiveButton("billing");

							navigate("/billing-hours");
						}}
					>
						<FaMoneyBillWaveAlt />
						<span>billing hours</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};

export default Nav;
