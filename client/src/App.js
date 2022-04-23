import React from "react";
import { BrowserRouter, Routes, Route} from "react-router-dom";
import Testfile from './components/testfile';
import Landing from "./components/Landing";
import Register from "./components/Register";
import Mainbody from "./components/Mainbody";
import {Createjob,Analyse,Viewjob,Settings} from "./components/dashboard";
import ProtectedRoute from "./components/proctedroute";

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="*" element={<Testfile />} />
      <Route path='/dashboard' element={<ProtectedRoute><Mainbody/></ProtectedRoute>}>
      <Route path='createjob' element={<Createjob />}/>
      <Route path='analysis' element={<Analyse />}/>
      <Route index path='viewjob' element={<Viewjob />}/>
      <Route path='settings' element={<Settings />}/>
      </Route>
      <Route path="/" element={<Landing />} />
      <Route path='/register' element={<Register />} />

      <Route path='/createjob' element={<Createjob />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
