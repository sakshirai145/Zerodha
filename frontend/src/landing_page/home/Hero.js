import React from 'react';

function Hero() {
    return ( 
        <div className='container p-5'>
           <div className='row text-center'>
              <img src="media/HomeHero.png" alt="Hero-img" className='mb-5' />
              <h1 className='mt-5'>Invest in everything</h1>
              <p className='lead'>Online platform to invest in stocks, derivatives, mutual funds ,and more</p>
              <button style={{width:"20%",margin:"0 auto"}} className='btn mb-5 btn-primary p-2 fs-6'>Signup Now</button>
           </div>
        </div>

     );
}

export default Hero;
