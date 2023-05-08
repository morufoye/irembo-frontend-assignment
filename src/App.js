
import React, {useContext} from 'react';
import {AuthContextProvider} from "./components/context/auth-context";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from 'react-router-dom';
import Layout from "./layout";
import Home from "./components/home";
import SignUp from "./components/registration/sign-up-form";
import ForgotPassword from "./components/registration/forgot-password";
import PasswordResetResponse from "./components/registration/password-reset-response";
import PasswordResetForm from "./components/registration/password-reset-form";
import Dashboard from "./components/dashboard";
import Login from "./components/login/login.js";
import PostTransaction from "./components/transactions/post-transaction";

function App() {
  return (
      <Router>
          <AuthContextProvider>
            <Routes>
               <Route path="/" element={<Layout/>}>
               <Route index element={<Home/>}/>
               <Route  path="/" element={<Home/>}/>
               <Route  path="login" element={<Login/>}/>
               <Route  path="sign-up" element={<SignUp/>}/>
               <Route  path="dashboard" element={<Dashboard/>}/>
               <Route  path="forgot-password" element={<ForgotPassword/>}/>
               <Route  path="reset-password" element={<PasswordResetForm/>}/>
               <Route  path="password-reset-response" element={<PasswordResetResponse/>}/>
               <Route  path="post-transaction" element={<PostTransaction/>}/>
              </Route>
            </Routes>
          </AuthContextProvider>
      </Router>

  );
}

export default App;
