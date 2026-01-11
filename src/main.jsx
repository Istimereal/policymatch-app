import React from 'react';
import ReactDom from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.jsx'
import DisplayQuestions from './components/pages/DisplayQuestions.jsx';
import PolicyMatch from './components/pages/PolicyMatch.jsx';
import RegisterUser from './components/pages/RegisterUser.jsx';
import RequiredRole from './components/routes.jsx/requiredRoles.jsx';
import AddQuestion from './components/pages/AddQuestions.jsx';
import ManageQuestions from './components/pages/ManageQuestions.jsx';

const root = document.getElementById("root");

ReactDom.createRoot(root).render(
<BrowserRouter>
<Routes>
  <Route path="/" element={<App />}>

   <Route path="responses" element={
    <RequiredRole role={["USER", "ADMIN"]}
    ><PolicyMatch />
    </RequiredRole>}/>

   <Route path="questions/add" element={
    <RequiredRole role={["ADMIN"]}
    ><AddQuestion />
    </RequiredRole>}/>

    <Route path="questions/manage" element={
    <RequiredRole role={["ADMIN"]}
    ><ManageQuestions />
    </RequiredRole>}/>

     <Route path="questions" element={<DisplayQuestions />}/>

   <Route path="auth/register" element={<RegisterUser />}/>

  </Route>
  
</Routes>
</BrowserRouter>,

);
 
