import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/signin.css';
import '../assets/images/PRUEBA.PNG';
let Logo = require('../assets/images/PRUEBA.PNG');
function Signinform() {
    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                       <img src={Logo} alt="React Logo" id="LOGOGOB" />
                    </div>

                    <form>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <input type='text' placeholder='Usuario' />
                                    <input type='password' placeholder='Contraseña' />
                                    <input type='text' placeholder='Nombre' />
                                    <input type="tel" name="phone" placeholder="Ingresa tu número de teléfono" pattern="^\d{4}\s\d{3}-\d{4}$"></input>
                                </div>
                                <div className='col-lg-6'>
                                    <input type='email' placeholder='Mail' />
                                    <input type='password' placeholder='Repetir Contraseña' />
                                    <input type='text' placeholder='Apellido' />
                                    <input type='tel' placeholder='Cuil' pattern="^[0-9]{3}-?[0-9]{7}$" />
                                </div>
                            </div>
                        </div>
                        <input className="inputizquierda fadeIn fourth" type="submit" value="Sign In" />

                    </form>



                    <div id="formFooter">
                        <a className="underlineHover" href="#">Ya tienes una cuenta?</a>
                         {/* Agregar el link cuando este conectado.*/}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signinform;