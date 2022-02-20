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
		attributes: ["name", "client", "date started", "complete", "description", "billing hours"],
		dataKeys: ["name", "client", "dateStarted", "isComplete", "description", "billingHours"],
		dataTypes: ["text", "text", "text", "checkbox", "description", "list"],
	},
	tableData: [
		{
			name: "kitchen",
			client: "Josephine Darakjy",
			dateStarted: "2/5/2022",
			isComplete: "checkbox",
			description:
				"This project was a complete remodel of the kitchen and included: design, demo, install, cabinets, appliances, paint, hard surfaces, etc.",
			billingHours: ["1hr 2/9/2022 Dinesh Chungtai", "1hr 2/9/2022 Dinesh Chungtai"],
		},
		{
			name: "living room",
			client: "Josephine Darakjy",
			dateStarted: "2/15/2022",
			isComplete: "checkbox",
			description:
				"This project was a simple redesign. We procured and installed a new sofa and tv.",
			billingHours: ["1.5hrs 2/13/2022 Richard Hendricks", "1hrs 2/15/2022 Richard Hendricks", "4hrs 2/17/2022 Richard Hendricks"],
		},
		{
			name: "bedroom",
			client: "Art Venere",
			dateStarted: "2/17/2022",
			isComplete: "checkbox",
			description:
				"This project is small decor changes. Plants, lights, paint.",
			billingHours: [],
		},
		{
			name: "bathroom",
			client: "Art Venere",
			dateStarted: "2/2/2022",
			isComplete: "checkbox",
			description:
				"Installed new counter top, changed faucet, replaced flooring.",
			billingHours: [],
		},
		{
			name: "guest bedroom",
			client: "Leota Dilliard",
			dateStarted: "2/8/2022",
			isComplete: "checkbox",
			description:
				"This project is a major renovation. Swapped bed, decor, paint.",
			billingHours: ["30mins 2/13/2022 Jarden Dunn", "1hr 2/13/2022 Jarden Dunn"],
		},
		{
			name: "entrance",
			client: "Mitsue Tollner",
			dateStarted: "2/23/2022",
			isComplete: "checkbox",
			description:
				"This project entails ripping our flooring, installing windows, and then decorating and styling the interior.",
			billingHours: [],
		},
	],
};

export default Projects;
