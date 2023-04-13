import React from 'react';
import '../assets/login.css'


function Login() {
    return (
        <div>
            <div class="wrapper fadeInDown">
                <div id="formContent">
                    <div class="fadeIn first">
                        <img id="icon" alt="User Icon" />
                    </div>

                    <input type="text" id="login" class="fadeIn second" name="login" placeholder="login"/>
                        <input type="text" id="password" class="fadeIn third" name="login" placeholder="password"/>
                            <input type="submit" class="fadeIn fourth" value="Log In"/>



                                <div id="formFooter">
                                    <a class="underlineHover" href="#">Forgot Password?</a>
                                </div>
                </div>
            </div>
        </div>
    );
}

export default Login;




