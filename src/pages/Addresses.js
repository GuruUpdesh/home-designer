import React from "react";
import Table from "../components/table/Table";

const Addresses = () => {
	return (
		<div className='clients'><Table  tableContent={addressesContent}/></div>
	);
};

export default Addresses;

const addressesContent = {
	title: "Addresses",
	entity: "address",
	template: {
		attributes: ["address", "client", "complete", "date started", "date complete", "projects"],
		dataKeys: ["address", "client", "complete", "dateStarted", "dateComplete", "projects"],
		dataTypes: ["text", "text", "checkBox", "text", "text", "list"],
	},
	tableData: [
		{
			address: "4 B Blue Ridge Blvd, Brighton, MI",
			client: "Josephine Darakjy",
			complete: "checkbox",
			dateStarted: "2/16/2022",
			dateComplete: "incomplete",
			projects: ["kitchen", "living room"]
		},
		{
			address: "8 W Cerritos Ave #54, Bridgeport, NJ",
			client: "Art Venere",
			complete: "checkbox",
			dateStarted: "1/16/2020",
			dateComplete: "incomplete",
			projects: ["bedroom", "bathroom"]
		},
		{
			address: "7 W Jackson Blvd, San Jose, CA",
			client: "Leota Dilliard",
			complete: "checkbox",
			dateStarted: "5/24/2021",
			dateComplete: "incomplete",
			projects: ["guest bedroom"]
		},
		{
			address: "3 Mcauley Dr, Ashland, OH",
			client: "Mitsue Tollner",
			complete: "checkbox",
			dateStarted: "8/11/2021",
			dateComplete: "incomplete",
			projects: ["entrance"]
		},
		{
			address: "228 Runamuck Pl #2808, Baltimore, MD",
			client: "Kris Marrier",
			complete: "checkbox",
			dateStarted: "2/17/2022",
			dateComplete: "incomplete",
			projects: []
		},
		{
			address: "2371 Jerrold Ave, Kulpsville, PA",
			client: "Minna Amigon",
			complete: "checkbox",
			dateStarted: "9/15/2019",
			dateComplete: "incomplete",
			projects: []
		},
		{
			address: "37275 St  Rt 17m M, Middle Island, NY",
			client: "Abel Maclead",
			complete: "checkbox",
			dateStarted: "1/2/2021",
			dateComplete: "incomplete",
			projects: []
		},
	],
};
