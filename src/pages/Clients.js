import React from "react";
import Table from "../components/table/Table";

const Clients = () => {
	return (
		<div className='clients'>
			<Table tableContent={clientContent} />
		</div>
	);
};

const clientContent = {
	title: "Clients",
	entity: "client",
	template: {
		attributes: ["name", "email", "phone", "addresses"],
		dataKeys: ["name", "email", "phone", "addresses"],
		dataTypes: ["text", "text", "text", "list"],
	},
	tableData: [
		{
			name: "Gilfoyle Bertram",
			email: "uscitizen@piedpiper.com",
			phone: "000-000-0000",
			addresses: ["56 E Morehead St, Laredo, TX"],
		},
		{
			name: "Richard Hendricks",
			email: "richard@piedpiper.com",
			phone: "832-123-3231",
			addresses: [
				"25 E 75th St #69, Los Angeles, CA",
				"394 Manchester Blvd, Rockford, IL",
				"426 Wolf St, Metairie, LA",
			],
		},
		{
			name: "Dinesh Chugtai",
			email: "dinesh@piedpiper.com",
			phone: "232-392-1233",
			addresses: ["2371 Jerrold Ave, Kulpsville, PA"],
		},
		{
			name: "Lenna Paprocki",
			email: "lpaprocki@hotmail.com",
			phone: "907-385-4412",
			addresses: ["639 Main St, Anchorage, AK"],
		},
		{
			name: "Art Venere",
			email: "art@venere.org",
			phone: "856-636-8749",
			addresses: ["2371 Jerrold Ave, Kulpsville, PA"],
		},
		{
			name: "Josephine Darakjy",
			email: "josephine_darakjy@darakjy.org",
			phone: "810-292-9388",
			addresses: ["4 B Blue Ridge Blvd, Brighton, MI"],
		},
		{
			name: "Mitsue Scipione",
			email: "mscipione@scipione.com",
			phone: "530-986-9272",
			addresses: ["77 222 Dr, Brighton, CA"],
		},
		{
			name: "Meaghan Garufi",
			email: "meaghan@gmail.com",
			phone: "931-313-9635",
			addresses: ["69734 E Carrillo St, Mc Minnville, TN"],
		},
		{
			name: "Market of Choice",
			email: "moc@gmail.com",
			phone: "541-832-3857",
			addresses: ["67 W 29th Ave, Eugene, OR"],
		},
		{
			name: "Oregon State University",
			email: "osu@oregonstatestate.edu",
			phone: "541-230-1630",
			addresses: ["67 W 29th Ave, Corvallis, OR"],
		},
		{
			name: "Mod Pizza",
			email: "mod@eugene.com",
			phone: "541-012-6330",
			addresses: ["67 W 29th Ave, Corvallis, OR"],
		},
	],
};

export default Clients;
