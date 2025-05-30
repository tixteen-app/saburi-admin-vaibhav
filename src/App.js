// import './App.css';
// import { Route, Routes } from "react-router-dom"; 
// import Admin from './AdminPages/Admin';
// import LoginForm from './auth/login';
// import ForgotPasswordForm from './auth/sendMail';
// import OtpVerifiedForm from './auth/otp';

// function App() {
//   return (
//     <div>
//        <Routes>
//         <Route path="/" element={<LoginForm />} />
//         <Route path="/Forgot-Password" element={<ForgotPasswordForm />} />
//         <Route path="/otp-verified" element={<OtpVerifiedForm />} />
//        <Route
// 					path="/admin/*"
// 					element={<Admin />}
// 				/>
//       </Routes>
//     </div>
//   );
// }

// export default App;


import './App.css';
import { Route, Routes, useNavigate } from "react-router-dom"; 
import { useEffect } from "react";
import Admin from './AdminPages/Admin';
import LoginForm from './auth/login';
import ForgotPasswordForm from './auth/sendMail';
import OtpVerifiedForm from './auth/otp';

function App() {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
       <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/Forgot-Password" element={<ForgotPasswordForm />} />
        <Route path="/otp-verified" element={<OtpVerifiedForm />} />
        <Route
          path="/admin/*"
          element={isLoggedIn ? <Admin /> : <LoginForm />}
        />
      </Routes>
    </div>
  );
}

export default App;
