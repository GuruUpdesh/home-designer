import React from 'react'
import Slider from '../components/slider/Slider'

const Home = ({contextFunctions}) => {
  return (
    <div className='clients'>
        <Slider  contextFunctions={contextFunctions}/>
    </div>
  )
}

export default Home