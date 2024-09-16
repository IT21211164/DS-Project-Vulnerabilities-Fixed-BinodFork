import React, { useState, useEffect } from "react";
import Loading from "../../loading/Loading";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import "./contact-admin.styles.css";

function ContactAdmin() {
	const { user_id } = useSelector((state) => state.user);
	const [topic, setTopic] = useState("");
	const [executed, setExecuted] = useState(false);
	const [description, setDescription] = useState("");

	const sendInquiry = async (e) => {
		setExecuted(true);
		e.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:3500/learnup/api/course-management/contact-admin/instructor/contact",
				{ instructorId: user_id, topic, description }
			);
			if (response.data) {
				toast.success("Admin inquiry sent successfully!");
			}
			setDescription("");
			setTopic("");
		} catch (error) {
			console.log(error);
			toast.error(error.message);
		}
	};

	const [inquiries, setInquiries] = useState([]);

	const fetchInquiriesByInstructor = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3500/learnup/api/course-management/contact-admin/instructor/${user_id}/contacts`
			);

			if (response.data) {
				setInquiries(response.data);
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		setExecuted(false);
		setTimeout(() => {
			fetchInquiriesByInstructor();
		}, 1000);
	}, [executed]);

	return (
		<div className="contact-admin-page-container">
			<span className="partition-heading">Contact Admin</span>
			<div className="contact-admin-display-container">
				<form
					className="contact-admin-form-area"
					onSubmit={sendInquiry}
				>
					<label htmlFor="contact_form_topic" className="contact-label">Topic</label>
					<input
						id="contact_form_topic"
						className="contact-text-input"
						value={topic}
						onChange={(e) => {
							setTopic(e.target.value);
						}}
					/>
					<label htmlFor="contact_form_desc" className="contact-label">Description</label>
					<textarea
						id="contact_form_desc"
						className="contact-text-input-description"
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>
					<button type="submit" className="contact-adm-submit-btn">
						Send
					</button>
				</form>
				{/* inquiries displayer */}
				{inquiries.length < 1 ? (
					<Loading passer={{ message: "No Inquiries" }} />
				) : (
					<div className="inquiry-partition-canvas">
						<table>
							<tr>
								<th>Created At</th>
								<th>Topic</th>
								<th>State</th>
								<th>Action</th>
							</tr>
							{inquiries.map((inquiry) => {
								return (
									<tr>
										<td>
											{format(
												new Date(inquiry.createdAt),
												"dd MMM yyyy HH:mm"
											)}
										</td>
										<td>{inquiry.topic}</td>
										<td>
											<span
												className={`inq-status-badge ${
													inquiry.status === "pending"
														? "pending-msg"
														: "resolved-msg"
												}`}
											>
												{inquiry.status}
											</span>
										</td>
										<td>
											<Link
												to={`/instructor/dashboard/inquiries/${inquiry._id}`}
											>
												<button>View</button>
											</Link>
										</td>
									</tr>
								);
							})}
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

export default ContactAdmin;
