import React from "react";
import Table from "../components/table/Table";

const Projects = () => {
	return (
		<div className='clients'>
			<Table tableContent={projectContent} />
		</div>
	);
};

const projectContent = {
	title: "Projects",
	entity: "project",
	template: {
		attributes: ["name", "date started", "complete", "description", "billing hours"],
		dataKeys: ["name", "dateStarted", "isComplete", "description", "billingHours"],
		dataTypes: ["text", "text", "checkbox", "text", "list"],
	},
	tableData: [
		{
			name: "kitchen",
			dateStarted: "2/5/2022",
			isComplete: "checkbox",
			description:
				"This project was a complete remodel of the kitchen and included: design, demo, install, cabinets, appliances, paint, hard surfaces, etc.",
			billingHours: ["idk yet", "idk yet"],
		},
		{
			name: "living room",
			dateStarted: "2/15/2022",
			isComplete: "checkbox",
			description:
				"This project was a simple redesign. We procured and installed a new sofa and tv.",
			billingHours: ["idk yet", "idk yet"],
		},
	],
};

export default Projects;
