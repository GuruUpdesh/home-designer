import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";

const Employees = () => {
	const title = "Employees";
	const entity = "employee";
	const template = {
		attributes: ["id", "name", "email", "billing rate"],
		dataKeys: ["employeeID", "name", "email", "billingRate"],
		dataTypes: ["id", "text", "text", "text"],
		create: ["none", "text", "text", "text"],
	};
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		getEmployeeRows();
	}, []);

	const getEmployeeRows = async () => {
		await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
			method: "GET",
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			}
		});
	};

	const addEmployee = async (values) => {
		console.log(values);
		await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
			method: "PUT",
			body: JSON.stringify({
				name: values.name,
				email: values.email,
				billingRate: values["billing rate"],
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			}
		});
	};

	const deleteEmployeeRow = async (index, id) => {
		await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				getEmployeeRows();
			}
		});
	};
	return (
		<div className='clients'>
			<Table
				title={title}
				entity={entity}
				template={template}
				tableData={tableData}
				addRow={addEmployee}
				deleteRow={deleteEmployeeRow}
			/>
		</div>
	);
};

export default Employees;

// const employeeContent = {
// 	title: "Employees",
// 	entity: "employee",
// 	template: {
// 		attributes: ["name", "email", "billing rate", "billing hours", "projects"],
// 		dataKeys: ["name", "email", "billingRate", "billingHours", "projects"],
// 		dataTypes: ["text", "text", "text", "list", "list"],
// 	},
// 	tableData: [
// 		{
// 			name: "Gilfoyle Bertram",
// 			email: "uscitizen@piedpiper.com",
// 			billingRate: "$62/hr",
// 			billingHours: ["example 1", "example 2"],
// 			projects: ["example 1", "example 2"],
// 		},
// 		{
// 			name: "Richard Hendricks",
// 			email: "richard@piedpiper.com",
// 			billingRate: "$120/hr",
// 			billingHours: ["example 1", "example 2"],
// 			projects: ["example 1", "example 2"],
// 		},
// 		{
// 			name: "Dinesh Chugtai",
// 			email: "dinesh@piedpiper.com",
// 			billingRate: "$55/hr",
// 			billingHours: ["example 1", "example 2"],
// 			projects: ["example 1", "example 2"],
// 		},
// 		{
// 			name: "Jian Yang",
// 			email: "jianyang@gmail.com",
// 			billingRate: "$250/hr",
// 			billingHours: ["example 1", "example 2"],
// 			projects: ["example 1", "example 2"],
// 		},
// 		{
// 			name: "Jared Dunn",
// 			email: "jareddunn@gmail.com",
// 			billingRate: "$15/hr",
// 			billingHours: ["example 1", "example 2"],
// 			projects: ["example 1", "example 2"],
// 		},
// 		{
// 			name: "Erlich Bachman",
// 			email: "ebach@erlich.co",
// 			billingRate: "$20/hr",
// 			billingHours: ["example 1", "example 2"],
// 			projects: ["example 1", "example 2"],
// 		},
// 		{
// 			name: "Paul Tod",
// 			email: "ptod@homedesigner.com",
// 			billingRate: "$50/hr",
// 			billingHours: ["example 1", "example 2"],
// 			projects: ["example 1", "example 2"],
// 		},
// 	],
// };
