import React from "react";

const Backdrop = (props) => {
	return (
		<div
			onClick={() => {
				props.onClick();
			}}
			className="backdrop"
		></div>
	);
};

export default Backdrop;
