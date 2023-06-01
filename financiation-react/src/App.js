import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Landing from "./containers/Landing";
import Activate from "./containers/Activate";
import LogIn from "./containers/LogIn"
import RegistroVisita from './containers/RegistroVisita';
import SignUp from "./containers/SignUp";
import ResetPassword from "./containers/ResetPassword";
import ResetPasswordConfirm from "./containers/ResetPasswordConfirm";
import Layout from "./hocs/Layout";
import {Provider} from "react-redux";
import store from "./store";
import MyModal from './components/succesfull';
import AddVisit from './components/AddVisit';
import GroupCard from './components/groupCard';

const App = () => (
  <Provider store={store}>
    <Router>
      <Layout>
        <Routes>
          <Route exact path='/' element={<Landing />} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/CartaGrupo' element={<GroupCard />} />
          <Route exact path='/signup' element={<SignUp />} />
          <Route exact path='/reset-password' element={<ResetPassword />} />
          <Route exact path='/password/reset/confirm/:uid/:token' element={<ResetPasswordConfirm />} />
          <Route exact path='/activate/:uid/:token' element={<Activate />} />
          <Route exact path='/successful' element={<MyModal />} />
          <Route exact path='/AddVisit' element={<AddVisit/>}/>
          <Route exact path='/registro-visita' element={<RegistroVisita/>}/>
        </Routes>
      </Layout>
    </Router>
  </Provider>
);

export default App;


