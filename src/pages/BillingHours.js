import React from 'react'
import BillingHoursTable from '../components/table2/BillingHoursTable';
import ProjectsTable from "../components/table2/ProjectsTable";

const billingHoursContent = {
	title: "Billing Hours",
	tableAttributes: [
		"employee",
        "project",
		"description",
		"time in",
		"time out",
	],
	tableData: [
		{
			employee: "John Lucy",
            project: "Kitchen for Richard",
			description: "completed work on ...",
			timeIn: "9:45AM 2/9/2022",
			timeOut: "11:00AM 2/9/2022",
		},
        {
			employee: "John Lucy",
            project: "Kitchen for Richard",
			description: "completed work on ...",
			timeIn: "9:45AM 2/9/2022",
			timeOut: "11:00AM 2/9/2022",
		},
        {
			employee: "John Lucy",
            project: "Kitchen for Richard",
			description: "completed work on ...",
			timeIn: "9:45AM 2/9/2022",
			timeOut: "11:00AM 2/9/2022",
		},
        {
			employee: "John Lucy",
            project: "Kitchen for Richard",
			description: "completed work on ...",
			timeIn: "9:45AM 2/9/2022",
			timeOut: "11:00AM 2/9/2022",
		},
        {
			employee: "John Lucy",
            project: "Kitchen for Richard",
			description: "completed work on ...",
			timeIn: "9:45AM 2/9/2022",
			timeOut: "11:00AM 2/9/2022",
		},
	],
}

const BillingHours = () => {
  return (
    <div className='clients'>
        <BillingHoursTable  tableContent={billingHoursContent}/>
    </div>
  )
}

export default BillingHours