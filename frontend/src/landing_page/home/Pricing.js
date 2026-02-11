import React from 'react';

function Pricing() {
    return ( 
       <div className="container p-3">
         <div class="row">
            <div class="col-4">
                <h1 className="mb-3 p-3 fs-2">Unbeatable pricing</h1>
                <p className="p-3">We pioneered the concept of discount broking and price transparency in India. Flat fees and no hidden charges.</p>
                <a href="" className="text-decoration-none p-3">See pricing <i class="fa fa-long-arrow-right" aria-hidden="true"></i></a>
            </div>
            <div class="col-2"></div>
            <div class="col-6 mb-5">
                <div class="row text-center">
                    <div class="col p-5 border">
                        <h1 className="mb-5"><i class="fa fa-inr" aria-hidden="true"></i>0</h1>
                        <p>Free equity delivery and direct mutual funds</p>
                    </div>
                    <div class="col p-5 border">
                        <h1 className="mb-5"><i class="fa fa-inr" aria-hidden="true"></i>20</h1>
                        <p>Intraday and F&O trading</p>
                    </div>
                </div>
            </div>
         </div>
       </div>
     );
}

export default Pricing;
