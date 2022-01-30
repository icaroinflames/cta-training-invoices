import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter,
  Routes,
  Route 
} from "react-router-dom";
import UserRegister from './components/UserRegister';
import UserLogin from './components/UserLogin';

function App() {

  const initialState = {
    token: '',
  }
  
  const [tokenState, setTokenState] = useState(initialState)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <nav
          style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem"
          }}
        >
        </nav>
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<UserRegister tokenState={tokenState} setTokenState={setTokenState}/>} />
            <Route path="/login" element={<UserLogin tokenState={tokenState} setTokenState={setTokenState}/>} />
            <Route path="/invoices" element={<UserLogin tokenState={tokenState} setTokenState={setTokenState}/>} />
          </Routes>
      </BrowserRouter>
      </header>
      
    </div>
  );
}

export default App;
