import React from "react";

const tableHeader = (props) => {
	return (
		<div className="tableHeader">
			<div className="tableTitle">
				<h2>{props.title}</h2>
				<p>{props.length}</p>
			</div>
			<input
				type="text"
				placeholder="search"
				value={props.searchValue}
				onChange={(e) => props.searchHandler(e.target.value)}
			/>
			<button onClick={props.openNew}>new</button>
		</div>
	);
};

export default tableHeader;
