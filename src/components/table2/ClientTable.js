import React, { useState } from "react";
import TableHeader from "./TableHeader";
import NewPopUp from "./New/NewPopUp";
import TableRow from "./TableRow";
import { BiSort } from "react-icons/bi";

const ClientTable = (props) => {
	// search is initially set to all the data and then filtered depending on search value
	// the table is always displaying the content of searchData never tableContent
	const [clientTableSearchData, setClientTableSearchData] = useState(
		props.tableContent.tableData
	);
	const [searchValue, setSearchValue] = useState("");
	const [searchBy, setSearchBy] = useState(
		Object.keys(props.tableContent.tableData[0])[0]
	);
	const [sortBy, setSortBy] = useState(-1);
	const [unsorted, setUnsorted] = useState(clientTableSearchData);

	function handleSort(index) {
		if (index !== sortBy) {
			setSortBy(index);
			const copy = [...clientTableSearchData];
			const sortProp = Object.keys(props.tableContent.tableData[0])[
				index
			];
			copy.sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : -1));
			// console.log()
			setClientTableSearchData(copy);
		} else {
			setSortBy(-1);
			setClientTableSearchData(unsorted);
		}
	}

	// new popup functionality
	const [isNewOpen, setIsNewOpen] = useState(false);
	function openNew() {
		console.log("opened new");
		cancelDeletePrompt();
		cancelEdit();
		setIsNewOpen(true);
	}
	function closeNew() {
		console.log("closed new");

		setIsNewOpen(false);
	}

	// delete functionality
	const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
	function promptDelete(index) {
		console.log("delete prompt:", index);

		cancelEdit();
		setIsDeletePromptOpen(index);
	}
	function cancelDeletePrompt() {
		console.log("cancelled delete prompt");

		setIsDeletePromptOpen(false);
	}

	// edit functionality
	const [editable, setEditable] = useState(false);

	function edit(index) {
		console.log("edit prompt: ", index);

		cancelDeletePrompt();
		setEditable(index);
	}

	function cancelEdit() {
		console.log("cancelled edit");

		setEditable(false);
	}

	// function handles search filtering
	function searchHandler(value) {
		// stop all edits and deletes
		if (isDeletePromptOpen !== false) {
			cancelDeletePrompt();
		}
		if (editable !== false) {
			cancelEdit();
		}
		setSortBy(-1);

		setSearchValue(value);
		const result = props.tableContent.tableData.filter((object) => {
			return (
				object[searchBy]
					.toString()
					.toLowerCase()
					.indexOf(value.toLowerCase()) > -1
			);
		});

		setClientTableSearchData(result);
		setUnsorted(result);
	}

	return (
		<div className="tableContainer">
			<TableHeader
				title={props.tableContent.title}
				length={clientTableSearchData.length}
				searchValue={searchValue}
				searchHandler={searchHandler}
				openNew={openNew}
				attributes={props.tableContent.tableAttributes}
				tableDataAttributes={Object.keys(
					props.tableContent.tableData[0]
				)}
				searchBy={searchBy}
				setSearchBy={setSearchBy}
			/>
			<div className="tableWrapper">
				<table>
					<thead>
						<tr>
							{props.tableContent.tableAttributes.map(
								(attribute, index) => {
									return (
										<th
											key={index}
											className={
												sortBy === index ? "sort" : ""
											}
											onClick={() => {
												handleSort(index);
											}}
										>
											{attribute}
											<BiSort className="icon" />
										</th>
									);
								}
							)}
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{clientTableSearchData.map((data, index) => {
							return (
								<TableRow
									data={[
										{ value: data.name, type: "text" },
										{ value: data.email, type: "text" },
										{ value: data.phone, type: "text" },
										{ value: data.addresses, type: "list" },
									]}
									index={index}
									isDeletePromptOpen={isDeletePromptOpen}
									promptDelete={promptDelete}
									cancelDeletePrompt={cancelDeletePrompt}
									editable={editable}
									edit={edit}
									cancelEdit={cancelEdit}
									key={index}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
			{isNewOpen && (
				<NewPopUp
					entity={"client"}
					closeNew={closeNew}
					data={[
						{ value: Object.keys(props.tableContent.tableData[0])[0], type: "text" },
						{ value: Object.keys(props.tableContent.tableData[0])[1], type: "text" },
						{ value: Object.keys(props.tableContent.tableData[0])[2], type: "text" },
						{ value: Object.keys(props.tableContent.tableData[0])[3], type: "list" },
					]}
				/>
			)}
		</div>
	);
};

export default ClientTable;
