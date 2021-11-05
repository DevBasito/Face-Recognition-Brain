import React from "react";

const ImageLinkForm = () => {
    return(
        <>
        <p className='text-center text-light'>
            This Magic Brain will detect faces in your pictures. Give it a try
        </p>
        <div className='rounded-2 z-depth-5 bg-dark p-5'>
            <input type="text" className='p-2 w-75 text-center' />
            <button className='btn rounded-pill w-25 btn-link btn-dark '>Detect</button>
        </div>
        </>
    )
}

export default ImageLinkForm;