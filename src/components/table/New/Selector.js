import React, { useEffect, useState, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";

const Selector = (props) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const [selected, setSelected] = useState(props.value);
	const [options, setOptions] = useState([]);

	function toggleDropDown() {
		setIsDropDownOpen(!isDropDownOpen);
	}

	useEffect(() => {
		console.log(options);
	}, [options]);

	function handleSelect(name, id) {
        if (name === selected) {
            setSelected(props.value)
			props.handleSelector(props.value, id)
        } else {
            setSelected(name);
			props.handleSelector(props.value, id)
        }
	}

	useEffect(() => {
		console.log(props);
		getRelationship();
	}, []);

	const getRelationship = async () => {
		await fetch("http://localhost:5392/api/one", {
			method: "POST",
			body: JSON.stringify({
				table: props.value,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setOptions(data);
				});
			}
		});
	};


	return (
		<div className={isDropDownOpen ? "selector activeSelector" : "selector"}>
			<div onClick={toggleDropDown} className='main'>
				{selected}
                {isDropDownOpen ? <BiChevronUp /> : <BiChevronDown/>}
				
			</div>
			{isDropDownOpen && (
				<>
					<ul>
						{options.map((option, index) => {
							return (
								<li
									className={selected === option.name ? "selected" : ""}
									onClick={() => handleSelect(option.name, option.id)}
									key={index}>
									{option.name}
									<span>{option.id}</span>
								</li>
							);
						})}
						{/* <li>{props.value}</li>
                    <li>test 2</li> */}
					</ul>
					<div className='spacer'></div>
				</>
			)}
		</div>
		// <div>{props.value}</div>
	);
};

export default Selector;
