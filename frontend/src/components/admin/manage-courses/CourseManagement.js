import React, { useState, useEffect } from "react";
import Loading from "../../loading/Loading";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import "./course-management.styles.css";

function CourseManagement() {
	const [courses, setCourses] = useState([]);
	const [executed, setExecuted] = useState(false);
	const [loading, setLoading] = useState(false);

	const fetchCourses = async () => {
		console.log("rendered");
		setLoading(true);
		try {
			const response = await axios.get(
				"http://localhost:3500/learnup/api/course-management/get-all-courses"
			);
			if (response.data) {
				setCourses(response.data);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const manageCourseStatus = async (courseId) => {
		setExecuted(true);
		setLoading(true);
		try {
			const response = await axios.put(
				`http://localhost:3500/learnup/api/course-management/approve-course/${courseId}`
			);
			if (response.data) {
				toast.success(response.data.message);
			}
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchCourses();
		setExecuted(false);
	}, [executed]);

	return loading ? (
		<Loading passer={{ message: "Loading Data" }} />
	) : (
		<div className="course-management-page-container">
			<div className="course-display-container">
				<span className="partition-heading">Course Management</span>
				{courses.length < 1 ? (
					<Loading passer={{ message: "No Courses" }} />
				) : (
					<div className="course-lister-partition">
						<table className="course-listing-table">
							<tr className="course-listing-data-row-head">
								<th className="label-head">Course ID</th>
								<th className="label-head">Course Name</th>
								<th className="label-head">Created On</th>
								<th className="label-head">Last Updated</th>
								{/* <th className="label-head">Published By</th> */}
								<th className="label-head">Status</th>
								<th className="label-head">Options</th>
							</tr>
							{courses.map((course) => {
								return (
									<tr className="course-listing-data-row">
										<td className="label-data">
											{course.courseId}
										</td>
										<td className="label-data course">
											{course.courseName}
										</td>
										<td className="label-data">
											{course.createdAt
												? format(
														new Date(
															course.createdAt
														),
														"dd MMM, yyyy"
												  )
												: "----"}
										</td>
										<td className="label-data">
											{course.createdAt
												? format(
														new Date(
															course.updatedAt
														),
														"dd MMM, yyyy"
												  )
												: "----"}
										</td>
										{/* <td className="label-data">unknown</td> */}
										<td className="label-data">
											<span
												className={`course-badge ${
													course.courseStatus ===
													"Approved"
														? "approve"
														: "pending"
												}`}
											>
												{course.courseStatus}
											</span>
										</td>
										<td className="label-data">
											<button
												className={`option-btn ${
													course.courseStatus ===
													"Pending"
														? "option-btn-approve"
														: "option-btn-deny"
												}`}
												onClick={() =>
													manageCourseStatus(
														course._id
													)
												}
											>
												{course.courseStatus ===
												"Pending"
													? "Approve"
													: "Suspend"}
											</button>
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

export default CourseManagement;
