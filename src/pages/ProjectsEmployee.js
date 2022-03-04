import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";

const ProjectsEmployee = () => {
	const title = "Projects & Employees";
	const entity = "project employee relationship";
	const template = {
		attributes: ["id", "project", "employee"],
		dataKeys: ["projectEmployeeID", "pID", "eID"],
		dataTypes: ["id", "text", "text"],
		create: ["none", "text", "text"]
	};

	const [tableData, setTableData] = useState([]);

    useEffect(() => {
		getProjectsEmployeeRows();
	}, []);

    const getProjectsEmployeeRows = async () => {
        await fetch("http://localhost:5392/api/projects-employees", {
			method: "GET",
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			}
		});
    }

	return (
		<div className='clients'>
			<Table title={title} entity={entity} template={template} tableData={tableData}/>
		</div>
	);
};

export default ProjectsEmployee;
