import React from 'react';


const Imagelink =({onInputChange,onButtonsubmit})=>{

    return(
      <div >
          <p className='f3'>
            {'This app will detect your face. Have a try '}
          </p>
          <div className='center' >
              <div className='form center pa4 shadow-3 br3'>
                <input type='text' className='f4 pa2 w-75 center' placeholder='Image Url' onChange={onInputChange}/>
                <button className='detect w-25 grow f4 link ph3 pv2 dib white bg-dark-blue '
                        onClick={onButtonsubmit}>Detect</button>
              </div>
           </div>
      </div>
    );
  
}

export default Imagelink;