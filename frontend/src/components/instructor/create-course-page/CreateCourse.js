import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";
import './createcourse.css'

function CreateCourse() {

  const {user_id} = useSelector((state) => state.user)
  const navigate = useNavigate();

  const [courseId, setCourseId] = useState("");
  const [courseName, setCourseName] = useState("");
  const [courseImage, setCourseImage] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [coursePrice , setCoursePrice] = useState("");
  const [skillsArray , setSkills] = useState([]);


  const [courseContent, setOptions] = useState([]);
  
  const [lectureVideo, setLectureVideo] = useState("");
  const [lectureName, setLectureName] = useState("");
  const [lectureNote, setLectureNote] = useState("");

  const [editingOptionIndex, setEditingOptionIndex] = useState(-1);
  const addOptionToTheList = () => {
    if (lectureVideo === "" || lectureName === ""  || lectureNote === "") {
      return toast.error("All fields must be filled!");
    }

    const itemObject = {
      lectureVideo,
      lectureName,
      lectureNote
    };

    if (editingOptionIndex !== -1) {
      // If an option is being edited, update the existing option
      const updatedOptions = [...courseContent];
      updatedOptions[editingOptionIndex] = itemObject;
      setOptions(updatedOptions);
      setEditingOptionIndex(-1); // Reset the editing index
    } else {
      // If no option is being edited, add a new option
      setOptions([...courseContent, itemObject]);
    }

    setLectureVideo("");
    setLectureName("");
    setLectureNote("");
  };

  const editOption = (index) => {
    const { lectureVideo, lectureName , lectureNote } = courseContent[index];
    setLectureVideo(lectureVideo);
    setLectureName(lectureName);
    setLectureNote(lectureNote);
    setEditingOptionIndex(index);
  };

  const resetQuestionForm = () => {
    setCourseId("");
    setCourseName("");
    setCourseImage("");
    setSpecialization("");
    setCourseDescription("");
    setCoursePrice("");
    setOptions([]);
    setSkills([]);
    setEditingOptionIndex(-1);
  };

  const tenderQuestionFormHandler = async () => {

    const skills = skillsArray.split(',').map(skillsArray => skillsArray.trim());
    console.log('Skills array:', skills);

    if (courseContent.length < 1) {
      return toast.error("Your Course must have at least 1 lecture!");
    }
  
    try {
      const questionResponse = await axios.post('http://localhost:3500/learnup/api/course-management/create-course', {
        courseId,
        courseName,
        courseImage,
        specialization,
        courseDescription,
        coursePrice: Number(coursePrice),
        courseContent,
        skills,
        userId : user_id
      });
  
      if (questionResponse.data) {
        toast.success("Your Course has been created successfully!");
        resetQuestionForm();
        navigate('/instructor/dashboard/courses');
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  
    console.log({
      courseId,
      courseContent,
    });
  };
  

  const removeFromList = (name) => {
    const filteredItemList = courseContent.filter((Content) => {
      return Content.lectureName !== name;
    });

    setOptions(filteredItemList);
  };

  return (
    <div  className='create-course-main-container'>

<div className="create-mealplan-request-container">
          <span className="text-heading-type-1">Add New Course</span>
          <div className="create-mealplan-first-row">
            <form className="tender-proposal-form-area">
              {/* supplier full name */}
              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="course_id" className="tender-proposal-label">
                    Course Id
                  </label>
                </div>
                <input
                  id="course_name"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Course Id"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="course_name" className="tender-proposal-label">
                    Course Name
                  </label>
                </div>
                <input
                  id="course_name"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="course_image_url" className="tender-proposal-label">
                    Image URL
                  </label>
                </div>
                <input
                  id="course_image_url"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Image URL"
                  value={courseImage}
                  onChange={(e) => setCourseImage(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="create_course_specialization" className="tender-proposal-label">
                    Specialization
                  </label>
                </div>
                <input
                  id="create_course_specialization"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="create_course_desc" className="tender-proposal-label">
                    Description
                  </label>
                </div>
                <textarea
                  id="create_course_desc"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="create_course_price" className="tender-proposal-label">
                    Price
                  </label>
                </div>
                <input
                  id="create_course_price"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Price"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                />
                
              </div>
                
              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="create_course_skills" className="tender-proposal-label">
                    skils
                  </label>
                </div>
                <input
                  id="create_course_skills"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="skils"
                  value={skillsArray}
                  onChange={(e) => setSkills(e.target.value)}
                />
                
              </div>
              
            </form>

            <div className="item-populater-container">
              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="create_lec_video" className="tender-proposal-label">Lecture Video</label>
                </div>
                <input
                  id="create_lec_video"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Video URL"
                  value={lectureVideo}
                  onChange={(e) => setLectureVideo(e.target.value)}
                />
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="create_lec_name" className="tender-proposal-label">
                    Lecture Name
                  </label>
                </div>
                <input
                  id="create_lec_name"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Lecture Name"
                  value={lectureName}
                  onChange={(e) => setLectureName(e.target.value)}
                />
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="create_lec_note" className="tender-proposal-label">
                    Lecture note
                  </label>
                </div>
                <input
                  id="create_lec_note"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Lecture Note"
                  value={lectureNote}
                  onChange={(e) => setLectureNote(e.target.value)}
                />
              </div>

              <button
                className="add-item-btn"
                onClick={() => addOptionToTheList()}
              >
                {editingOptionIndex !== -1 ? "Update Content" : "Add Content"}
              </button>
            </div>

            <div className="entered-item-list-displayer">
              {courseContent.length >= 1 ? (
                courseContent.map((Option, index) => {
                  const { lectureName, lectureVideo , lectureNote } = Option;

                  return (
                    <div className="material-container" key={index}>
                      <div className="material-cont-details">
                        <span>Name : {lectureName}</span>
                        <span>URL : {lectureVideo}</span>
                        <span>lecture Note: {lectureNote}</span>
                      </div>
                      <div className="material-cont-buttons">
                        <button
                          className="bidding-option-modify-btn"
                          onClick={() => editOption(index)}
                        >
                          <FiEdit2 />
                        </button>
                        <button
                          className="bidding-option-modify-btn"
                          onClick={() => removeFromList(lectureName)}
                        >
                          <RiDeleteBinLine />
                        </button>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="empty-array-placeholder">
                  No Content On the List
                </div>
              )}
            </div>

            
          </div>
          <button
                className="submit-proposal-btn"
                onClick={() => tenderQuestionFormHandler()}
              >
                Submit Course
              </button>
          {/* <div className="create-proposal-second-row">
            <div className="tender-proposal-guidelines">
              
              <button
                className="submit-proposal-btn"
                // onClick={() => tenderQuestionFormHandler()}
              >
                Submit Question
              </button>
            </div>
            <div
              className="tender-proposal-placeholder-image"
            //   style={{ backgroundImage: `url(${TenderProposalPlaceHolder})` }}
            ></div>
          </div> */}
        </div>

    </div>
  )
}

export default CreateCourse