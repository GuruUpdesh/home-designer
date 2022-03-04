import React, { useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import useEscape from "../../hooks/useEscape";
import Checkbox from "./tableRowComponents/Checkbox";
import List from "./tableRowComponents/List";
import Status from "./tableRowComponents/Status";

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
		return {};
	}

	function handleSubmit() {
		// const validation = validateEdit();
		// setErrors(validation);
		// if (Object.keys(validation).length === 0) {
		// }
		props.editRow(props.index, values);
	}

	function handleDelete() {
		props.deleteRow(props.index, values.id);
	}

	const editable = useRef(props.editable);
	useEffect(() => {
		editable.current = props.editable;
	}, [props.editable]);

	useEscape(() => {
		console.log();
		if (props.index === editable.current) {
			props.cancelEdit();
		}
		props.cancelDeletePrompt();
	});

	return props.index !== props.editable ? (
		<tr className={props.index === props.isDeletePromptOpen ? "edit" : ""}>
			{props.data.map((object, index) => {
				if (
					object.type.toLowerCase() === "text" ||
					object.type.toLowerCase() === "description"
				) {
					if (object.value) {
						if (object.attribute === "billing rate") {
							return <td key={index}><span className="null">$</span>{object.value}<span className="null">/hr</span></td>;
						}
						return <td key={index}>{object.value}</td>;
					}
					return <td key={index} className="null">null</td>
				}
				if (object.type.toLowerCase() === "status") {
					return (
						<td key={index}>
							<Status status={object.value} edit={false}/>
						</td>
					);
				}
				if (object.type.toLowerCase() === "list") {
					return (
						<td className='list' key={index}>
							<List
								default={object.attribute}
								addresses={object.value}
								editable={props.index === props.editable}
							/>
						</td>
					);
				}

				if (object.type.toLowerCase() === "id") {
					return <td key={index}>{object.value}</td>;
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
						<button
							className='delete'
							onClick={() => {
								handleDelete();
							}}>
							delete
						</button>
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
								className='editInput'
								className={
									errors[value.attribute] ? "editInput invalid" : "editInput "
								}
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

				if (value.type.toLowerCase() === "id") {
					return <td key={index}>{values[value.attribute]}</td>;
				}
				if (value.type.toLowerCase() === "description") {
					return (
						<td key={index}>
							<textarea
								className='editInput'
								className={
									errors[value.attribute] ? "editInput invalid" : "editInput "
								}
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
				if (value.type.toLowerCase() === "status") {
					return (
						<td key={index}>
							<Status status={values[value.attribute]} edit={true}/>
						</td>
					);
				}
				if (value.type.toLowerCase() === "list") {
					return (
						<td className='list' key={index}>
							<List
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
						setErrors({});
						props.cancelEdit();
					}}>
					cancel
				</button>
			</td>
			<td>
				<button className='confirm' onClick={handleSubmit}>
					edit
				</button>
			</td>
		</tr>
	);
};

export default TableRow;
