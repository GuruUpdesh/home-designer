import React, { useState, useRef, useEffect } from "react";
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

	return props.addresses.length > 0 ? (
		<div className={"listContainer " + (isDropDownOpen ? " active": props.addresses.length === 1
				? " noInteract"
				: "")} ref={ref}>
			<div onClick={() => {toggleDropDown(); console.log("toggle")}}>
				{props.addresses[0]}
				{props.addresses.length > 1 &&
					(isDropDownOpen ? <BiChevronUp /> : <BiChevronDown />)}
			
			</div>
			<ul
				style={{ "--size": props.addresses.length }}>
				<>
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
							<li className='spacer'></li>
						</>
					)}
				</>
			</ul>
		</div>
	) : (
		<span className='null'>{"no " + props.default}</span>
	);
};

export default List;
