import React from "react";
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <>
            <div className='m-4'>
                <Tilt className="Tilt rounded-2" options={{ max: 25 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner"> <img className='pt-3 mx-auto' src={brain} alt="logo" /> </div>
                </Tilt>
            </div>
        </>
    )
}

export default Logo;