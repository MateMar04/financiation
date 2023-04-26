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

export default App;