import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";  
import { ToastContainer } from 'react-toastify';
import LoadingBar from "react-top-loading-bar";
import 'react-toastify/dist/ReactToastify.css';
import AuthReject from "./middlewares/AuthReject.js";
import Activation from "./pages/activation/Activation";
import FindAccount from "./pages/find-account/FindAccount";
import ForgotPassword from "./pages/forgot-password/ForgotPassword";
import ChangePassword from "./pages/change-password/ChangePassword";
import { useDispatch, useSelector } from "react-redux";
import { LOADER_END } from "./redux/loader/loaderType.js";
import AuthRedirect from "./middlewares/AuthRedirect";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { accessLoggedInUser } from "./redux/auth/action";

function App() {

  const navigate = useNavigate();
  const loader = useSelector((state) => state.loader);
  const loaderDispatch = useDispatch();
  const userAccessDispatch = useDispatch();
  const token = Cookies.get("authToken");

  useEffect(() => {

    if(token){
      userAccessDispatch(accessLoggedInUser(token, navigate));
    }

  }, [userAccessDispatch]);
  
  return (
    <div>

      <LoadingBar color='#D82E38' progress={loader} onLoaderFinished={() => loaderDispatch({type : LOADER_END})} />
      
      <ToastContainer
        style={{zIndex:"9999999"}}
        position="bottom-left"
        autoClose={3000}
        newestOnTop={true}
        closeOnClick
      />

      <Routes>
        <Route path="/" element={<AuthReject><Home /></AuthReject>} />
        <Route path="/profile" element={<AuthReject><Profile /></AuthReject>} />
        <Route path="/login" element={<AuthRedirect><Login /></AuthRedirect>} />
        <Route path="/activation/:type" element={<Activation />} />
        <Route path="/find-account" element={<FindAccount />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/change-password" element={<ChangePassword />} />
      </Routes>
    </div>
  );
}

export default App;
