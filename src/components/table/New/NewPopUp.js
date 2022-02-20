import React, { useEffect, useState } from "react";
import Selector from "../tableRowComponents/Selector";
import Backdrop from "./Backdrop";

const NewPopUp = (props) => {
	const [values, setValues] = useState({});
	useEffect(() => {
		const temp = {};
		for (let i = 0; i < props.values.length; i++) {
			temp[props.values[i]] = "";
		}
		setValues(temp);
	}, []);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	function validateNew() {
		let errors = {};

		for (let i = 0; i < props.values.length; i++) {
			if (!values[Object.keys(values)[i]].trim()) {
				errors[Object.keys(values)[i]] = `${Object.keys(values)[i]} is required`;
			}
		}

		return errors;
	}

	function handleSubmit(e) {
		e.preventDefault();
		const validation = validateNew();
		setErrors(validation);
		if (Object.keys(validation).length === 0) {
			alert("trigger add");
		}
	}
	return (
		<>
			<div className='newContainer'>
				<form className='newContentWrapper' onSubmit={handleSubmit}>
					<h1>new {props.entity}</h1>
					{props.values.map((value, index) => {
						if (props.types[index] === "text") {
							return (
								<>
									{errors[value] && <p className='formError'>{errors[value]}</p>}
									<input
										key={index}
										name={value}
										value={values.value}
										placeholder={value}
										autoComplete={"off"}
										onChange={(e) => {
											handleChange(e);
										}}
									/>
								</>
							);
						}
						if (props.types[index] === "description") {
							return (
								<>
									{errors[value] && <p className='formError'>{errors[value]}</p>}
									<textarea
										key={index}
										name={value}
										value={values.value}
										placeholder={value}
										autoComplete={"off"}
										onChange={(e) => {
											handleChange(e);
										}}
									/>
								</>
							);
						}
						if (props.types[index] === "list") {
							return (
								<>
									{errors[value] && <p className='formError'>{errors[value]}</p>}
									{/* <label>selector</label> */}
									<Selector key={index}
										default={value}
										addresses={["4 B Blue Ridge Blvd, Brighton, MI", "8 W Cerritos Ave #54, Bridgeport, NJ", "7 W Jackson Blvd, San Jose, CA", "3 Mcauley Dr, Ashland, OH", "228 Runamuck Pl #2808, Baltimore, MD", "2371 Jerrold Ave, Kulpsville, PA"]}
										editable={true}
									/>
								</>
							);
						}
						return <></>;
					})}
					<button
						onClick={() => {
							props.closeNew();
						}}>
						cancel
					</button>
					<button className='confirm' type='submit'>
						confirm
					</button>
				</form>
			</div>
			<Backdrop onClick={props.closeNew} />
		</>
	);
};

export default NewPopUp;
