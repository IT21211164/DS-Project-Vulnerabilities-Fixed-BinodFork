import React,{useState,useEffect} from 'react'
import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-hot-toast";
import { RiDeleteBinLine } from "react-icons/ri";
import { FiEdit2 } from "react-icons/fi";

import '../create-course-page/createcourse.css'

function UpdateCourse() {

    let {id} = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState();
    
    const [courseImage, setCourseImage] = useState();
    const [courseName, setCourseName] = useState();
    const [courseId, setCourseId] = useState();
    const [courseDescription, setCourseDescription] = useState();
    const [specialization, setSpecialization] = useState();
    const [coursePrice, setCoursePrice] = useState();
    const [courseContent, setOptions] = useState([]);
    const [skillsArray, setSkills] = useState([]);

    const [lectureVideo, setLectureVideo] = useState("");
    const [lectureName, setLectureName] = useState("");
    const [lectureNote, setLectureNote] = useState("");

    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/learnup/api/course-management/get-course/${id}`);
                console.log(response);
                setCourse(response.data); // Update the course 
                setCourseImage(response.data.courseImage);
                setCourseName(response.data.courseName)
                setCourseId(response.data.courseId)
                setCourseDescription(response.data.courseDescription)
                setSpecialization(response.data.specialization)
                setCoursePrice(response.data.coursePrice)
                setOptions(response.data.courseContent)
                setSkills(response.data.skills)
                
                
            } catch (error) {
                console.error('Error fetching products:', error.message);
            }
        };
    
        fetchData();
    }, [id]);

  
  
  
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

    const skills = typeof skillsArray === 'string' ? skillsArray.split(',').map(skill => skill.trim()) : skillsArray;
  
      if (courseContent.length < 1) {
        return toast.error("Your Course must have at least 1 lecture!");
      }
    
      try {
        const questionResponse = await axios.patch(`http://localhost:3500/learnup/api/course-management/update-course/${id}`, {
          courseId,
          courseName,
          courseImage,
          specialization,
          courseDescription,
          coursePrice: Number(coursePrice),
          courseContent,
          skills
        });
    
        if (questionResponse.data) {
          toast.success("Your Course has been updated successfully!");
          resetQuestionForm();
          
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
          <span className="text-heading-type-1">Course Form</span>
          <div className="create-mealplan-first-row">
            <form className="tender-proposal-form-area">
              {/* supplier full name */}
              <div className="tender-proposal-set">
                <div className="label-box">
                  <label className="tender-proposal-label">
                    Course Id
                  </label>
                </div>
                <input
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Course Id"
                  value={courseId}
                  onChange={(e) => setCourseId(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label className="tender-proposal-label">
                    Course Name
                  </label>
                </div>
                <input
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Course Name"
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label className="tender-proposal-label">
                    Image URL
                  </label>
                </div>
                <input
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Image URL"
                  value={courseImage}
                  onChange={(e) => setCourseImage(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label className="tender-proposal-label">
                    Specialization
                  </label>
                </div>
                <input
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Specialization"
                  value={specialization}
                  onChange={(e) => setSpecialization(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label className="tender-proposal-label">
                    Description
                  </label>
                </div>
                <textarea
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Description"
                  value={courseDescription}
                  onChange={(e) => setCourseDescription(e.target.value)}
                />
                
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label className="tender-proposal-label">
                    Price
                  </label>
                </div>
                <input
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Price"
                  value={coursePrice}
                  onChange={(e) => setCoursePrice(e.target.value)}
                />
                
              </div>
                
              <div className="tender-proposal-set">
                <div className="label-box">
                  <label className="tender-proposal-label">
                    skils
                  </label>
                </div>
                <input
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
                  <label className="tender-proposal-label">Lecture Name</label>
                </div>
                <input
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Video URL"
                  value={lectureVideo}
                  onChange={(e) => setLectureVideo(e.target.value)}
                />
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label className="tender-proposal-label">
                    Video URL
                  </label>
                </div>
                <input
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Lecture Name"
                  value={lectureName}
                  onChange={(e) => setLectureName(e.target.value)}
                />
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label className="tender-proposal-label">
                    Lecture note
                  </label>
                </div>
                <input
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
         
        </div>

    </div>
  )
}

export default UpdateCourse