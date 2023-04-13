import React from 'react';
import '../assets/styles/login.css'
import LOGOGOBIERNO from '../assets/images/LOGOGOBIERNO.png';


function Login() {
  return (
    <div class='container-fluid'>
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <div class="fadeIn first">
            <img src={LOGOGOBIERNO} alt="React Logo" class="img-fluid" style={{padding: "10%"}}/>
          </div>
          <input type="text" id="CUIL" class="fadeIn second" name="User" placeholder="Usuario"/>
          <input type="password" id="Contraseña" class="fadeIn third" name="Contraseña"
                 placeholder="Contraseña"/>
          <input type="submit" class="fadeIn fourth" value="Entrar" style={{margin: '10px'}}/>

          <div>
            <a class="register" href="#" style={{paddingBottom: '15px'}}>Registrarse</a>
          </div>

          <div id="formFooter">
            <a class="underlineHover" href="#">Olvidé mi constraseña</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;




