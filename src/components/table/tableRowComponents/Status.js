import React, { useState, useEffect, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const Status = ({ status, edit, values, setValues, filter }) => {
	const [options, setOptions] = useState([]);
	const [currentStatus, setCurrentStatus] = useState({});

	useEffect(() => {
		if (status === "complete") {
			setCurrentStatus({ name: status, class: "green" });
		} else if (status === "in progress") {
			setCurrentStatus({ name: status, class: "orange" });
		} else if (status === "not started") {
			setCurrentStatus({ name: status, class: "grey" });
		} else if (status === "no filter") {
			setCurrentStatus({ name: "no filter", class: "white" });
		} else {
			setCurrentStatus({ name: "error", class: "" });
		}
	}, [status]);

	useEffect(() => {
		let list;
		if (!filter) {
			list = [
				{ name: "not started", class: "grey" },
				{ name: "in progress", class: "orange" },
				{ name: "complete", class: "green" },
			];
		} else {
			list = [
				{ name: "no filter", class: "white" },
				{ name: "not started", class: "grey" },
				{ name: "in progress", class: "orange" },
				{ name: "complete", class: "green" },
			];
		}
		list = list.filter((object) => {
			return object.name !== currentStatus.name;
		});
		setOptions(list);
	}, [currentStatus]);

	const [isDropDownActive, setIsDropDownActive] = useState(false);
	function toggleDropDown() {
		setIsDropDownActive(!isDropDownActive);
	}

	const ref = useRef();
	useOnClickOutside(ref, () => setIsDropDownActive(false));
	return (
		<ul
			className={
				edit
					? isDropDownActive
						? "status editableStatus activeStatus"
						: "status editableStatus"
					: "status"
			}
			ref={ref}>
			{edit ? (
				<>
					<li onClick={toggleDropDown} className={currentStatus.class}>
						{currentStatus.name}
						{isDropDownActive ? <BiChevronUp /> : <BiChevronDown />}
					</li>
					{isDropDownActive && (
						<>
							{options.map((object, index) => {
								return (
									<li
										className={object.class + " option"}
										key={index}
										onClick={() => {
											setCurrentStatus({
												name: object.name,
												class: object.class,
											});

											setValues({
												...values,
												status: object.name
											})
											setIsDropDownActive(false);
										}}>
										{object.name}
									</li>
								);
							})}
						</>
					)}
				</>
			) : (
				<li
					className={
						status === "not started"
							? "grey"
							: status === "in progress"
							? "orange"
							: status === "complete"
							? "green"
							: "error"
					}>
					{status}
				</li>
			)}
		</ul>
	);
};

export default Status;
