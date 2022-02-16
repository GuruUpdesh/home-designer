import React, { useEffect, useState } from "react";
// import Selector from "../tableRowComponents/Selector";
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
		console.log("VALIDATE")
		let errors = {}

		//require each attribute:
		for (let i = 0; i < props.values.length; i++) {
			if (!values[Object.keys(values)[i]].trim()) {
				errors[Object.keys(values)[i]] = `${Object.keys(values)[i]} is required`
			}
		}

		console.log(errors)
		return errors
	}

	function handleSubmit(e) {
		e.preventDefault()
		const validation = validateNew()
		setErrors(validation)
		if (Object.keys(validation).length === 0) {
			alert("trigger add")
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
									{errors.value && (<p className="formError">{errors.value}</p>)}
								</>
							);
						}
						if (props.types[index] === "list") {
							return (
								<>
									<label>selector</label>
									{/* <Selector /> */}
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
					<button className='confirm' type="submit">confirm</button>
				</form>
			</div>
			<Backdrop onClick={props.closeNew} />
		</>
	);
};

export default NewPopUp;
