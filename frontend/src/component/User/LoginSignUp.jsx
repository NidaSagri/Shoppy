import React, { Fragment, useState, useEffect } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import "./LoginSignUp.css";
import Loader from "../layout/Loader/Loader";
import { Link, useNavigate, useLocation } from "react-router";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import profilePic from "../../images/Profile.png";
import { useDispatch, useSelector } from "react-redux";
import {login, register} from "../../actions/userAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors } from "../../features/user/userSlice";

const LoginSignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { error, loading, isAuthenticated } = useSelector((state) => state.user);

  const [tab, setTab] = useState(0); // 0 = Login, 1 = Register
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const { name, email, password } = user;
  const [avatar, setAvatar] = useState(profilePic);
  const [avatarPreview, setAvatarPreview] = useState(profilePic);

  const redirect = location.search ? location.search.split("=")[1] : "/me";

    useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearErrors());
      }

      if (isAuthenticated) {
        navigate(redirect);
      }
    }, [dispatch, error, navigate, isAuthenticated, redirect]);

    const loginSubmit = (e) => {
      e.preventDefault();
      dispatch(login({ email: loginEmail, password: loginPassword }));
    };

    const registerSubmit = (e) => {
      e.preventDefault();
      const myForm = new FormData();
      myForm.set("name", name);
      myForm.set("email", email);
      myForm.set("password", password);
      myForm.set("avatar", avatar);
      dispatch(register(myForm));
    };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  return (
    <Fragment>
      <ToastContainer />
      {loading ? (
        <Loader />
      ) : (
      <Fragment>
        <div className="LoginSignUpContainer">
          <div className="LoginSignUpBox">
            {/* MUI Tabs for Login & Register Switching */}
            <Box>
              <Tabs
                value={tab}
                onChange={(_, newValue) => setTab(newValue)}
                centered
                sx={{
                  "& .MuiTab-root": { color: "rgba(0, 0, 0, 0.623)" },
                  "& .MuiTab-root.Mui-selected": { color: "tomato" },
                  "& .MuiTabs-indicator": { backgroundColor: "tomato" },
                }}
              >
                <Tab label="Login" />
                <Tab label="Register" />
              </Tabs>
            </Box>

            {tab === 0 && (
              <form className="loginForm" onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">Forgot Password ?</Link>
                <input type="submit" value="Login" className="loginBtn" />
              </form>
            )}

            {tab === 1 && (
              <form
                className="signUpForm"
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>
                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            )}
          </div>
        </div>
      </Fragment>
      )}
    </Fragment>
  );
};

export default LoginSignUp;
