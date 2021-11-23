import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageurl, box }) => {

    return (
        <>
            <div className='text-center m-4'>
                <div>
                <img id='inputImage' src={imageurl} alt='' width='500px' height='auto' />
                <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}>
                </div>
                </div>
            </div>
        </>
    )

}


export default FaceRecognition