import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mainapp from './components/Mainapp';
import Notification from './components/Notification';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
      <Routes>
       
          <Route path="/" element={<Home />} />
          <Route path="/mainapp" element={<Mainapp />} />
          <Route path="/notify"  element={<Notification/>}/>
          
      </Routes>
    </BrowserRouter>
     
    </div>
  );
}

export default App;
