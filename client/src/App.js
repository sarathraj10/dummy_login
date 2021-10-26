import './App.css';
import {BrowserRouter,Route,Switch,Redirect} from 'react-router-dom'
import { useSelector } from "react-redux";
import Auth from './components/Auth/Auth';
import Toster from "./components/Toster/Toster";
import Dashboard from './components/Dashboard/Dashboard' 

function App() {
  const user = useSelector(state => state.auth.authToken)
  const {showError,message} = useSelector(state => state.error)
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={()=> user ? <Dashboard/> : <Redirect to="/auth"/>}/>
        <Route path="/auth" exact component={()=> user ? <Redirect to="/"/> : <Auth/>}/>
      </Switch>
      <Toster showError={showError} message={message}/>
    </BrowserRouter>
  );
}

export default App;
