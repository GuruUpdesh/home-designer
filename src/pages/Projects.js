import React from 'react'
import ProjectsTable from "../components/table2/ProjectsTable";

const projectContent = {
	title: "Projects",
	tableAttributes: [
		"name",
		"date started",
		"is complete",
		"description",
		"billing hours",
	],
	tableData: [
		{
			name: "kitchen",
			dateStarted: "2/5/2022",
			isComplete: "checkbox",
			description: "place where you cook",
			billingHours: ["1hr Gilfoyle", "3hr Gilfoyle", "4hr Gilfoyle"],
		},
		{
			name: "kitchen",
			dateStarted: "2/5/2022",
			isComplete: "checkbox",
			description: "place where you cook",
			billingHours: ["1hr Gilfoyle", "3hr Gilfoyle", "4hr Gilfoyle"],
		},
		{
			name: "kitchen",
			dateStarted: "2/5/2022",
			isComplete: "checkbox",
			description: "place where you cook",
			billingHours: ["1hr Gilfoyle", "3hr Gilfoyle", "4hr Gilfoyle"],
		},
		{
			name: "kitchen",
			dateStarted: "2/5/2022",
			isComplete: "checkbox",
			description: "place where you cook",
			billingHours: ["1hr Gilfoyle", "3hr Gilfoyle", "4hr Gilfoyle"],
		},
	],
}

const Projects = () => {
  return (
    <div className='clients'>
        <ProjectsTable tableContent={projectContent} />
    </div>
  )
}

export default Projects