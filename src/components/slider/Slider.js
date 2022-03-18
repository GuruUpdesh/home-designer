import React from "react";
import SliderCard from "./SliderCard";


const Slider = () => {
	const tables = [
		{ title: "clients", attributes: ["id", "name", "email", "phone"] },
		{
			title: "addresses",
			attributes: ["id", "address", "status", "date started", "date complete"],
		},
        {
			title: "projects",
			attributes: ["id", "name", "status", "date started", "date complete", "description"],
		},
        {
			title: "employees",
			attributes: ["id", "name", "email", "billing rate"],
		},

	];
	return (
		<div className='sliderContainer'>
			<div className='controller'>
			</div>
			{tables.map((table, index) => {
				return <SliderCard title={table.title} attributes={table.attributes} key={index} />;
			})}
		</div>
	);
};

export default Slider;
