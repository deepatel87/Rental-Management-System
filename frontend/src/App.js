import logo from './logo.svg';
import Home from './Home';
import './index.css'
import Header from './components/Header';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <>
    <Header></Header>
    {/* <Login></Login> */}
    <Signup></Signup>
    </> 
  );
}

export default App;
