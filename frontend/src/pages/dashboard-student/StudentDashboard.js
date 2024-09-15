import React, { useState } from "react";
import "./student-dash.styles.css";
import studentLinks from "../../data/student-sidebar_data";
import { Admin, Instructor, Student } from "../../configurations/userRoles";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/User.slice";
import { Link, useNavigatem , Outlet } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { MdClose } from "react-icons/md";
import { RiLogoutCircleRFill } from "react-icons/ri";
import { toast } from "react-hot-toast";

function StudentDashboard() {
  const dispatch = useDispatch();
  const { username, profile_picture, roles } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const [sidebarVisibility, setSidebarVisibility] = useState(false);

  const sidebarVisibilityAdjuster = () => {
    setSidebarVisibility(!sidebarVisibility);
  };

  const logoutHandler = async () => {
    setSidebarVisibility(false);
    try {
      const response = await axios.get(
        "http://localhost:4000/learnup/api/user-management/auth/logout",
        {
          withCredentials: true,
          credentials: "include",
        }
      );
      if (response) {
        dispatch(logout());
        navigate("/home");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="dashboard-container">
      {/* sidebar */}
      <div
        className={`dashboard-sidebar ${
          sidebarVisibility ? "show-bar" : "hide-bar"
        }`}
      >
        <div className="bar-content">
          <div className="user-info-section">
            <img src={profile_picture} alt="" className="user-profile-pic" />
            <div className="user-details">
              <span className="user-name">{username}</span>
              <span className="user-role">
                {roles.includes(Admin)
                  ? "Admin"
                  : roles.includes(Instructor)
                  ? "Instructor"
                  : "Student"}
              </span>
            </div>
          </div>

          {studentLinks.map((item, index) => {
            return (
              <Link
                className="sidebar-link"
                to={item.link}
                key={index}
                onClick={() => setSidebarVisibility(false)}
              >
                <span className="sidebar-link-icon">{item.icon}</span>
                <span className="sidebar-link-text">{item.text}</span>
              </Link>
            );
          })}

          <div className="sidebar-link logout" onClick={() => logoutHandler()}>
            <span className="sidebar-link-icon">
              <RiLogoutCircleRFill />
            </span>
            <span className="sidebar-link-text">Logout</span>
          </div>
        </div>
        <button
          className="bar-activate-btn"
          onClick={() => sidebarVisibilityAdjuster()}
        >
          {sidebarVisibility ? (
            <MdClose className="btn-visibility-icon" />
          ) : (
            <FiMenu className="btn-visibility-icon" />
          )}
        </button>
      </div>
      {/* admin dashboard-content */}
      <Outlet />
    </div>
  );
}

export default StudentDashboard;
