import React, { useEffect, useState } from "react";
import Selector from "./Selector";
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

	const handleSelector = (name, value) => {
		setValues({
			...values,
			[name]: value,
		})
	}

	function validateNew() {
		let errors = {};

		for (let i = 0; i < props.values.length; i++) {
			const key = Object.keys(values)[i]
			if (props.create[i] !== "none" && !values[key]) {
				errors[key] = `${key} is required`
			}
		}

		console.log(errors)
		return errors;
	}

	function handleSubmit(e) {
		e.preventDefault();
		console.log(values)
		const validation = validateNew();
		setErrors(validation);
		if ((Object.keys(validation).length) == 0) {
			props.addRow(values)
			props.closeNew()
		}
	}
	return (
		<>
			<div className='newContainer'>
				<form className='newContentWrapper' onSubmit={handleSubmit}>
					<h1>new {props.entity}</h1>
					{props.values.map((value, index) => {
						if (props.create[index] === "text") {
							return (
								<div key={index}>
									{errors[value] && <p className='formError'>{errors[value]}</p>}
									<input
									 	className={errors[value] ? "inputError" : ""}
										name={value}
										value={values.value}
										placeholder={value}
										autoComplete={"off"}
										onChange={(e) => {
											handleChange(e);
										}}
									/>
								</div>
							);
						}
						if (props.create[index] === "select") {
							return (
								<div key={index}>
									{errors[value] && <p className='formError'>{errors[value]}</p>}
									{/* <input
									 	className={errors[value] ? "inputError" : ""}
										name={value}
										value={values.value}
										placeholder={value}
										autoComplete={"off"}
										onChange={(e) => {
											handleChange(e);
										}}
									/> */}
									<Selector 
										value = {value}
										values = {values}
										handleSelector={handleSelector}
									/>
								</div>
							);
						}
						if (props.create[index] === "textArea") {
							return (
								<>
									{errors[value] && <p className='formError'>{errors[value]}</p>}
									<textarea
										className={errors[value] ? "inputError" : ""}
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
