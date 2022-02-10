import React from 'react'
import EmployeeTable from "../components/table2/EmployeeTable";

const employeeContent = {
	title: "Employees",
	tableAttributes: [
		"name",
		"email",
		"billing rate",
	],
	tableData: [
		{
			name: "Paul Tod",
			email: "ptod@homedesigner.com",
			billingRate: "$50/hr",
		},
        {
			name: "Paul Tod",
			email: "ptod@homedesigner.com",
			billingRate: "$50/hr",
		},
        {
			name: "Paul Tod",
			email: "ptod@homedesigner.com",
			billingRate: "$50/hr",
		},
        {
			name: "Paul Tod",
			email: "ptod@homedesigner.com",
			billingRate: "$50/hr",
		},
	],
}

const Employees = () => {
  return (
    <div className='clients'>
        <EmployeeTable tableContent={employeeContent} />
    </div>
  )
}

export default Employees