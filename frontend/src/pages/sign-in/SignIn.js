import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import logo from "../../images/learnup.png";
import { toast } from "react-hot-toast";
import { useNavigate , useLocation, Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/User.slice";
import SigninBanner from "../../images/signin.jpg";
import user_roles_list from "../../configurations/userRoles";
import "./signin.styles.css";
import { FcGoogle } from "react-icons/fc";

const useQuery = () => {
  return new URLSearchParams(useLocation().search)
}

function SignIn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [lock, setLock] = useState(true);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { Student, Admin, Instructor } = user_roles_list;
  const { roles } = useSelector((state) => state.user);

  const query = useQuery()

  useEffect(()=>{
    const fetchUserAuthData = async() => {
      const userAuthData = query.get('data');

    if (userAuthData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(userAuthData));
        const { email } = parsedData;

        const response = await axios.post(
          "http://localhost:4000/learnup/api/user-management/auth/oauthlogin",
          {
            email,
          },
          { withCredentials: true, credentials: "include" }
        )
        dispatch(
          login({
            token: response.data.access_token,
            username: response.data.username,
            user_id: response.data._id,
            profile_picture: response.data.profile_picture,
            roles: response.data.roles,
          })
        );

        if (response.data.roles.includes(Admin)) {
          return navigate("/admin/dashboard");
        }
        if (response.data.roles.includes(Instructor)) {
          return navigate("/instructor/dashboard/courses");
        }
        if (response.data.roles.includes(Student)) {
          return navigate("/student/dashboard");
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.error || error.message);
      }
    }
    }

    fetchUserAuthData()
  }, [query])

  useEffect(() => {
    if (email && password) {
      setLock(false);
    } else {
      setLock(true);
    }
  }, [email, password]);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");

  const consentScreenNavigator = (url) => {
    window.location.href = url
  }

  const googleAuth = useCallback(async() => {
    const response = await fetch('http://127.0.0.1:4000/request')
    const data = await response.json()
    consentScreenNavigator(data.url)
  },[])

  const loginFormHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/learnup/api/user-management/auth/login",
        {
          email,
          password,
        },
        { withCredentials: true, credentials: "include" }
      );
      toast.success(`Welcome ${response.data.username}`);
      dispatch(
        login({
          token: response.data.access_token,
          username: response.data.username,
          user_id: response.data._id,
          profile_picture: response.data.profile_picture,
          roles: response.data.roles,
        })
      );

      if (response.data.roles.includes(Admin)) {
        return navigate("/admin/dashboard");
      }
      if (response.data.roles.includes(Instructor)) {
        return navigate("/instructor/dashboard/courses");
      }
      if (response.data.roles.includes(Student)) {
        return navigate("/student/dashboard");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.error || error.message);
    }

    setEmail("");
    setPassword("");
  };

  // input field handlers
  const emailFieldHandler = (e) => {
    setEmail(e.target.value);
  };

  const passwordFieldHandler = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div className="reg-form-container">
      {/* this is the container related to the login form */}
      <div className="form-partition">
        <div className="logo-cotnainer">
          <img src={logo} alt="logo" className="company-logo" />
        </div>

        <span className="topic">Welcome Back!</span>
        <p className="support-phrase">
          We are happy to see you again. Please login to continue from wherever
          you left.
        </p>

        <form className="login-form-area" onSubmit={loginFormHandler}>
          <div className="set">
            <div className="label-box">
              <label htmlFor="user_email" className="login-label">Email</label>
            </div>
            <input
              id="user_email"
              type="text"
              className="login-input"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => emailFieldHandler(e)}
            />
            <span
              className={`reg-error-displayer ${
                emailError === "" ? "hide" : "show"
              }`}
            >
              {emailError}
            </span>
          </div>

          <div className="set">
            <div className="label-box">
              <label htmlFor="user_password" className="login-label">Password</label>
            </div>
            <input
              id="user_password"
              type="password"
              className="login-input"
              placeholder="Create a password"
              value={password}
              onChange={(e) => passwordFieldHandler(e)}
            />
            <span
              className={`reg-error-displayer ${
                passwordError === "" ? "hide" : "show"
              }`}
            >
              {passwordError}
            </span>
          </div>

          <button type="submit" className="login-btn" disabled={lock}>
            sign in
          </button>
          
          <span className="link-login" style={{textAlign:'center' , width:'100%', display:'flex', justifyContent:'center'}}>or</span>

          <button onClick={googleAuth} type="button" className="login-btn-google">
            <FcGoogle className="google-icon"/>sign in with google
          </button>

          <div className="link-login" >
            Don&apos;t have an account?{" "}
            <Link to="/create-account/student" className="login-connector" >Signup</Link>
          </div>
        </form>
      </div>
      {/* this is the part related to the image */}
      <div
        className="image-partiton"
        style={{ backgroundImage: `url(${SigninBanner})` }}
      ></div>
    </div>
  );
}

export default SignIn;
