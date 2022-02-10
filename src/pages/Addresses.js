import React from 'react'
import AddressesTable from "../components/table2/AddressesTable";

const addressesContent = {
	title: "Addresses",
	tableAttributes: [
		"address",
		"date started",
		"is complete",
		"description",
		"billing hours",
	],
	tableData: [
		{
			name: "123 example dr.",
			isComplete: false,
			dateStarted: "2/9/2022",
			client: "Richard",
			projects: ["kitchen", "bathroom", "bedroom"]
		},
		{
			name: "123 example dr.",
			isComplete: false,
			dateStarted: "2/9/2022",
			client: "Richard",
			projects: ["kitchen", "bathroom", "bedroom"]
		},
		{
			name: "123 example dr.",
			isComplete: false,
			dateStarted: "2/9/2022",
			client: "Richard",
			projects: ["kitchen", "bathroom", "bedroom"]
		},
		{
			name: "123 example dr.",
			isComplete: false,
			dateStarted: "2/9/2022",
			client: "Richard",
			projects: ["kitchen", "bathroom", "bedroom"]
		},
	],
}

const Addresses = () => {
  return (
    <div className='clients'>
        <AddressesTable tableContent={addressesContent} />
    </div>
  )
}

export default Addresses