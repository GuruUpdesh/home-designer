import React, { useEffect, useState, useRef } from "react";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import useEscape from "../../hooks/useEscape";
import List from "./tableRowComponents/List";
import Status from "./tableRowComponents/Status";
import Selector from "./New/Selector";
import DateInput from "./tableRowComponents/Date";

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

	useEffect(() => {
		console.log("rerender")
	}, [values])

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({
			...values,
			[name]: value,
		});
	};

	const handleDateChange = (value, attribute) => {
		setValues({
			...values,
			[attribute]: value,
		});
	};

	const handleSelector = (name, id, attribute) => {
		setValues({
			...values,
			[attribute]: { name: name, id: id },
		});
	};

	function validateEdit() {
		let errors = {};
		for (let i = 0; i < props.data.length; i++) {
			if (
				props.data[i].type.toLowerCase() === "text" ||
				props.data[i].type.toLowerCase() === "description"
			) {
				if (!values[Object.keys(values)[i]]) {
					errors[Object.keys(values)[i]] = true;
				}
			}
		}
		return errors;
	}

	function parseDates(inputDate) {
		let date = new Date(inputDate),
			month = ("0" + (date.getMonth() + 1)).slice(-2),
			day = ("0" + date.getDate()).slice(-2);
		return [month, day, date.getFullYear()].join("/");
	}

	function handleSubmit() {
		const validation = validateEdit();
		setErrors(validation);
		if (Object.keys(validation).length === 0) {
			props.editRow(props.index, values);
		}
	}

	function handleDelete() {
		props.deleteRow(props.index, values.id);
	}

	const editable = useRef(props.editable);
	useEffect(() => {
		editable.current = props.editable;
	}, [props.editable]);

	useEscape(() => {
		if (props.index === editable.current) {
			props.cancelEdit();
		}
		props.cancelDeletePrompt();
	});

	return props.index !== props.editable ? (
		<tr
			className={props.index === props.isDeletePromptOpen ? "edit" : ""}
			onContextMenu={() => {
				const copy = {...props.contextFunctions.current};
				copy.edit[0] = props.edit
				copy.edit[1] = props.index
				copy.delete[0] = props.promptDelete
				copy.delete[1] = props.index
				props.contextFunctions.current = copy
			}}>
			{props.data.map((object, index) => {
				if (
					object.type.toLowerCase() === "text" ||
					object.type.toLowerCase() === "description" ||
					object.type.toLowerCase() === "select"
				) {
					if (object.value) {
						if (object.attribute === "billing rate") {
							return (
								<td key={index}>
									<span className='dollar'>$</span>
									{object.value}
									<span className='dollar rate'>/hr</span>
								</td>
							);
						}
						return <td key={index}>{object.value}</td>;
					}
					return (
						<td key={index} className='null'>
							null
						</td>
					);
				}
				if (object.type.toLowerCase() === "date") {
					if (object.value) {
						return <td key={index}>{parseDates(object.value)}</td>;
					}
					return (
						<td key={index} className='null'>
							null
						</td>
					);
				}
				if (object.type.toLowerCase() === "status") {
					return (
						<td key={index}>
							<Status
								status={object.value}
								edit={false}
								values={values}
								setValues={setValues}
							/>
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
				return <td key={index}>error</td>;
			})}
			{props.index === props.isDeletePromptOpen ? (
				<>
					<td className='btn'>
						<button
							className='confirm'
							onClick={() => {
								props.cancelDeletePrompt();
							}}>
							cancel
						</button>
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
					<td className='btn'>
						<button
							className=' arrow-span-label'
							onClick={() => {
								props.edit(props.index);
							}}>
							<MdEdit />
							<span>edit</span>
						</button>
						<button
							className=' arrow-span-label'
							onClick={() => {
								props.promptDelete(props.index);
							}}>
							<IoClose />
							<span>delete</span>
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
						<td key={index} className='editingInput'>
							<input
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
								tabIndex={0}
							/>
						</td>
					);
				}
				if (value.type.toLowerCase() === "date") {
					let date = new Date(values[value.attribute]);
					return (
						<td
							key={index}
							className={errors[value.attribute] ? "editDate invalid" : "editDate "}
							tabIndex={0}>
							<DateInput
								inputDate={date}
								handleDateChange={handleDateChange}
								attribute={value.attribute}
								isNull={values[value.attribute]}
							/>
						</td>
					);
				}
				if (value.type.toLowerCase() === "select") {
					return (
						<td
							key={index}
							className={
								errors[value.attribute] ? "editSelector invalid" : "editSelector"
							}
							tabIndex={0}>
							<Selector
								value={value.attribute}
								handleSelector={(name, id) => {
									handleSelector(name, id, value.attribute);
								}}
								default={values[value.attribute]}
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
						<td
							key={index}
							className={
								errors[value.attribute] ? "editSelector invalid" : "editSelector"
							}
							tabIndex={0}>
							<Status
								status={values[value.attribute]}
								edit={true}
								values={values}
								setValues={setValues}
							/>
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
				return <td key={index}>error</td>;
			})}
			<td className='btn'>
				<button
					onClick={() => {
						setErrors({});
						props.cancelEdit();
					}}
					className='cancel'>
					cancel
				</button>
				<button className='confirm' onClick={handleSubmit}>
					save
				</button>
			</td>
		</tr>
	);
};

export default TableRow;
