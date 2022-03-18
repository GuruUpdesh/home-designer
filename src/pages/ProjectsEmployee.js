import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { toast } from "react-toastify";

// basic table information
const ProjectsEmployee = () => {
	const title = "Projects & Employees";
	const entity = "project employee relationship";
	const template = {
		attributes: ["id", "project", "employee"],
		dataKeys: ["projectEmployeeID", "project", "employee"],
		dataTypes: ["id", "select", "select"],
		create: ["none", "select", "select"],
	};

	const [tableData, setTableData] = useState([]);
	const [loaded, setLoaded] = useState(false)

	// get the rows on load
	useEffect(() => {
		getProjectsEmployeeRows();
	}, []);


	const getProjectsEmployeeRows = async () => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/projects-employees`, {
			method: "GET",
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			} else {
				toast.error("Error when trying to read data");
			}
		});
		setLoaded(true)
	};

	// create
	const addProjectsEmployee = async (values) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/projects-employees`, {
			method: "PUT",
			body: JSON.stringify({
				pID: values.project,
				eID: values.employee,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
					toast.success(`Successfully created ${values.name}`);
				});
			} else {
				toast.error("Error when trying to create data");
			}
		});
		setLoaded(true)
	}

	//edit 
	const editProjectsEmployeesRow = async (index, values) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/projects-employees`, {
			method: "POST",
			body: JSON.stringify({id: values.id, pID: values.project, eID: values.employee}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					const copyTableData = [...tableData];
					copyTableData[index] = data[index];
					setTableData(copyTableData);
					toast.success(`Successfully edited ${values.name}`);

				});
			} else {
				toast.error("Error when trying to edit data");
			}
		});
		setLoaded(true)
	}

	//delete
	const deleteProjectsEmployeesRow = async (index, id) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/projects-employees`, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				getProjectsEmployeeRows();
				toast.success(`Successfully deleted`);

			} else {
				toast.error("Error when trying to delete data");
			}
		});
		setLoaded(true)
	};

	return (
		<div className='clients'>
			<Table
				title={title}
				entity={entity}
				template={template}
				tableData={tableData}
				addRow={addProjectsEmployee}
				editRow={editProjectsEmployeesRow}
				deleteRow={deleteProjectsEmployeesRow}
				loaded={loaded}
			/>
		</div>
	);
};

export default ProjectsEmployee;
