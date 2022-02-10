import React, { useState } from "react";
import TableHeader from "./TableHeader";
import NewPopUp from "./New/NewPopUp";
import TableRow from "./TableRow";

const EmployeeTable = (props) => {
	// search is initially set to all the data and then filtered depending on search value
	// the table is always displaying the content of searchData never tableContent
	const [clientTableSearchData, setClientTableSearchData] = useState(
		props.tableContent.tableData
	);
	const [searchValue, setSearchValue] = useState("");

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

        cancelEdit()
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

        cancelDeletePrompt()
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

		setSearchValue(value);
		const totalSearchResult = [];
		for (let i = 0; i < Object.keys(props.tableContent.tableData[0]).length; i++) {
			const result = props.tableContent.tableData.filter((object) => {
				return (
					object[Object.keys(props.tableContent.tableData[0])[i]]
						.toString()
						.toLowerCase()
						.indexOf(value.toLowerCase()) > -1
				);
			});
			for (let n = 0; n < result.length; n++) {
				totalSearchResult.indexOf(result[n]) === -1
					? totalSearchResult.push(result[n])
					: console.log();
			}
		}
		setClientTableSearchData(totalSearchResult);
	}

	return (
		<div className="tableContainer">
			<TableHeader
				title={props.tableContent.title}
				length={clientTableSearchData.length}
				searchValue={searchValue}
				searchHandler={searchHandler}
				openNew={openNew}
			/>
			<div className="tableWrapper">
				<table>
					<thead>
						<tr>
							{props.tableContent.tableAttributes.map(
								(attribute, index) => {
									return <th key={index}>{attribute}</th>;
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
										{ value: data.billingRate, type: "text" },
                                        
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
			{isNewOpen && <NewPopUp closeNew={closeNew} />}
		</div>
	);
};

export default EmployeeTable;