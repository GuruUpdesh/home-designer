import React from "react";
import Table from "../components/table/Table";

const ProjectsEmployee = () => {
	return (
		<div className='clients'>
			<Table tableContent={ProjectEmployeeContent} />
		</div>
	);
};

export default ProjectsEmployee;

const ProjectEmployeeContent = {
	title: "Projects & Employees",
	entity: "project employee relationship",
	template: {
		attributes: ["project", "employee"],
		dataKeys: ["project", "employee"],
		dataTypes: ["text", "text"],
	},
    tableData: [
        {
            project: "kitchen",
            employee: "Dinesh Chungtai",
        },
        {
            project: "living room",
            employee: "Richard Hendricks",
        },
        {
            project: "guest bedroom",
            employee: "Jared Dunn",
        },
    ]
};
