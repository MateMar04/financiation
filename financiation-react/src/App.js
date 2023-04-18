import './App.css';
import Login from './components/login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bienvenida from "./components/bienvenida";


function App() {
  return (
    <div className="App">
    
        <Bienvenida/>
        <Login/>
        
    </div>
  );
}

export default App;