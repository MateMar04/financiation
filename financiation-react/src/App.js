import './App.css';
import NavScrollExample from "./components/Navbar";
import Bienvenida from "./components/bienvenida";
import Login from "./components/login";
import Signinform from "./components/signInForm";
import MyModal from './components/succesfull';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <NavScrollExample />
        <Bienvenida/>
        <Login/>
        <Signinform/>
        <MyModal/>
    </div>
  );
}
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

const App = () => (
    <Provider store={store}>
        <Router>
            <Layout>
                <Routes>
                    <Route exact path='/' element={<Landing/>}/>
                    <Route path='/login' element={<LogIn/>}/>
                    <Route exact path='/signup' element={<SignUp/>}/>
                    <Route exact path='/reset-password' element={<ResetPassword/>}/>
                    <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm/>}/>
                    <Route exact path='/activate/:uid/:token' element={<Activate/>}/>
                </Routes>
            </Layout>
        </Router>
    </Provider>
);

export default App;

/*function App() {
  return (
    <div className="App">
        <Bienvenida/>
    </div>
  );
}*/

