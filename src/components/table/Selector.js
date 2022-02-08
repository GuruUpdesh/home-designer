import React, { useState } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const Selector = (props) => {
	const [selected, setSelected] = useState(props.addresses[0]);
	function updateSelected(value) {
		if (selected === value) {
			setSelected(props.addresses[0]);
			return;
		}
		setSelected(value);
	}

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
	return props.editable ? (
		<div
			className={isDropDownOpen ? "dropDown active" : "dropDown"}
			tabIndex={0}
		>
			<div className="selector" onClick={toggleDropDown}>
				{selected}
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
								className={
									name === selected
										? "selected option"
										: "option"
								}
								tabIndex={0}
								onClick={() => {
									updateSelected(name);
								}}
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
	) : (
		<div
			className={isDropDownOpen ? "dropDown active" : "dropDown"}
			tabIndex={0}
		>
			<div className="selector" onClick={toggleDropDown}>
				{selected}
				{isDropDownOpen ? <BiChevronUp /> : <BiChevronDown />}
			</div>
			{isDropDownOpen && (
				<div>
					<ul>
						{searchOptions.map((name, index) => (
							<li
								className={
									name === selected
										? "selected option"
										: "option"
								}
								tabIndex={0}
								onClick={() => {
									updateSelected(name);
								}}
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
	);
};

export default Selector;
