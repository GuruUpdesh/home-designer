import React, { useState } from "react";
import { BsCheck } from "react-icons/bs";

const Checkbox = () => {
	const [checked, setChecked] = useState(false);
    function toggleCheckBox() {
        setChecked(!checked)
    }

	return (
		<div className={checked ? "checkbox checked" : "checkbox"} onClick={toggleCheckBox}>
			{checked ? <BsCheck /> : <></>}
		</div>
	);
};

export default Checkbox;
