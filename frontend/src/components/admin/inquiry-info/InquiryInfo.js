import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./inquiry-info.styles.css";

function InquiryInfo() {
	const [receivedInquiry, setReceivedInquiry] = useState(null);
	const [adminResponse, setAdminResponse] = useState("");

	const { id } = useParams();
	const navigate = useNavigate();

	const fetchInquiry = async () => {
		console.log(id);
		try {
			const response = await axios.get(
				`http://localhost:3500/learnup/api/course-management/contact-admin/admin/contacts/${id}`
			);
			if (response.data) {
				setReceivedInquiry(response.data);
			}
		} catch (error) {
			toast.error("data can not be fetched!");
		}
	};

	const sendReply = async () => {
		try {
			const response = await axios.put(
				`http://localhost:3500/learnup/api/course-management/contact-admin/admin/contacts/${receivedInquiry._id}/respond`,
				{ adminResponse }
			);
			if (response.data) {
				toast.success("Replied to the inquiry successfully!");
				navigate("/admin/dashboard/inquiries/");
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchInquiry();
	}, []);

	return receivedInquiry !== null ? (
		<div className="inquiry-info-page-container">
      <div className="inquiry-card">
        <span className="partition-heading">Inquiry Details</span>
        <div className="inquiry-details">
          <p>
            <span className="label">Instructor Name:</span>{" "}
            {receivedInquiry.instructorId.username}
          </p>
		  <p>
            <span className="label">Status:</span>{" "}
            <span
              className={`status-badge ${
                receivedInquiry.status === "pending" ? "pending-status" : "resolved-status"
              }`}
            >
              {receivedInquiry.status}
            </span>
          </p>
          <p>
            <span className="label">Topic:</span><br/> {receivedInquiry.topic}
          </p>
          <p>
            <span className="label">Description:</span><br/>{" "}
            {receivedInquiry.description}
          </p>
          
          <div className="response-container">
            <label htmlFor="admin_response" className="label">Add Admin Response:</label>
            <textarea
			  id="admin_response"
              className="response-textarea"
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button className="send-btn" onClick={() => sendReply()}>
          Submit Response
        </button>
      </div>
    </div>
	) : (
		<></>
	);
}

export default InquiryInfo;
