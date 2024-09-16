import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../../images/learnup.png";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import SignupBanner from "../../images/instructor-signup.jpg";
import "./instructor-signup.styles.css";

function InstructorSignup() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lock, setLock] = useState(true);

  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [checkPasswordError, setCheckPasswordError] = useState("");

  useEffect(() => {
    if (email !== "") {
      emailValidate();
    }

    if (username !== "") {
      nameValidate();
    }

    if (password !== "") {
      passwordValidate();
    }

    if (confirmPassword !== "") {
      checkValidate();
    }

    if (phoneNumber !== "") {
      phoneNumberValidate();
    }

    if (
      email &&
      username &&
      password &&
      phoneNumber &&
      confirmPassword &&
      confirmPassword === password &&
      nameError === ""
    ) {
      setLock(false);
    } else {
      setLock(true);
    }
  }, [email, username, password, confirmPassword, nameError, phoneNumber]);

  const registrationFormHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/learnup/api/user-management/auth/register/instructor",
        {
          username,
          password,
          email,
          phone_number: phoneNumber,
        }
      );
      if (response.data) {
        toast.success("New user account created");
      } else {
        toast.error("Something went wrong!");
      }
    } catch (error) {
      toast.error(error.response.data.message || error.message);
    }

    setEmail("");
    setUserName("");
    setPassword("");
    setConfirmPassword("");
    setPhoneNumber("");
  };

  const nameValidate = () => {
    const regex = /[@#&*]/;
    regex.test(username)
      ? setNameError("Name cannot contain special characters!")
      : setNameError("");
  };

  const emailValidate = () => {
    const regex = /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/;
    regex.test(email)
      ? setEmailError("")
      : setEmailError("Email address must be valid!");
  };

  const passwordValidate = () => {
    const regex = /.{8,}/;
    regex.test(password)
      ? setPasswordError("")
      : setPasswordError("More than 8 characters required!");
  };

  const phoneNumberValidate = () => {
    const regex = /^(?:\+94|0)?\d{10}$/;
    regex.test(phoneNumber)
      ? setPhoneNumberError("")
      : setPhoneNumberError("10 digits! start with 0 or +94");
  };

  const checkValidate = () => {
    password === confirmPassword
      ? setCheckPasswordError("")
      : setCheckPasswordError("Entered password does not match!");
  };

  // input field handlers
  const emailFieldHandler = (e) => {
    setEmail(e.target.value);
  };

  const nameFieldHandler = (e) => {
    setUserName(e.target.value);
  };

  const phoneNumberFieldHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  const passwordFieldHandler = (e) => {
    setPassword(e.target.value);
  };

  const confirmPasswordHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div className="reg-form-container">
      {/* this is the container related to the login form */}
      <div className="form-partition">
        <div className="logo-cotnainer">
          <img src={logo} alt="logo" className="company-logo" />
        </div>

        <span className="topic">Greetings, Instructor!</span>
        <p className="support-phrase">
          Let&apos;s ignite curiosity and passion for learning together.
        </p>

        <form className="form-area" onSubmit={registrationFormHandler}>
          <div className="set">
            <div className="label-box">
              <label className="register-label">Username*</label>
            </div>
            <input
              type="text"
              className="register-input"
              placeholder="Enter your name"
              value={username}
              onChange={(e) => nameFieldHandler(e)}
            />
            <span
              className={`reg-error-displayer ${
                nameError === "" ? "hide" : "show"
              }`}
            >
              {nameError}
            </span>
          </div>

          <div className="set">
            <div className="label-box">
              <label className="register-label">Email*</label>
            </div>
            <input
              type="text"
              className="register-input"
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
              <label className="register-label">Phone Number*</label>
            </div>
            <input
              type="number"
              className="register-input"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => phoneNumberFieldHandler(e)}
            />
            <span
              className={`reg-error-displayer ${
                phoneNumberError === "" ? "hide" : "show"
              }`}
            >
              {phoneNumberError}
            </span>
          </div>

          <div className="set">
            <div className="label-box">
              <label className="register-label">Password*</label>
            </div>
            <input
              type="password"
              className="register-input"
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

          <div className="set">
            <div className="label-box">
              <label className="register-label">Confirm Password*</label>
            </div>
            <input
              type="password"
              className="register-input"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => confirmPasswordHandler(e)}
            />
            <span
              className={`reg-error-displayer ${
                checkPasswordError === "" ? "hide" : "show"
              }`}
            >
              {checkPasswordError}
            </span>
          </div>

          <button type="submit" className="register-btn" disabled={lock}>
            sign up
          </button>

          <div className="link-register">
            Already have an account?{" "}
            <span
              className="login-connector"
              onClick={() => navigate("/sign-in")}
            >
              Sign In
            </span>
          </div>
        </form>
      </div>
      {/* this is the part related to the image */}
      <div
        className="image-partiton"
        style={{ backgroundImage: `url(${SignupBanner})` }}
      ></div>
    </div>
  );
}

export default InstructorSignup;
