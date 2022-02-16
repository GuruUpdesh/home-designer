import React from "react";
// import Selector from "../tableRowComponents/Selector";
import Backdrop from "./Backdrop";

const newPopUp = (props) => {
	return (
		<>
			<div className='newContainer'>
				<div className='newContentWrapper'>
					<h1>new {props.entity}</h1>
					{props.values.map((value, index) => {
						if (props.types[index] === "text") {
							return (
								<>
									<input key={index} placeholder={value} />
								</>
							);
						}
						if (props.types[index] === "list") {
							return (
								<>
									<label>selector</label>
									{/* <Selector /> */}
								</>
							);
						}
						return <></>
					})}
					<button
						onClick={() => {
							props.closeNew();
						}}>
						cancel
					</button>
					<button className='confirm'>confirm</button>
				</div>
			</div>
			<Backdrop onClick={props.closeNew} />
		</>
	);
};

export default newPopUp;
