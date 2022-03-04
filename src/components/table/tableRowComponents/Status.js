import React from "react";

const Status = ({ status, edit }) => {
	return (
		<ul className={"status"}>
			{edit ? (
                <>
                <li className="grey">not started</li>
                <li className="orange">in progress</li>
                <li className="green">complete</li>


                </>
                
			) : (
				<li
					className={
						status === "not started"
							? "grey"
							: status === "in progress"
							? "orange"
							: status === "complete"
							? "green"
							: "error"
					}>
					{status}
				</li>
			)}
		</ul>
	);
};

export default Status;
