import React, { useState, useEffect } from "react";

import Table from "../components/table/Table";

const BillingHours = () => {
	const title = "Billing Hours";
	const entity = "billing item";
	const template = {
		attributes: ["id", "time in", "time out", "description", "employee", "project"],
		dataKeys: ["billingHoursID", "timeIn", "timeOut", "descriptionOfWork", "eID", "pID"],
		dataTypes: ["id", "text", "text", "description", "text", "text"],
		create: ["none", "none", "none", "none", "none", "none"]
	};
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		getBillingHoursRows();
	}, []);

	const getBillingHoursRows = async () => {
		await fetch("http://localhost:5392/api/billing-hours", {
			method: "GET",
		}).then((response) => {
			if (response.status === 200) {
				response.json().then((data) => {
					setTableData(data);
				});
			}
		});
	};

	return (
		<div className='clients'>
			<Table title={title} entity={entity} template={template} tableData={tableData} />
		</div>
	);
};

// let test1 = new Date("2/9/2022 9:45:00 GMT+00:00");
// let test2 = new Date("2/9/2022 10:45:00 GMT+00:00");
// let dif = Math.abs(test1.getTime() - test2.getTime()) / 3600000;

// const billingHoursContent = {
// 	title: "Billing Hours",
// 	entity: "billing item",
// 	template: {
// 		attributes: ["employee", "time in", "time out", "description", "project"],
// 		dataKeys: ["employee", "timeIn", "timeOut", "description", "project"],
// 		dataTypes: ["text", "text", "text", "description", "text"],
// 	},
// 	tableData: [
// 		{
// 			employee: "Dinesh Chugtai",
// 			project: "kitchen for Josephine Darakjy",
// 			description: "completed work on design.",
// 			timeIn: "9:45AM 2/9/2022",
// 			timeOut: "11:00AM 2/9/2022",
// 		},
// 		{
// 			employee: "Dinesh Chugtai",
// 			project: "kitchen for Josephine Darakjy",
// 			description: "completed work on hard surface procurement.",
// 			timeIn: "9:45AM 2/9/2022",
// 			timeOut: "11:00AM 2/9/2022",
// 		},
// 		{
// 			employee: "Richard Hendricks",
// 			project: "living room for Josephine Darakjy",
// 			description: "completed work on design.",
// 			timeIn: "10:51AM 2/13/2022",
// 			timeOut: "11:30AM 2/13/2022",
// 		},
// 		{
// 			employee: "Richard Hendricks",
// 			project: "living room for Josephine Darakjy",
// 			description: "found compatible tv.",
// 			timeIn: "9:45AM 2/15/2022",
// 			timeOut: "11:00AM 2/15/2022",
// 		},
// 		{
// 			employee: "Richard Hendricks",
// 			project: "living room for Josephine Darakjy",
// 			description: "looked for sofa with the requested color, size, and material. Purchased 3 different options.",
// 			timeIn: "1:45PM 2/17/2022",
// 			timeOut: "5:00PM 2/17/2022",
// 		},
// 		{
// 			employee: "Jared Dunn",
// 			project: "guest bedroom for Leota Dilliard",
// 			description: "spoke with client on their vision.",
// 			timeIn: "10:51AM 2/13/2022",
// 			timeOut: "11:30AM 2/13/2022",
// 		},
// 		{
// 			employee: "Jared Dunn",
// 			project: "guest bedroom for Leota Dilliard",
// 			description: "researched new bed technologies.",
// 			timeIn: "10:30PM 2/13/2022",
// 			timeOut: "11:30PM 2/13/2022",
// 		},
// 	],
// };

export default BillingHours;
