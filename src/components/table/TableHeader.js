import React, { useState, useRef, useEffect } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import { HiPlus, HiFilter } from "react-icons/hi";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import Status from "./tableRowComponents/Status";
import CountUp from "react-countup";

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
	const [filterValue, setFilterValue] = useState({ status: "no filter" });
	const count = useRef(0);
	useEffect(() => {
		if (count.current === 1) {
			props.filterRows(filterValue.status);
			setIsFilterOpen(false);
		} else {
			count.current = 1;
		}
	}, [filterValue]);

	// click outside detection
	const ref = useRef();
	useOnClickOutside(ref, () => closeFilter());

	const filterRef = useRef();
	useOnClickOutside(filterRef, () => setIsFilterOpen(false));

	// sticky detection
	const [isSticky, setIsSticky] = useState(false);
	const stickyRef = useRef();
	useEffect(() => {
		const cachedRef = stickyRef.current,
			observer = new IntersectionObserver(([e]) => setIsSticky(e.intersectionRatio < 1), {
				threshold: [1],
				// rootMargin: '-1px 0px 0px 0px',  // alternativly, use this and set `top:0` in the CSS
			});

		observer.observe(cachedRef);

		// unmount
		return function () {
			observer.unobserve(cachedRef);
		};
	}, []);
	return (
		<div
			className={
				"tableHeader flex-space-between " +
				(props.loaded ? "" : "loadingHeader") +
				(isSticky ? "sticky" : "")
			}
			ref={stickyRef}>
			<div className='tableTitle'>
				<h2>{props.title}</h2>
				{props.loaded ? (
					<p className='br-20 arrow-span-label-exception'>
						<CountUp
							duration={0.3}
							start={props.previousLength.current}
							end={props.length}
						/>
						<span>rows count</span>
					</p>
				) : (
					<p className='br-20'>
						<img src={process.env.PUBLIC_URL + "/load.svg"}></img>
					</p>
				)}
				{/* {props.loaded ? <p className="br-20"><CountUp duration={.3} start={props.previousLength.current} end={props.length}/></p> : <><img src={process.env.PUBLIC_URL + "/load.svg"}></img></>} */}
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
							if (
								props.types[index] !== "checkbox" &&
								props.types[index] !== "id" &&
								props.types[index] !== "date" &&
								props.types[index] !== "status"
							) {
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
							return <></>;
						})}
					</ul>
				)}
			</div>
			<div className='headerButtons'>
				{props.tableFilterStatus && (
					<div className='filterWrapper' ref={filterRef}>
						<button
							className='fi arrow-span-label'
							onClick={() => {
								setIsFilterOpen(!isFilterOpen);
							}}>
							<HiFilter />
							<span>filter {props.title}</span>
						</button>
						{isFilterOpen && (
							<div className='filterContainer'>
								<span>filter by</span>
								<Status
									status={filterValue.status}
									edit={true}
									values={filterValue}
									setValues={setFilterValue}
									filter={true}
								/>
							</div>
						)}
					</div>
				)}
				<button onClick={props.openNew} className='arrow-span-label'>
					<HiPlus />
					<span>
						add {props.title === "Addresses" ? "address" : props.title.slice(0, -1)}
					</span>
				</button>
			</div>
		</div>
	);
};

export default TableHeader;
