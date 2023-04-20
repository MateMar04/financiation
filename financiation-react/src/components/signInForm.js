import React from 'react';
import '../assets/images/PRUEBA.PNG';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/signin.css';

let Logo = require('../assets/images/PRUEBA.PNG');

function SignInForm() {
    return (
        <div>
            <div className="wrapper fadeInDown">
                <div id="formContent">
                    <div className="fadeIn first">
                        <img src={Logo} alt="React Logo" id="LOGOGOB"/>
                    </div>

                    <form>
                        <div className='container-fluid'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <input type='text' placeholder='Usuario'/>
                                    <input type='password' placeholder='Contraseña'/>
                                    <input type='text' placeholder='Nombre'/>
                                    <input type="tel" id="botones" name="phone" placeholder="Telefono" pattern=""/>

                                </div>
                                <div className='col-lg-6'>
                                    <input type='email' placeholder='Mail'/>
                                    <input type='password' placeholder='Repetir Contraseña'/>
                                    <input type='text' placeholder='Apellido'/>
                                    <input type='tel' placeholder='Cuil' id='botones' pattern=""/>
                                </div>
                            </div>
                        </div>
                        <input type="submit" className="inputizquierda fadeIn fourth" value="SIGN IN"/>
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

export default SignInForm;