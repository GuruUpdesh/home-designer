import React from "react";
import Backdrop from "./Backdrop";

const New = (props) => {
	return (
		<>
			<div className="newContainer">
				<div className="newContentWrapper">
					<h1>new {props.title}</h1>
					{props.textData.map((data, index) => {
						return (
							<input
								type="text"
								placeholder={data}
								key={index}
							/>
						);
					})}
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
			<Backdrop onClick={props.closeNew} />
		</>
	);
};

export default New;
