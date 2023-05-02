import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Landing from "./containers/Landing";
import Activate from "./containers/Activate";
import LogIn from "./containers/LogIn"
import SignUp from "./containers/SignUp";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Layout from "./hocs/Layout";
import {Provider} from "react-redux";
import store from "./store";

function App() {
  return (
    <div className="App">
        <Bienvenida/>
        <MyModal/>
    </div>
  );
}*/


export default App;

