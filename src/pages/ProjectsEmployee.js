import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";

const ProjectsEmployee = () => {
	const title = "Projects & Employees";
	const entity = "project employee relationship";
	const template = {
		attributes: ["id", "project", "employee"],
		dataKeys: ["projectEmployeeID", "pID", "eID"],
		dataTypes: ["id", "text", "text"],
		create: ["none", "text", "text"],
	};

	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		getProjectsEmployeeRows();
	}, []);

	const getProjectsEmployeeRows = async () => {
		await fetch(`${process.env.REACT_APP_API_URL}/projects-employees`, {
			method: "GET",
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			}
		});
	};

	const deleteProjectsEmployeesRow = async (index, id) => {
		await fetch(`${process.env.REACT_APP_API_URL}/projects-employees`, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				getProjectsEmployeeRows();
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
				deleteRow={deleteProjectsEmployeesRow}
			/>
		</div>
	);
};

export default ProjectsEmployee;
