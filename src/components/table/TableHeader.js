import React, { useState, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import {HiPlus} from "react-icons/hi"
import useOnClickOutside from "../../hooks/useOnClickOutside";

const TableHeader = (props) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false);
	function closeFilter() {
		setIsFilterOpen(false);
	}
	function toggleFilter() {
		setIsFilterOpen(!isFilterOpen);
	}
	const ref = useRef();
	useOnClickOutside(ref, () => closeFilter());
	return (
		<div className='tableHeader'>
			<div className='tableTitle'>
				<h2>{props.title}</h2>
				<p>{props.length}</p>
			</div>
			<div className='search' ref={ref}>
				<input
					className={isFilterOpen ? "searchDropDownActive" : ""}
					onFocus={closeFilter}
					type='text'
					placeholder={"search by " + props.searchBy}
					value={props.searchValue}
					onChange={(e) => props.searchHandler(e.target.value)}
				/>
				<span onClick={toggleFilter}>
					{isFilterOpen ? <BiChevronUp /> : <BiChevronDown />}
				</span>
				{isFilterOpen && (
					<ul>
						{props.attributes.map((attribute, index) => {
							if (props.types[index] !== "checkbox" && props.types[index] !== "id") {
								return (
									<li key={index}>
										<button
											onClick={() => {
												props.setSearchBy(props.tableDataAttributes[index]);
												closeFilter();
											}}>
											{attribute}
										</button>
									</li>
								);
							}
						})}
					</ul>
				)}
			</div>
			<button onClick={props.openNew}><HiPlus /></button>
		</div>
	);
};

export default TableHeader;
