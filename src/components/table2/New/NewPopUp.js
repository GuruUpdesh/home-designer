import React from "react";
import Backdrop from "./Backdrop";

const newPopUp = (props) => {
	return (
		<>
			<div className="newContainer">
				<div className="newContentWrapper">
					<h1>new</h1>
					<button
						onClick={() => {
							props.closeNew();
						}}
					>
						cancel
					</button>
					<button className="confirm">confirm</button>
				</div>
			</div>
			<Backdrop onClick={props.closeNew}/>
		</>
	);
};

export default newPopUp;
