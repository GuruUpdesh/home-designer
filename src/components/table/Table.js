import React, { useState, useEffect } from "react";
import TableHeader from "./TableHeader";
import NewPopUp from "./New/NewPopUp";
import TableRow from "./TableRow";
import { BiSort } from "react-icons/bi";

const Table = ({ title, entity, template, tableData, addRow, editRow, deleteRow }) => {
	// on load

	// search is initially set to all the data and then filtered depending on search value
	// the table is always displaying the content of searchData never tableContent
	const [tableSearchData, setTableSearchData] = useState(tableData);
	const [searchValue, setSearchValue] = useState("");

	// search by is the attribute that is being compared in search
	const [searchBy, setSearchBy] = useState(template.dataKeys[0]);

	// function handles search filtering
	function searchHandler(value) {
		// stop all edits and deletes
		if (isDeletePromptOpen !== false) {
			cancelDeletePrompt();
		}
		if (editable !== false) {
			cancelEdit();
		}

		setSortBy(-1); // removes any sorting

		setSearchValue(value);

		// filters the raw data based off the search attribute
		const result = tableData.filter((object) => {
			return object[searchBy].toString().toLowerCase().indexOf(value.toLowerCase()) > -1;
		});

		// updates search results and stores result in unsorted since we removed sorting
		setTableSearchData(result);
		setUnsorted(result);
	}

	// sort by is the index of the attribute that is sorting the table
	// if the value = -1 no attribute is sorting
	const [sortBy, setSortBy] = useState(-1);

	// unsorted stores an unsorted copy of the data from when no sorting is being applied
	const [unsorted, setUnsorted] = useState(tableSearchData);

	// this function takes the index of the attribute that we want to sort the table by
	// it then updates the state of the search data to the sorted information
	function handleSort(index) {
		// stop all edits and deletes
		if (isDeletePromptOpen !== false) {
			cancelDeletePrompt();
		}
		if (editable !== false) {
			cancelEdit();
		}
		// if the index is not the current sorted index and the attribute data type is text
		if (index !== sortBy && template.dataTypes[index] === "text") {
			setSortBy(index);
			const copy = [...tableSearchData]; // make a copy of the data to sort on

			// sort the copy based off the selected attribute
			const sortProp = template.dataKeys[index];
			copy.sort((a, b) => (a[sortProp] > b[sortProp] ? 1 : -1));
			setTableSearchData(copy);

			// if the index is the same as the current index set sort by to nothing and reset
			// search data to the unsorted version
		} else if (index === sortBy) {
			setSortBy(-1);
			setTableSearchData(unsorted);
		}
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
		cancelEdit()
		cancelDeletePrompt()
		setTableSearchData(tableData);
		setSearchValue("");
	}, [tableData]);

	return (
		<div className='tableContainer'>
			<TableHeader
				title={title}
				length={tableSearchData.length}
				searchValue={searchValue}
				searchHandler={searchHandler}
				openNew={openNew}
				attributes={template.attributes}
				types={template.dataTypes}
				tableDataAttributes={template.dataKeys}
				searchBy={searchBy}
				setSearchBy={setSearchBy}
			/>
			<div className='tableWrapper'>
				<table>
					<thead>
						<tr>
							{template.attributes.map((attribute, index) => {
								return (
									<th
										key={index}
										className={sortBy === index ? "sort" : template.dataTypes[index] === "text" ? "sortable": ""} //prettier-ignore
										onClick={() => {
											handleSort(index);
										}}>
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
					addRow={addRow}
				/>
			)}
		</div>
	);
};

export default Table;
