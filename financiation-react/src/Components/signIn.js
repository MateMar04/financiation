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
                        <div class='container-fluid'>
                            <div class='row'>
                                <div class='col-lg-6'>
                                    <input type='text' placeholder='Usuario' />
                                    <input type='text' placeholder='Contraseña' />
                                    <input type='text' placeholder='Nombre' />
                                    <input type="tel" id="botones" name="phone" placeholder="Telefono" pattern=""></input>
                                </div>
                                <div class='col-lg-6'>
                                    <input type='email' placeholder='Mail' id='botones' />
                                    <input type='password' placeholder='Repetir Contraseña' />
                                    <input type='text' placeholder='Apellido' />
                                    <input type='tel' placeholder='Cuil' id='botones' pattern="" />
                                </div>
                            </div>
                        </div>
                        <input class="inputizquierda" type="submit" className="fadeIn fourth" value="SIGN IN" />

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