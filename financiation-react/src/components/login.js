import React from 'react';
import '../assets/styles/login.css'



function Login() {
    return (
        <div>
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first">
                        <img id="Logo" src=''/>
                    </div>

                    <input type="text" id="CUIL" class="fadeIn second" name="User" placeholder="Usuario"/>
                        <input type="password" id="Contraseña" class="fadeIn third" name="Contraseña" placeholder="Contraseña"/>
                            <input type="submit" class="fadeIn fourth" value="Entrar"/>
                            <a class="register" href="#">Registrarse</a>
                          

                                <div id="formFooter">
                                    <a class="underlineHover" href="#">Olvidó la contraseña?</a>
                                </div>
                </div>
            </div>
        </div>
    );
}

export default Login;




