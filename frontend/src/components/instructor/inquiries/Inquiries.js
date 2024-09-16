import React, { useEffect, useState } from "react";
import Loading from "../../loading/Loading";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-hot-toast";
import "./inquiries.styles.css";

function Inquiries() {
	const [inquiries, setInquiries] = useState([]);
	const { user_id } = useSelector((state) => state.user);

	const fetchInquiriesByInstructor = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3500/learnup/api/course-management/contact-admin/instructor/${user_id}/contacts`
			);

			if (response.data) {
				setInquiries(response.data);
				toast.success("your inquiries fetched!");
			}
		} catch (error) {
			toast.error(error.message);
		}
	};

	useEffect(() => {
		fetchInquiriesByInstructor();
	}, []);

	return (
		<div className="inquiry-page-container">
			<span className="partition-heading">Admin Inquiries</span>
			{inquiries.length < 1 ? (
				<Loading passer={{ message: "No Inquiries" }} />
			) : (
				<div className="inquiry-partition-canvas">
					{inquiries.map((inquiry) => {
						return <span>{inquiry.topic}</span>;
					})}
				</div>
			)}
		</div>
	);
}

export default Inquiries;
