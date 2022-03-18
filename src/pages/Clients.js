import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { toast } from "react-toastify";

const Clients = () => {
	// basic table information
	const title = "Clients";
	const entity = "client";
	const template = {
		attributes: ["id", "name", "email", "phone", "addresses"],
		dataKeys: ["clientID", "name", "email", "phone", "addresses"],
		dataTypes: ["id", "text", "text", "text", "list"],
		create: ["none", "text", "text", "text", "none"],
	};

	const [tableData, setTableData] = useState([]);
	const [loaded, setLoaded] = useState(false)

	// get the rows on load
	useEffect(() => {
		getClientRows();
	}, []);

	// read
	const getClientRows = async () => {
		await fetch(`${process.env.REACT_APP_API_URL}/clients`, {
			method: "GET",
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			} else {
				toast.error('Error when trying to read data')
			}
			setLoaded(true)
		});
	};

	// create
	const addClient = async (values) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/clients`, {
			method: "PUT",
			body: JSON.stringify({ name: values.name, email: values.email, phone: values.phone }),
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
				toast.error('Error when trying to create data')
			}
		});
		setLoaded(true)
	};

	// edit
	const editClientRow = async (index, values) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/clients`, {
			method: "POST",
			body: JSON.stringify({
				id: values.id,
				name: values.name,
				email: values.email,
				phone: values.phone,
			}),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					const copyTableData = [...tableData];
					copyTableData[index] = data[0];
					setTableData(copyTableData);
					toast.success(`Successfully edited ${values.name}`);
				});
			}  else {
				toast.error('Error when trying to edit data')
			}
		});
		setLoaded(true)
	};

	// delete
	const deleteClientRow = async (index, id) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/clients`, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				getClientRows();
				toast.success(`Successfully deleted`);
			}   else {
				toast.error('Error when trying to delete data')
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
				addRow={addClient}
				editRow={editClientRow}
				deleteRow={deleteClientRow}
				loaded={loaded}
			/>
		</div>
	);
};

export default Clients;
