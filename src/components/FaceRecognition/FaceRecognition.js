import React from "react";

const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className="center pa3">
            <img alt="" src={imageUrl}/>
        </div>
    )
}

export default FaceRecognition