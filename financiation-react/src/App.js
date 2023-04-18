import './App.css';

import Signinform from "./Components/signIn";
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bienvenida from "./components/bienvenida";


function App() {
  return (
    <div className="App">
      <Signinform/>
      <Bienvenida></Bienvenida>
    </div>
  );
}

export default App;