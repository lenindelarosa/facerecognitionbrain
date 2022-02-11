import React from "react";
import './FaceRecognition.css'

const FaceRecognition = ({ imageUrl, box}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id="inputimage" alt="" src={imageUrl} width="500px" height="auto"/>
                {
                    box.map((face, i) => {
                    return (
                        <div className="bounding-box" 
                            key = {`facebox_ + ${i}`}
                            id = {`fb_ + ${i}`}
                            style={{top: face.topRow, 
                                    right: face.rightCol, 
                                    bottom: face.bottomRow, 
                                    left: face.leftCol}}>
                        </div>
                    )
                    })
                }
            </div>
        </div>
    )
}

export default FaceRecognition