import React, { useState, useEffect } from "react";
import Table from "../components/table/Table";
import { toast } from "react-toastify";


const Employees = ({contextFunctions}) => {
	// basic table information
	const title = "Employees";
	const entity = "employee";
	const template = {
		attributes: ["id", "name", "email", "billing rate"],
		dataKeys: ["employeeID", "name", "email", "billingRate"],
		dataTypes: ["id", "text", "text", "text"],
		create: ["none", "text", "text", "text"],
	};
	const [tableData, setTableData] = useState([]);
	const [loaded, setLoaded] = useState(false)

	// get the rows on load
	useEffect(() => {
		getEmployeeRows();
	}, []);

	// read
	const getEmployeeRows = async () => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
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
	const addEmployee = async (values) => {
		setLoaded(false)
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
					toast.success(`Successfully created ${values.name}`);

				});
			} else {
				toast.error('Error when trying to create data')
			}
		});
		setLoaded(true)
	};

	// edit
	const editEmployeeRow = async (index, values) => {
		const request = {
			id: values.id,
			name: values.name,
			email: values.email,
			billingRate: Number(values["billing rate"])
		}

		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
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
				toast.error('Error when trying to edit data')
			}
		});
		setLoaded(true)
	}

	// delete
	const deleteEmployeeRow = async (index, id) => {
		setLoaded(false)
		await fetch(`${process.env.REACT_APP_API_URL}/employees`, {
			method: "DELETE",
			body: JSON.stringify({ id: id }),
			headers: {
				"Content-Type": "application/json",
			},
		}).then((response) => {
			if (response.status === 200) {
				getEmployeeRows();
				toast.success(`Successfully deleted`);
			} else {
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
				addRow={addEmployee}
				editRow={editEmployeeRow}
				deleteRow={deleteEmployeeRow}
				loaded={loaded}
				contextFunctions={contextFunctions}
			/>
		</div>
	);
};

export default Employees;
