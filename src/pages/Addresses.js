import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { toast } from "react-toastify";

const Addresses = ({contextFunctions}) => {
	// basic table information
	const title = "Addresses";
	const entity = "address";
	const template = {
		attributes: [
			"id",
			"address",
			"client",
			"status",
			"date started",
			"date complete",
			"projects",
		],
		dataKeys: [
			"addressID",
			"address",
			"client",
			"status",
			"dateStarted",
			"dateComplete",
			"projects",
		],
		dataTypes: ["id", "text", "select", "status", "date", "date", "list"],
		create: ["none", "text", "select", "none", "none", "none", "none"],
	};

	const [tableData, setTableData] = useState([]);
	const [loaded, setLoaded] = useState(false)

	// get the rows on load
	useEffect(() => {
		getAddressRows();
	}, []);

	// read
	const getAddressRows = async () => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/addresses`, {
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
	const addAddress = async (values) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/addresses`, {
			method: "PUT",
			body: JSON.stringify({
				address: values.address,
				dateStarted: values.dateStarted,
				dateComplete: values.dateComplete,
				cID: values.client,
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
	const editAddressRow = async (index, values) => {
		setLoaded(false)
		const request = {
			address: values.address,
			id: values.id,
			status: values.status,
			dateStarted: values["date started"],
			dateComplete: values["date complete"],
			cID: values.client,
		};

		await fetch(`${process.env.REACT_APP_API_URL}/addresses`, {
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
	};

	// delete
	const deleteAddressRow = async (index, id) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/addresses`, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				getAddressRows();
				toast.success(`Successfully deleted`);
			} else {
				toast.error("Error when trying to delete data");
			}
		});
		setLoaded(true)
	};

	// filter
	const filterAddressRows = async (filterBy) => {
		if (filterBy === "no filter") {
			getAddressRows();
			return;
		}
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/addresses/filter`, {
			method: "POST",
			body: JSON.stringify({ filterBy }),
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
		setLoaded(true)
	};
	return (
		<div className='clients'>
			<Table
				title={title}
				entity={entity}
				template={template}
				tableData={tableData}
				addRow={addAddress}
				editRow={editAddressRow}
				deleteRow={deleteAddressRow}
				tableFilterStatus={true}
				filterRows={filterAddressRows}
				loaded={loaded}
				contextFunctions={contextFunctions}
			/>
		</div>
	);
};

export default Addresses;