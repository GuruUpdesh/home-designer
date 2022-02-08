import React, { useState } from "react";
import Table from "../components/Table";

const clientContent = {
	title: "Clients",
	tableAttributes: ["name", "email", "phone", "complete", "addresses"],
	tableData: [
		{
			name: "Client Name",
			email: "email@example.com",
			phone: "541-123-1234",
			complete: false,
			addresses: ["123 street", "Silicon Valley", "456 dr"],
		},
		{
			name: "Gilfoyle",
			email: "uscitizen@piedpiper.com",
			phone: "000-000-0000",
			complete: false,
			addresses: ["Silicon Valley"],
		},
		{
			name: "Richard Hendricks",
			email: "richard@piedpiper.com",
			phone: "832-123-3231",
			complete: false,
			addresses: ["Silicon Valley"],
		},
		{
			name: "Dinesh Chugtai",
			email: "dinesh@piedpiper.com",
			phone: "232-392-1233",
			complete: false,
			addresses: ["Silicon Valley"],
		},
		{
			name: "Guru Updesh Singh",
			email: "guruupdeshsingh@gmail.com",
			phone: "832-123-3231",
			complete: false,
			addresses: ["456 example st"],
		},
	],
};

// const projectContent = {
// 	title: "Projects",
// 	tableAttributes: ["name", "date started", "is complete", "description", "billing hours"],
// 	tableData: [
// 		{
// 			name: "kitchen",
// 			dateStarted: "2/5/2022",
// 			isComplete: "checkbox",
// 			description: "place where you cook",
// 			billingHours: ["123 street", "Silicon Valley", "456 dr"],
// 		},
// 	],
// };

const Clients = () => {
	return (
		<div className="clients">
			<h2>Clients</h2>
			<Table tableContent={clientContent} />
			{/* <Table tableContent={projectContent} /> */}
		</div>
	);
};

export default Clients;
