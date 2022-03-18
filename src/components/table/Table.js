import React, { useState, useEffect, useRef } from "react";
import TableHeader from "./TableHeader";
import NewPopUp from "./New/NewPopUp";
import TableRow from "./TableRow";
import { BiSort } from "react-icons/bi";

const Table = ({ title, entity, template, tableData, addRow, editRow, deleteRow, tableFilterStatus, filterRows, loaded }) => {
	// search is initially set to all the data and then filtered depending on search value
	// the table is always displaying the content of searchData never tableContent
	const [tableSearchData, setTableSearchData] = useState(tableData);
	const [searchValue, setSearchValue] = useState("");

	// search by is the attribute that is being compared in search
	const [searchBy, setSearchBy] = useState(template.dataKeys[1]);

	const prevCount = useRef(0)
	// function handles search filtering
	function searchHandler(value) {
		// stop all edits and deletes
		if (isDeletePromptOpen !== false) {
			cancelDeletePrompt();
		}
		if (editable !== false) {
			cancelEdit();
		}

		prevCount.current = tableSearchData.length
		setSearchValue(value);

		// filters the raw data based off the search attribute
		const result = tableData.filter((object) => {
			return object[searchBy].toString().toLowerCase().indexOf(value.toLowerCase()) > -1;
		});

		// updates search results and stores result in unsorted since we removed sorting
		setTableSearchData(result);
	}

	// new popup functionality
	const [isNewOpen, setIsNewOpen] = useState(false);
	function openNew() {
		//stop all current deletions and edits
		cancelDeletePrompt();
		cancelEdit();
		setIsNewOpen(true);
	}
	function closeNew() {
		setIsNewOpen(false);
	}

	// delete functionality
	const [isDeletePromptOpen, setIsDeletePromptOpen] = useState(false);
	function promptDelete(index) {
		cancelEdit(); // stop all edits
		setIsDeletePromptOpen(index);
	}
	function cancelDeletePrompt() {
		setIsDeletePromptOpen(false);
	}

	// edit functionality
	const [editable, setEditable] = useState(false);
	function edit(index) {
		cancelDeletePrompt(); // stop all deletes
		setEditable(index);
	}
	function cancelEdit() {
		setEditable(false);
	}

	// on data change
	useEffect(() => {
		cancelEdit();
		cancelDeletePrompt();
		setTableSearchData(tableData);
		setSearchValue("");
	}, [tableData]);

	return (
		<div className='tableContainer'>
			<TableHeader
				title={title}
				previousLength={prevCount}
				length={tableSearchData.length}
				searchValue={searchValue}
				searchHandler={searchHandler}
				openNew={openNew}
				attributes={template.attributes}
				types={template.dataTypes}
				tableDataAttributes={template.dataKeys}
				searchBy={searchBy}
				setSearchBy={setSearchBy}
				tableFilterStatus={tableFilterStatus}
				filterRows={filterRows}
				loaded={loaded}
			/>
			<div className='tableWrapper'>
				<table>
					<thead>
						<tr>
							{template.attributes.map((attribute, index) => {
								return (
									<th
										key={index}
										>
										{attribute}
										<BiSort className='icon' />
									</th>
								);
							})}
							<th />
							<th />
						</tr>
					</thead>
					<tbody>
						{tableSearchData.map((data, index) => {
							const tableRowData = [];
							try {
								for (let i = 0; i < template.attributes.length; i++) {
									tableRowData.push({
										value: data[template.dataKeys[i]],
										type: template.dataTypes[i],
										attribute: template.attributes[i],
									});
								}
							} catch (error) {
								console.error(
									"Could not load data object information into table row component"
								);
							}
							return (
								<TableRow
									data={tableRowData}
									index={index}
									isDeletePromptOpen={isDeletePromptOpen}
									promptDelete={promptDelete}
									cancelDeletePrompt={cancelDeletePrompt}
									editable={editable}
									edit={edit}
									cancelEdit={cancelEdit}
									key={index}
									editRow={editRow}
									deleteRow={deleteRow}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
			{isNewOpen && (
				<NewPopUp
					entity={entity}
					closeNew={closeNew}
					values={template.attributes}
					types={template.dataTypes}
					create={template.create}
					addRow={addRow}
				/>
			)}
		</div>
	);
};

export default Table;
