import React from "react";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Checkbox from "./tableRowComponents/Checkbox";
import Selector from "./tableRowComponents/Selector";

const TableRow = (props) => {
	return props.index !== props.editable ? (
		<tr className={props.index === props.isDeletePromptOpen ? "edit" : ""}>
			{props.data.map((object, index) => {
				if (object.type.toLowerCase() === "text") {
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
						<button className='delete'>delete</button>
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
							<input className='editInput invalid' type='text' value={value.value} />
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
						props.cancelEdit();
					}}>
					cancel
				</button>
			</td>
			<td>
				<button className='confirm'>edit</button>
			</td>
		</tr>
	);
};

export default TableRow;
