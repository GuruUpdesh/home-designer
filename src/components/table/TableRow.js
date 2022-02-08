import React, { useState } from "react";
import { IoClose } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import Selector from "./Selector";

const TableRow = (props) => {
	const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);

	const [dataValues, setDataValues] = useState(props.textData);

	function deletePrompt() {
		setIsDeletePromptOpen(true);
	}

	function cancelDeletePrompt() {
		setIsDeletePromptOpen(false);
	}
	return props.index !== props.editable ? (
		<tr>
			{props.textData.map((data, index) => {
				return (
					<td index={index} key={index}>
						{data}
					</td>
				);
			})}
			{props.booleanData.map((data, index) => {
				return (
					<td index={index} key={index}>
						<input className="checkbox" type="checkbox" />
					</td>
				);
			})}
			{props.relationshipData.map((data, index) => {
				return (
					<td key={index}>
						<Selector addresses={data} />
					</td>
				);
			})}
			{isDeletePromptOpen ? (
				<>
					<td>
						<button className="prompt" onClick={cancelDeletePrompt}>
							cancel
						</button>
					</td>
					<td>
						<button className="delete">delete</button>
					</td>
				</>
			) : (
				<>
					<td>
						<button
							onClick={() => {
								console.log(`clicked edit ${props.index}`);
								props.edit(props.index);
							}}
						>
							<MdEdit />
						</button>
					</td>
					<td>
						<button onClick={deletePrompt}>
							<IoClose />
						</button>
					</td>
				</>
			)}
		</tr>
	) : (
		<tr className="edit">
			{props.textData.map((data, index) => {
				return (
					<td index={index} key={index}>
						<input
							className="editInput"
							type="text"
							value={dataValues[index]}
							onChange={(e) => {
								let temp = [...dataValues];
								temp[index] = e.target.value;
								setDataValues(temp);
							}}
						/>
					</td>
				);
			})}
			{props.booleanData.map((data, index) => {
				return (
					<td index={index} key={index}>
						<input className="checkbox" type="checkbox" />
					</td>
				);
			})}
			{props.relationshipData.map((data, index) => {
				return (
					<td key={index}>
						<Selector
							addresses={props.addresses}
							editable={props.index === props.editable}
						/>
					</td>
				);
			})}
			<td>
				<button
					onClick={() => {
						props.cancelEdit();
					}}
				>
					cancel
				</button>
			</td>
			<td>
				<button className="confirm">edit</button>
			</td>
		</tr>
	);
};
// 	const [editable, setEditable] = useState(false);

// 	function edit() {
// 		setEditable(true);
// 	}

// 	function cancelEdit() {
// 		setEditable(false);
// 	}

// 	const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);

// 	function deletePrompt() {
// 		setIsDeletePromptOpen(true);
// 	}

// 	function cancelDeletePrompt() {
// 		setIsDeletePromptOpen(false);
// 	}

//     function cancelAll() {
//         cancelDeletePrompt()
//         cancelEdit()
//     }

// 	return !editable ? (
// 		<tr>
// 			<td className="clientName" onDoubleClick={edit}>{props.name}</td>
// 			<td onDoubleClick={edit}>{props.email}</td>
// 			<td onDoubleClick={edit}>{props.phone}</td>
//             <td><Selector addresses={props.addresses} editable={editable}/></td>
// 			{isDeletePromptOpen ? (
// 				<>
// 					<td>
// 						<button onClick={cancelDeletePrompt} className="prompt">cancel</button>
// 					</td>
// 					<td>
// 						<button className="delete">confirm delete</button>
// 					</td>
// 				</>
// 			) : (
// 				<>
// 					<td>
// 						<button onClick={edit}>
// 							<MdEdit />
// 						</button>
// 					</td>
// 					<td>
// 						<button onClick={deletePrompt}>
// 							<IoClose />
// 						</button>
// 					</td>
// 				</>
// 			)}
// 		</tr>
// 	) : (
// 		<tr className="edit">
// 			<td>
// 				<input className="editInput" type="text" value={props.name} />
// 			</td>
// 			<td>
// 				<input className="editInput" type="text" value={props.email} />
// 			</td>
// 			<td>
// 				<input className="editInput" type="text" value={props.phone} />
// 			</td>
// 			<td><Selector addresses={props.addresses} editable={editable}/></td>
// 			<td>
// 				<button onClick={cancelEdit}>cancel</button>
// 			</td>
// 			<td>
// 				<button className="confirm">confirm edit</button>
// 			</td>
// 		</tr>
// 	);
// };

export default TableRow;
