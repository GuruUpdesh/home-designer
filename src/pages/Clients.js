import React, { useState } from "react";
import Nav from "../components/Nav";
// import Table from "../components/Table";
import ClientTable from "../components/table2/ClientTable";
import ProjectsTable from "../components/table2/ProjectsTable";

const clientContent = {
	title: "Clients",
	tableAttributes: ["name", "email", "phone", "addresses"],
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

const Clients = () => {
	return (
		<div className="clients">
			<ClientTable tableContent={clientContent} />
		</div>
	);
};

export default Clients;
