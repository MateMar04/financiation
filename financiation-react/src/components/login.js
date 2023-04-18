import React from 'react';
import '../assets/styles/login.css'
import LOGOGOBIERNO from '../assets/images/LOGOGOBIERNO.png';
import OjoPassword from './ojo';

function Login() {
  return (
    
    <div className='container-fluid'>
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <div className="fadeIn first">
            <img src={LOGOGOBIERNO} alt="React Logo" className="img-fluid" style={{ padding: "10%" }} />
          </div>
          <input type="text" id="CUIL" className="fadeIn second" name="User" placeholder="Usuario" />
          <OjoPassword/> 
  
          <input type="submit" className="fadeIn fourth" value="Entrar" style={{ margin: '10px' }} />

          <div>
            <a className="register" href="#" style={{ paddingBottom: '15px' }}>Registrarse</a>
          </div>

          <div id="formFooter">
            <a className="underlineHover" href="#">Olvidé mi constraseña</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;




