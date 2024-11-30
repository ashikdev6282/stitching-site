import React from 'react';
import './aboutus.css';
import HeaderSection from './navbar';
import AboutImg from '../assets/aboutimg1.jpg';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
    const navigate = useNavigate();

    const handleLearnMore = () => {
        navigate('/moreabout');
    }
    return (
        <>
        <div className="container">
           <div className='left-section'>
               <img src={AboutImg} className='about-img'></img>
           </div>
           <div className='right-section'>
                <div className='header'>
                    <h1 className='title'>PETER MASON</h1>
                    <h3 className='sub-title'>HANDCRAFTED SUIT</h3>
                    <p className='sub-para'>We offer high-quality custom tailored suits and shirts for men who see the value in looking sharp and gallant.
                         Our skilled master tailors handle all of our cutting and sewing,
                          ensuring precision in all production processes with attention to the details.</p>
                    <p className='sub-para'>A suit is always, always a stylish choice - but when it's crafted from high-quality materials.
                         Having a suit made from quality fabrics defines how it wears and looks.
                          We guarantee that our suits will suitable to your lifestyle and your everyday needs</p>
                          <button className='btn' onClick={handleLearnMore}>LEARN MORE ABOUT</button>
                </div>
           </div>
        </div>
        </>
    );
}
export default AboutUs;