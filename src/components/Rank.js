import React, {Component} from 'react';


const Rank =({name,entries})=>{

    return(
    <div>
        <div className='dark-green f3'>
          {`${name}, Your current entry count is ...`}
         </div>
        <div className='dark-purple f1'>
          {entries}
        </div>
    </div>
      
    );
  
}

export default Rank;