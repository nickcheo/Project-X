// import React from 'react';
// // import logo from './logo.svg';
// import './App.css';
// // import Home from "./pages/Home";
// // import { Router ,Routes, Route } from "react-router-dom";
// import { Link } from "react-router-dom";

// function App() {
//   return (
//     <div className="App">
            
//         <p>hi</p>
//         <ul>
//           <li>
//             <Link to="/">Home</Link>
            
//           </li>
//         </ul>
        
//       {/* <Router>
//       <Routes>
//         <Route exact path="/" component={Home} />
//       </Routes>
//       </Router> */}
//     </div>
//   );
// }

// export default App;

import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import Home from './pages/Home';
// import About from './pages/About';
// import Contact from './pages/Contact';

function App() {
  return (
    <div className="App">
      <p>hi</p>
      <Routes>
        <Route  path="/" element={Home} />
      </Routes>
    </div>
  );
}

export default App;
