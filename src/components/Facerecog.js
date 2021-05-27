import React from 'react';
import './facerecog.css';


const Facerecog =({box,imageURL})=>{
    return(
    <div className='center ma'>
        <div className='absolute mt2 shadow-5'>
            <img id='image' alt='' src={imageURL} width='500px' height='auto' />
            <div className='bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
        </div>    
    </div>
      
    );
}

export default Facerecog;