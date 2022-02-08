import React, { useState } from "react";
import New from "./table/New";
import TableRow from "./table/TableRow";

const Table = (props) => {
	// state that updates the data rendered
	const [tableSearchData, setTableSearchData] = useState(
		props.tableContent.tableData
	);
	const [searchValue, setSearchValue] = useState("");

	function searchHandler(value) {
		// update edit status
		cancelEdit();

		setSearchValue(value);
		const totalSearchResult = [];
		for (let i = 0; i < props.tableContent.tableAttributes.length; i++) {
			const result = props.tableContent.tableData.filter((object) => {
				return (
					object[props.tableContent.tableAttributes[i]]
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
		setTableSearchData(totalSearchResult);
	}

	// new functionality
	const [isNewOpen, setIsNewOpen] = useState(false);

	function openNew() {
		setIsNewOpen(true);
	}

	function closeNew() {
		setIsNewOpen(false);
	}

	// edit functionality
	const [editable, setEditable] = useState(false);

	function edit(index) {
		setEditable(index);
	}

	function cancelEdit() {
		setEditable(false);
	}

	return (
		<div className="tableContainer">
			<div className="tableHeader">
				<div className="tableTitle">
					<h2>{props.tableContent.title}</h2>
					<p>{tableSearchData.length}</p>
				</div>
				<input
					type="text"
					placeholder="search"
					value={searchValue}
					onChange={(e) => searchHandler(e.target.value)}
				/>
				<button onClick={openNew}>new</button>
			</div>
			<div className="tableWrapper">
				<table>
					<thead>
						<tr>
							{props.tableContent.tableAttributes.map(
								(attribute, index) => {
									return <th key={index}>{attribute}</th>;
								}
							)}
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{tableSearchData.map((data, index) => {
							return (
								<TableRow
									textData={[
										data.name,
										data.email,
										data.phone,
									]}
									booleanData={[data.complete]}
									relationshipData={[data.addresses]}
									editable={editable}
									edit={edit}
									cancelEdit={cancelEdit}
									index={index}
									name={data.name}
									email={data.email}
									phone={data.phone}
									addresses={data.addresses}
									key={index}
								/>
							);
						})}
					</tbody>
				</table>
			</div>
			{isNewOpen && (
				<New
					closeNew={closeNew}
					title={props.tableContent.title}
					textData={[
						tableSearchData[0].name,
						tableSearchData[0].email,
						tableSearchData[0].phone,
					]}
					booleanData = {[
						tableSearchData[0].complete
					]}
					relationshipData={[tableSearchData[0].addresses]}
				/>
			)}
		</div>
	);
};

export default Table;
