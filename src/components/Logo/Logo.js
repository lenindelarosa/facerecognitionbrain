import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain.png'

const Logo = () => {
    return (
        <div className="flex justify-center">
            <Tilt className="Tilt" 
                tiltMaxAngleX={40}
                tiltMaxAngleY={40}
                perspective={800}
                transitionSpeed={1500}
                scale={1.1}
                gyroscope={true}
                >
                <div className="" style={{width: '200px'}}>
                    <img alt="logo" src={brain}/>
                </div>
            </Tilt>
        </div>
    )
}

export default Logo