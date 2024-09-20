import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import "./enrollment-record.styles.css";

function EnrollmentRecord({ record, unenrollFromCourse }) {
  const { course_id, _id } = record;
  const { courseName, courseImage, courseDescription, skills } = course_id;
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="enrollment-record-container">
      {/* this is the modal window for delete confirmation */}
      {showModal ? (
        <div
          className="unenroll-confirmation-model"
          onClick={() => setShowModal(false)}
          aria-hidden="true"
        >
          <div className="enr-model-container">
            <div className="modal-info-ribbon">Unenrollment Confirmation?</div>
            <p className="modal-message">
              Are you sure you want to unenroll from this course? This action
              cannot be undone. You will lose all the access to this course once
              you click &apos;confirm&apos;
            </p>
            <div className="modal-confirm-btns">
              <button
                className="modal-btn"
                onClick={() => unenrollFromCourse(_id)}
              >
                Confirm
              </button>
              <button className="modal-btn" onClick={() => setShowModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}

      <img src={courseImage} alt="course-image" className="enr-record-image" />
      <div className="enr-record-details">
        <span className="enr-course-name">{courseName}</span>
        <p className="enr-course-description">{courseDescription}</p>
        <div className="enr-skill-container">
          {skills !== null &&
            skills.map((skill, index) => {
              return (
                <span className="enr-skill-badge" key={index}>
                  {skill}
                </span>
              );
            })}
        </div>
      </div>
      <div className="enr-record-options">
        <Link to={`/student/dashboard/purchased-course/${course_id._id}`}>
          <button className="enr-record-btn view">
            <FaArrowRightLong />
          </button>
        </Link>
        <button
          className="enr-record-btn unenroll"
          onClick={() => setShowModal(true)}
        >
          <MdDelete />
        </button>
      </div>
    </div>
  );
}

export default EnrollmentRecord;
