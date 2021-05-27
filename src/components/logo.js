import React from 'react';
import icon from './pix1.jpg'


const Logo =()=>{

    return(
    <div className="logocontainer ">
        <div className="db center mw4 tc black link shadow-5 dim"
            >

            <img className="db ba b--black-10 shadow-1 grow logo"
                alt="logo"
                src={icon}
             />

        </div>
        
    </div>
      
    );
  
}

export default Logo;