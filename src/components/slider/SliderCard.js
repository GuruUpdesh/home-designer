import React from 'react'
import { useNavigate } from "react-router-dom";
import { MdPeopleAlt } from "react-icons/md";
import { AiFillContainer } from "react-icons/ai";
import { FaAddressCard } from "react-icons/fa";
import { BsFileEarmarkPersonFill, BsArrowDownUp } from "react-icons/bs";

const SliderCard = ({title, attributes}) => {
	const navigate = useNavigate();
  return (
    <div className='sliderCardContainer'>
        <div className='sliderHeader'>
            <h2 className={title === "projects & employees" ? "s" : ""}>{title}</h2>
            {title === "clients" ? <MdPeopleAlt /> : title === "addresses" ? <FaAddressCard /> : title === "projects" ? <AiFillContainer/> : <BsFileEarmarkPersonFill/>}
            
        </div>
        <ul>
            {attributes.map((attribute, index) => {
                return <li key={index}>{attribute}</li>
            })}
        </ul>
        <button onClick={() => {navigate(title)}}>VISIT</button>
    </div>
  )
}

export default SliderCard