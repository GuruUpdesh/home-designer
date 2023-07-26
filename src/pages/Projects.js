import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { toast } from "react-toastify";

const Projects = ({contextFunctions}) => {
	// basic table information
	const title = "Projects";
	const entity = "project";
	const template = {
		attributes: [
			"id",
			"name",
			"address",
			"status",
			"date started",
			"date complete",
			"description",
		],
		dataKeys: [
			"projectID",
			"name",
			"address",
			"status",
			"dateStarted",
			"dateComplete",
			"projectDescription",
		],
		dataTypes: ["id", "text", "select", "status", "date", "date", "description"],
		create: ["none", "text", "select", "none", "none", "none", "textArea"],
	};

	const [tableData, setTableData] = useState([]);
	const [loaded, setLoaded] = useState(false)

	// get rows on load
	useEffect(() => {
		getProjectRows();
	}, []);

	// read
	const getProjectRows = async () => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL_local}/projects`, {
			method: "GET",
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			} else {
				toast.error("Error when trying to read data");
			}
			setLoaded(true)
		});
	};

	// create
	const addProject = async (values) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL_local}/projects`, {
			method: "PUT",
			body: JSON.stringify({
				name: values.name,
				aID: values.address,
				projectDescription: values.description,
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
	};

	// edit
	const editProjectRow = async (index, values) => {
		setLoaded(false)
		const request = {
			name: values.name,
			id: values.id,
			status: values.status,
			dateStarted: values["date started"],
			dateComplete: values["date complete"],
			description: values.description,
			aID: values.address
		}

		await fetch(`${process.env.REACT_APP_API_URL_local}/projects`, {
			method: "POST",
			body: JSON.stringify(request),
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

	// delete
	const deleteProjectRow = async (index, id) => {
		setLoaded(true)
		await fetch(`${process.env.REACT_APP_API_URL_local}/projects`, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				getProjectRows();
				toast.success(`Successfully deleted`);
			} else {
				toast.error("Error when trying to delete data");
			}
		});
		setLoaded(false)
	};

	// filter
	const filterProjectRows = async (filterBy) => {
		if (filterBy === "no filter") {
			getProjectRows()
			return
		}
		setLoaded(true)
		await fetch(`${process.env.REACT_APP_API_URL_local}/projects/filter`, {
			method: "POST",
			body: JSON.stringify({filterBy}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			} else {
				toast.error("Error when trying to filter data");
			}
		});
		setLoaded(false)
	}

	return (
		<div className='clients'>
			<Table
				title={title}
				entity={entity}
				template={template}
				tableData={tableData}
				addRow={addProject}
				editRow={editProjectRow}
				deleteRow={deleteProjectRow}
				tableFilterStatus={true}
				filterRows={filterProjectRows}
				loaded={loaded}
				contextFunctions={contextFunctions}
			/>
		</div>
	);
};

export default Projects;
