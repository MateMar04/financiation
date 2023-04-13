import React from 'react';
import imagenPanal from '../assets/images/panal.jpg'

function Bienvenida() {
    return(
        <div class='container-fluid'>
            <div className="row">
                <div className="col-lg-6">
                    <img src={imagenPanal} alt="" className="imagen"/>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <input type="button" value="Log-In"/>
                        <input type="button" value="Log-In"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Bienvenida;