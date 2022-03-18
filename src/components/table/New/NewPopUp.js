import React, { useEffect, useState } from "react";
import Selector from "./Selector";
import Backdrop from "./Backdrop";
import useEscape from "../../../hooks/useEscape";

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

	const handleSelector = (name, value, attribute) => {
		setValues({
			...values,
			[attribute]: value,
		});
	};

	function validateNew() {
		let errors = {};

		for (let i = 0; i < props.values.length; i++) {
			const key = Object.keys(values)[i];
			if (props.create[i] !== "none" && !values[key]) {
				errors[key] = `${key} is required`;
			}
			if (props.values[i] === "email" && errors["email"] === undefined) {
				if (!validateEmail(values[key])) {
					errors[key] = "invalid email";
				}
			}
			if (props.values[i] === "phone" && errors["phone"] === undefined) {
				if (!validatePhone(values[key])) {
					errors[key] = "invalid phone number"
				}
			}
			if(props.values[i] === "billing rate" && errors["billing rate"] === undefined) {
				if (values[key] < 0) {
					errors[key] = "billing rate must be positive"
				}
			}
		}
		return errors;
	}

	function validateEmail(email) {
		let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return re.test(email);
	}
	function validatePhone(phone) {
		let re = /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/
		return re.test(phone)
	}

	function handleSubmit(e) {
		e.preventDefault();
		const validation = validateNew();
		setErrors(validation);
		if (Object.keys(validation).length === 0) {
			props.addRow(values);
			props.closeNew();
		}
	}

	useEscape(() => props.closeNew())
	return (
		<>
			<div className='newContainer'>
				<form className='newContentWrapper' onSubmit={handleSubmit}>
					<h1>new {props.entity}</h1>
					{props.values.map((value, index) => {
						if (props.create[index] === "text") {
							return (
								<>
									{errors[value] && (
										<p className='formError'>
											{errors[value]}
										</p>
									)}
									<div className='inputContainer'>
										<input
											className={errors[value] ? "inputError" : ""}
											name={value}
											type={value === "billing rate" ? "number" : 'text'}
											autoComplete={"off"}
											onChange={(e) => {
												handleChange(e);
											}}
										/>
										<span
											className={
												values[value]
													? "fixedLabel floatingLabel"
													: "floatingLabel"
											}>
											{value}
										</span>
									</div>
								</>
							);
						}
						if (props.create[index] === "select") {
							return (
								<>
									{errors[value] && (
										<p className='formError'>
											{errors[value]}
										</p>
									)}
									<div>
										<Selector
											value={value}
											handleSelector={(name, value) =>
												handleSelector(name, value, props.values[index])
											}
										/>
									</div>
								</>
							);
						}
						if (props.create[index] === "textArea") {
							return (
								<>
									{errors[value] && (
										<p className='formError'>
											{errors[value]}
										</p>
									)}
									<textarea
										className={errors[value] ? "inputError" : ""}
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
						}} type="button">
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
