import React from "react";
import { useNavigate } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { AiFillContainer } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";
import { BsFileEarmarkPersonFill } from "react-icons/bs";
import { ImArrowRight2 } from "react-icons/im";

const SliderCard = ({ title, attributes, contextFunctions }) => {
	const navigate = useNavigate();
	return (
		<div className='cardWrapper'>
			<div className='cardContainer padding-16 overflow-hidden'>
				<div className='cardHeader'>
					<h2
						className='hoverUnderLine'
						onClick={() => {
							navigate(title);
						}}>
						{title}
					</h2>
					{title === "clients" ? (
						<MdPeopleAlt />
					) : title === "addresses" ? (
						<FaAddressCard />
					) : title === "projects" ? (
						<AiFillContainer />
					) : title === "employees" ? (
						<BsFileEarmarkPersonFill />
					) : (
						<></>
					)}
				</div>
				<ul className='flex-wrap' role='list'>
					{attributes.map((attribute, index) => {
						return (
							<li className='fs-medium padding-6' key={index}>
								{attribute}
							</li>
						);
					})}
				</ul>
				<button
					className='card-btn'
					onClick={() => {
						let nav = title;
						if (title === "projects & employees") {
							nav = "projects-employees";
						}
						navigate(nav);
					}}
					onContextMenu={() => {
						let nav = title;
						if (title === "projects & employees") {
							nav = "projects-employees";
						}

						const copy = { ...contextFunctions.current };
						copy.link = `${window.location.href.replace(/[^/]*$/, "") + nav}`;
						contextFunctions.current = copy;
					}}>
					VISIT <ImArrowRight2 />
				</button>
			</div>
		</div>
	);
};

export default SliderCard;
