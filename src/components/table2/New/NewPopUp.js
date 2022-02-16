import React from "react";
import Selector from "../tableRowComponents/Selector";
import Backdrop from "./Backdrop";

const newPopUp = (props) => {
	return (
		<>
			<div className="newContainer">
				<div className="newContentWrapper">
					<h1>new {props.entity}</h1>
					{props.data.map((object, index) => {
						if (object.type === "text") {
							return (
								<>
									<input placeholder={object.value} />
								</>
							);
						}
						if (object.type === "list") {
							return (
								<>
									<label>selector</label>
									{/* <Selector /> */}
								</>
							);
						}
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

export default newPopUp;
