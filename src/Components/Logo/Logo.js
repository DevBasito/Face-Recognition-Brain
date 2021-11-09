import React from "react";
import Tilt from 'react-tilt';
import './Logo.css';
import brain from './brain.png';

const Logo = () => {
    return (
        <>
            <div className=' ms-3'>
                <Tilt className="Tilt rounded-2" options={{ max: 25 }} style={{ height: 100, width: 100 }} >
                    <div className="Tilt-inner"> <img className=' mx-auto' src={brain} alt="logo" /> </div>
                </Tilt>
            </div>
        </>
    )
}

export default Logo;