import React, { useState, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const Selector = (props) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	function dropDownClose() {
		setIsDropDownOpen(false);
	}
	function toggleDropDown() {
		setIsDropDownOpen(!isDropDownOpen);
	}
	const ref = useRef();
	useOnClickOutside(ref, () => dropDownClose());

	return props.addresses.length > 1 ? (
		<div className={isDropDownOpen ? "dropDown active" : "dropDown"} tabIndex={0} ref={ref}>
			<div className='selector' onClick={toggleDropDown}>
				{props.default}
				{isDropDownOpen ? <BiChevronUp /> : <BiChevronDown />}
			</div>
			{isDropDownOpen && (
				<div>
					<ul>
						{props.addresses.map((name, index) => (
							<li className='option' tabIndex={0} key={index}>
								{name}
							</li>
						))}
						<li></li>
					</ul>
				</div>
			)}
		</div>
	) : (
		<>{props.addresses[0]}</>
	);
};

export default Selector;
