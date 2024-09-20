import React, { useState , useEffect} from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { sanitizeObject, sanitizeInput } from "../../../sanitization_functions";
import Image1 from '../../../images/updateContent.jpg'

function UpdateContent() {

    const [lectureVideo, setLectureVideo] = useState("");
    const [lectureName, setLectureName] = useState("");
    const [lectureNote, setLectureNote] = useState("");

    let {id} = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3500/learnup/api/course-management/get-content/${id}`);
                console.log(sanitizeObject(response));
                setLectureVideo(response.data.lectureVideo); // Update the course 
                setLectureName(response.data.lectureName);
                setLectureNote(response.data.lectureNote)

                
            } catch (error) {
                console.error('Error fetching products:', sanitizeInput(error.message));
            }
        };
    
        fetchData();
    }, [id]);

    const ContentUpdateFormHandler = async () => {

        
        
          try {
            const questionResponse = await axios.patch(`http://localhost:3500/learnup/api/course-management/update-content/${id}`, {
                lectureVideo,
                lectureName,
                lectureNote

            });
        
            if (questionResponse.data) {
              toast.success("Your Course has been updated successfully!");
              
            }
          } catch (error) {
            console.log(sanitizeObject(error));
            toast.error("Something went wrong");
          }
        
        };

  return (
    <div className='add-content-main-container'>
        <div className='add-content-form-main-con'>
            <div className='add-content-form-con'>
                <div className="add-new-content-topic">
                    Update Content
                </div>
            <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="lecture_video" className="tender-proposal-label">Lecture Video</label>
                </div>
                <input
                  id="lecture_video"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Video URL"
                  value={lectureVideo}
                  onChange={(e) => setLectureVideo(e.target.value)}
                />
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="lecture_name" className="tender-proposal-label">
                    Lecture Name
                  </label>
                </div>
                <input
                  id="lecture_name"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Lecture Name"
                  value={lectureName}
                  onChange={(e) => setLectureName(e.target.value)}
                />
              </div>

              <div className="tender-proposal-set">
                <div className="label-box">
                  <label htmlFor="lecture_note" className="tender-proposal-label">
                    Lecture note
                  </label>
                </div>
                <input
                  id="lecture_note"
                  type="text"
                  className="tender-proposal-input"
                  placeholder="Lecture Note"
                  value={lectureNote}
                  onChange={(e) => setLectureNote(e.target.value)}
                />
              </div>
                <div className="add-content-btn-container"
                 onClick={() => ContentUpdateFormHandler()} aria-hidden="true">
                
              <div className="add-content-btn-form">  
                    <span className="add-content-btn-text">Update</span>   
              </div>
              </div>
            </div>
            <div className='add-content-image' style={{backgroundImage:`url(${Image1})`, backgroundSize:'cover'}}>

            </div>
        </div>
    </div>
  )
}

export default UpdateContent