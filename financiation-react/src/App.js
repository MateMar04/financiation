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

const App = () => (
    <Router>
        <Layout>
            <Routes>
                <Route exact path='/' component={Landing}/>
                <Route exact path='/login' component={LogIn}/>
                <Route exact path='/signup' component={SignUp}/>
                <Route exact path='/reset_password' component={ResetPassword}/>
                <Route exact path='/password/reset/confirm/:uid/:token' component={ResetPasswordConfirm}/>
                <Route exact path='/activate/:uid/:token' component={Activate}/>
            </Routes>
        </Layout>
    </Router>
)

export default App;

/*function App() {
  return (
    <div className="App">
        <Bienvenida/>
    </div>
  );
}*/

