import React, { useEffect, useState, useRef } from "react";
import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import useOnClickOutside from "../../../hooks/useOnClickOutside";

const Selector = (props) => {
	const [isDropDownOpen, setIsDropDownOpen] = useState(false);

	const [selected, setSelected] = useState(props.value);
	const [options, setOptions] = useState([]);

	function toggleDropDown() {
		setIsDropDownOpen(!isDropDownOpen);
	}

	function handleSelect(name, id) {
        if (name === selected) {
            setSelected(props.value)
			props.handleSelector(props.value, id)
        } else {
			setSelected(name);
			props.handleSelector(name, id)
			setIsDropDownOpen(false)
        }
	}

	useEffect(() => {
		getRelationship();

		console.log(props.default)
		if (props.default) {
			setSelected(props.default)
		}

		if (props.value === "address" && props.default === undefined) {
			setSelected("Null")
		}
	}, []);

	const getRelationship = async () => {
		await fetch(`${process.env.REACT_APP_API_URL}/one`, {
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

	const ref = useRef();
	useOnClickOutside(ref, () => setIsDropDownOpen(false));

	return (
		<div ref={ref} className={isDropDownOpen ? "selector activeSelector" : "selector"} >
			<div onClick={toggleDropDown} className='main'>
				{selected}
                {isDropDownOpen ? <BiChevronUp /> : <BiChevronDown/>}
				
			</div>
			{isDropDownOpen && (
				<div className="selectorContent">
					<ul>
						{props.value === "address" && <li className={selected === "Null" || !selected ? "selected" : ""} onClick={() => handleSelect("Null", -1)}>Null</li>}
						{options.map((option, index) => {
							return (
								<li
									className={selected === option.name ? "selected" : ""}
									onClick={() => handleSelect(option.name, option.id)}
									key={index}>
									{option.name}
								</li>
							);
						})}
					</ul>
					<div className='spacer'></div>
				</div>
			)}
		</div>
	);
};

export default Selector;
