import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = () => {
    return(
        <>
        <p className='text-center '>
            This Magic Brain will detect faces in your pictures. Give it a try
        </p>
        <div className='bck-grnd rounded-2 container w-50 z-depth-5 p-5'>
            <input type="text" className='p-2 w-75 text-center' />
            <button className='btn rounded-pill w-25 btn-link btn-dark '>Detect</button>
        </div>
        </>
    )
}

export default ImageLinkForm;