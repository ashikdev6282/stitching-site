import React from 'react';
import './gallery.css';
import Galleryimg from '../assets/galleryimg1.jpg';
import Galleryimg2 from '../assets/galleryimg2.jpg';
import Galleryimg3 from '../assets/galleryimg3.jpg';
import Galleryimg4 from '../assets/galleryimg4.jpg';

const Gallery = () => {
    return(
        <>
        <div className='gallery'>
            <h1>Gallery</h1>
            <div className='gallery-container'>
                <div className='gallery-card'>
                    <img src={Galleryimg} alt='gallery1' />
                </div>
                <div className='gallery-card'>
                    <img src={Galleryimg2} alt='gallery1' />
                </div>
                <div className='gallery-card'>
                    <img src={Galleryimg3} alt='gallery1' />
                </div>
                <div className='gallery-card'>
                    <img src={Galleryimg4} alt='gallery1' />
                </div>
            </div>
        </div>
        </>
    )
}
export default Gallery;