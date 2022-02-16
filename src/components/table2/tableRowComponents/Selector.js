import React, { useState, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import useOnClickOutside from "../../../hooks/useOnClickOutside";


const Selector = (props) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);
	function dropDownOpen() {
		setIsDropDownOpen(true);
	}
	function dropDownClose() {
		setIsDropDownOpen(false);
	}
	function toggleDropDown() {
		setIsDropDownOpen(!isDropDownOpen);
	}
	const ref=useRef()
	useOnClickOutside(ref, () => dropDownClose())

	const [options, setOptions] = useState(props.addresses);
	const [searchOptions, setSearchOptions] = useState(options);
	const [searchValue, setSearchValue] = useState("");

	function searchHandler(value) {
		setSearchValue(value);
		const result = options.filter((address) => {
			return (
				address.toString().toLowerCase().indexOf(value.toLowerCase()) >
				-1
			);
		});
		setSearchOptions(result);
	}
	return props.addresses.length > 1 ? (
		<div
			className={isDropDownOpen ? "dropDown active" : "dropDown"}
			tabIndex={0}
			ref={ref}
		>
			<div className="selector" onClick={toggleDropDown}>
				{"addresses"}
				{isDropDownOpen ? <BiChevronUp /> : <BiChevronDown />}
			</div>
			{isDropDownOpen && (
				<div>
					<input
						type="text"
						placeholder="search"
						value={searchValue}
						onChange={(e) => searchHandler(e.target.value)}
					></input>
					<ul>
						{searchOptions.map((name, index) => (
							<li
								className="option"
								tabIndex={0}
								key={index}
							>
								{name}
							</li>
						))}
						<li></li>
					</ul>
				</div>
			)}
		</div>
	): (
        <>
            {props.addresses[0]}
        </>
    )};

export default Selector