import React, { useState, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const List = (props) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	function dropDownClose() {
		setIsDropDownOpen(false);
	}
	function toggleDropDown() {
		if (props.addresses.length > 1) {
			setIsDropDownOpen(!isDropDownOpen);
		}
	}
	const ref = useRef();
	useOnClickOutside(ref, () => dropDownClose());

	// return props.addresses.length > 0 ? (
	// 	<div className={isDropDownOpen ? "dropDown active" : "dropDown"} tabIndex={0} ref={ref}>
	// 		<ul className='selector' onClick={toggleDropDown}>
	// 			<li>
	// 				{" "}
	// 				{props.addresses[0]}
	// 				{props.addresses.length > 1 ? (
	// 					isDropDownOpen ? (
	// 						<BiChevronUp />
	// 					) : (
	// 						<BiChevronDown />
	// 					)
	// 				) : (
	// 					<></>
	// 				)}
	// 			</li>
	// 		</ul>
	// 		{isDropDownOpen && (
	// 			<div>
	// 				<ul>
	// 					{props.addresses.map((name, index) => {
	// 						return (
	// 							<li className='option' tabIndex={0} key={index}>
	// 								{name}
	// 							</li>
	// 						);
	// 					})}
	// 					<li></li>
	// 				</ul>
	// 			</div>
	// 		)}
	// 	</div>
	// ) : (
	// 	<span className='null'>{"no " + props.default}</span>
	// );

	return props.addresses.length > 0 ? (
		<ul ref={ref} className={isDropDownOpen ? "list active" : props.addresses.length === 1 ? "list noInteract" : "list"} style={{"--size": props.addresses.length}}>
			<li onClick={toggleDropDown}>
				{props.addresses[0]}
				{props.addresses.length > 1 &&
					(isDropDownOpen ? <BiChevronUp /> : <BiChevronDown />)}
			</li>
			{isDropDownOpen && (
				<>
					{props.addresses.map((name, index) => {
						if (index != 0) {
							return (
								<li className='option' key={index}>
									{name}
								</li>
							);
						}
					})}
			<li></li>
				</>
			)}
		</ul>
	) : (
		<span className='null'>{"no " + props.default}</span>
	);
};

export default List;
