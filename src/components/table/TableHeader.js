import React, { useState, useRef, useEffect } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { HiPlus, HiFilter } from "react-icons/hi";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Status from "./tableRowComponents/Status";
import CountUp from 'react-countup';

const TableHeader = (props) => {
	// search by drop down functionality
	const [isSearchOptionsOpen, setIsSearchOptionsOpen] = useState(false);
	function closeFilter() {
		setIsSearchOptionsOpen(false);
	}
	function toggleFilter() {
		setIsSearchOptionsOpen(!isSearchOptionsOpen);
	}

	const [isFilterOpen, setIsFilterOpen] = useState(false);
	const [filterValue, setFilterValue] = useState({status: "no filter"})
	const count = useRef(0)
	useEffect(() => {
		if (count.current === 1) {
			props.filterRows(filterValue.status)
			setIsFilterOpen(false)
		} else {
			count.current = 1
		}
	}, [filterValue])

	// click outside detection
	const ref = useRef();
	useOnClickOutside(ref, () => closeFilter());

	const filterRef =  useRef()
	useOnClickOutside(filterRef, () => setIsFilterOpen(false))
	return (
		<div className='tableHeader'>
			<div className='tableTitle'>
				<h2>{props.title}</h2>
				{props.loaded ? <p><CountUp duration={.3} start={props.previousLength.current} end={props.length}/></p> : <><img src="load.svg"></img></>}
			</div>
			<div className='search' ref={ref}>
				<input
					className={isSearchOptionsOpen ? "searchDropDownActive" : ""}
					onFocus={closeFilter}
					type='text'
					placeholder={"search by " + props.searchBy}
					value={props.searchValue}
					onChange={(e) => props.searchHandler(e.target.value)}
				/>
				<span onClick={toggleFilter}>
					{isSearchOptionsOpen ? <BiChevronUp /> : <BiChevronDown />}
				</span>
				{isSearchOptionsOpen && (
					<ul>
						{props.attributes.map((attribute, index) => {
							if (props.types[index] !== "checkbox" && props.types[index] !== "id" && props.types[index] !== "date" && props.types[index] !== "status") {
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
							return <></>
						})}
					</ul>
				)}
			</div>
			<div>
				{props.tableFilterStatus && (
					<div className='filterWrapper'>
						<button className='fi' onClick={() => {setIsFilterOpen(!isFilterOpen)}}>
							<HiFilter />
						</button>
						{isFilterOpen && (
							<div className='filterContainer' ref={filterRef}>
								<span>filter by</span>
								<Status status={filterValue.status} edit={true} values={filterValue} setValues={setFilterValue} filter={true}/>
							</div>
						)}
					</div>
				)}
				<button onClick={props.openNew}>
					<HiPlus />
				</button>
			</div>
		</div>
	);
};

export default TableHeader;
