import React from "react";
import Table from "../components/table/Table";


const Employees = () => {
	return (
		<div className='clients'>
			<Table tableContent={employeeContent} />
		</div>
	);
};

export default Employees;

const employeeContent = {
	title: "Employees",
	entity: "employee",
	template: {
		attributes: ["name", "email", "billing rate", "billing hours", "projects"],
		dataKeys: ["name", "email", "billingRate", "billingHours", "projects"],
		dataTypes: ["text", "text", "text", "list", "list"],
	},
	tableData: [
		{
			name: "Gilfoyle Bertram",
			email: "uscitizen@piedpiper.com",
			billingRate: "$62/hr",
			billingHours: ["example 1", "example 2"],
			projects: ["example 1", "example 2"],
		},
		{
			name: "Richard Hendricks",
			email: "richard@piedpiper.com",
			billingRate: "$120/hr",
			billingHours: ["example 1", "example 2"],
			projects: ["example 1", "example 2"],
		},
		{
			name: "Dinesh Chugtai",
			email: "dinesh@piedpiper.com",
			billingRate: "$55/hr",
			billingHours: ["example 1", "example 2"],
			projects: ["example 1", "example 2"],
		},
		{
			name: "Jian Yang",
			email: "jianyang@gmail.com",
			billingRate: "$250/hr",
			billingHours: ["example 1", "example 2"],
			projects: ["example 1", "example 2"],
		},
		{
			name: "Jared Dunn",
			email: "jareddunn@gmail.com",
			billingRate: "$15/hr",
			billingHours: ["example 1", "example 2"],
			projects: ["example 1", "example 2"],
		},
		{
			name: "Erlich Bachman",
			email: "ebach@erlich.co",
			billingRate: "$20/hr",
			billingHours: ["example 1", "example 2"],
			projects: ["example 1", "example 2"],
		},
		{
			name: "Paul Tod",
			email: "ptod@homedesigner.com",
			billingRate: "$50/hr",
			billingHours: ["example 1", "example 2"],
			projects: ["example 1", "example 2"],
		},
	],
};
