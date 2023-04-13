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
                        <div class='container-fluid'>
                            <div class='row'>
                                <div class='col-lg-6'>
                                    <input type='text' placeholder='nombre' />
                                    <input type='text' placeholder='mail' />
                                </div>
                                <div class='col-lg-6'>
                                    <input type='text' placeholder='apellido' />
                                    <input type='password' placeholder='contrasenia' />
                                </div>
                            </div>
                        </div>
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