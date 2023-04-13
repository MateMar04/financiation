import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/styles/signin.css';
import '../assets/images/paulolondra.jpg';
function Signinform() {
    return (
    <div>
      <div className="wrapper fadeInDown">
        <div id="formContent">
         
          <div className="fadeIn first">
            <img src="../assets/images/paulolondra.jpg" id="icon" alt="User Icon" />
          </div>
  
          
          <form>
            <input class="inputizquierda" type="text" id="login" className="fadeIn second" name="signin" placeholder="Usuario" />
            <input class="inputizquierda" type="password" id="password" className="fadeIn third" name="login" placeholder="Contrasenia" />
            <input class="inputizquierda" type="text" id="password" className="fadeIn third" name="login" placeholder="Nombre" />
            <input class="inputizquierda" type="text" id="password"  name="login" placeholder="Apellido"/>
            <input class="inputderecha" type="text" id="nombre" name="nombre"/>
            <input class="inputizquierda" type="submit" className="fadeIn fourth" value="Sign In" />
            
          </form>
          
            
         
          <div id="formFooter">
            <a className="underlineHover" href="#">Forgot Password?</a>
          </div>
        </div>
      </div>
    </div>
    );
  }
  
  export default Signinform;