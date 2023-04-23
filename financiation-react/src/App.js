import './App.css';

import Signinform from "./components/signInForm";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
        <Bienvenida/>
        <Login/>
        <Signinform></Signinform>
    </div>
  );
}

export default App;