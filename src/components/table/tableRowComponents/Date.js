import React, { useEffect, useState } from "react";
import DatePicker from "react-date-picker/dist/entry.nostyle";
import { MdCancel } from "react-icons/md";

const DateInput = ({ inputDate, handleDateChange, attribute, isNull }) => {
	useEffect(() => {
		if (isNull && !isAdd) {
			setIsAdd(true);
		}
	}, [isNull]);
	const [isAdd, setIsAdd] = useState(false);
	return isNull || isAdd ? (
		<>
			<DatePicker
				value={inputDate}
				onChange={(result) => handleDateChange(result, attribute)}
				format='MM/dd/y'
				minDate={new Date("2010-01-02")}
			/>
			<span
				onClick={() => {
					handleDateChange(null, attribute);
                    setIsAdd(false)
				}}
				className='addDate'>
				remove
			</span>
		</>
	) : (
		<span
			onClick={() => {
				handleDateChange(new Date(), attribute);
			}}
			className='addDate'>
			add date
		</span>
	);
};

export default DateInput;
