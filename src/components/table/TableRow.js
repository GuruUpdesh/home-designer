import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Checkbox from "./tableRowComponents/Checkbox";
import Selector from "./tableRowComponents/Selector";

const TableRow = (props) => {
	const [values, setValues] = useState({});
	useEffect(() => {
		const temp = {};
		for (let i = 0; i < props.data.length; i++) {
			temp[props.data[i].attribute] = props.data[i].value;
		}
		setValues(temp);
	}, [props.data]);
	const [errors, setErrors] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	function validateEdit() {
		let errors = {};
		for (let i = 0; i < props.data.length; i++) {
			if (props.data[i].type.toLowerCase() === "text") {
				if (!values[Object.keys(values)[i]]) {
					errors[Object.keys(values)[i]] = true;
				}
			}
		}
		return errors
	}

	function handleSubmit() {
		const validation = validateEdit();
		setErrors(validation);
		// alert("edit")
		props.editRow(props.index, values)
	}

	function handleDelete() {
		props.deleteRow(props.index, values.id)
	}

	return props.index !== props.editable ? (
		<tr className={props.index === props.isDeletePromptOpen ? "edit" : ""}>
			{props.data.map((object, index) => {
				if (object.type.toLowerCase() === "text" || object.type.toLowerCase() === "description") {
					return <td key={index}>{object.value}</td>;
				}
				if (object.type.toLowerCase() === "checkbox") {
					return (
						<td key={index}>
							<div className='checkboxContainer'>
								<Checkbox />
							</div>
						</td>
					);
				}
				if (object.type.toLowerCase() === "list") {
					return (
						<td className='list' key={index}>
							<Selector
								default={object.attribute}
								addresses={object.value}
								editable={props.index === props.editable}
							/>
						</td>
					);
				}
				return <td>error</td>;
			})}
			{props.index === props.isDeletePromptOpen ? (
				<>
					<td>
						<button
							className='prompt'
							onClick={() => {
								props.cancelDeletePrompt();
							}}>
							cancel
						</button>
					</td>
					<td>
						<button className='delete' onClick={() => {
							handleDelete()
						}}>delete</button>
					</td>
				</>
			) : (
				<>
					<td>
						<button
							onClick={() => {
								props.edit(props.index);
							}}>
							<MdEdit />
						</button>
					</td>
					<td>
						<button
							onClick={() => {
								props.promptDelete(props.index);
							}}>
							<IoClose />
						</button>
					</td>
				</>
			)}
		</tr>
	) : (
		<tr className='edit'>
			{props.data.map((value, index) => {
				if (value.type.toLowerCase() === "text") {
					return (
						<td key={index}>
							<input
								className="editInput"
								className={errors[value.attribute] ? 'editInput invalid' : 'editInput '}
								type='text'
								value={values[value.attribute]}
								name={value.attribute}
								placeholder={value.attribute}
								autoComplete={"off"}
								onChange={(e) => {
									handleChange(e);
								}}
							/>
						</td>
					);
				}
				if (value.type.toLowerCase() === "description") {
					return (
						<td key={index}>
							<textarea
								className="editInput"
								className={errors[value.attribute] ? 'editInput invalid' : 'editInput '}
								type='text'
								value={values[value.attribute]}
								name={value.attribute}
								placeholder={value.attribute}
								autoComplete={"off"}
								onChange={(e) => {
									handleChange(e);
								}}
							/>
						</td>
					);
				}
				if (value.type.toLowerCase() === "checkbox") {
					return (
						<td key={index}>
							<div className='checkboxContainer'>
								<Checkbox />
							</div>
						</td>
					);
				}
				if (value.type.toLowerCase() === "list") {
					return (
						<td className='list' key={index}>
							<Selector
								default={value.attribute}
								addresses={value.value}
								editable={props.index === props.editable}
							/>
						</td>
					);
				}
				return <td>error</td>;
			})}
			<td>
				<button
					onClick={() => {
						setErrors({})
						props.cancelEdit();
					}}>
					cancel
				</button>
			</td>
			<td>
				<button className='confirm' onClick={handleSubmit}>edit</button>
			</td>
		</tr>
	);
};

export default TableRow;
