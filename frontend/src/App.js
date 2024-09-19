import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
// normal pages
import NavBar from "./components/navbar/NavBar";
import NotFound from "./pages/not-found/NotFound";
import SignIn from "./pages/sign-in/SignIn";
import StudentSignup from "./pages/sign-up-student/StudentSignUp";
import InstructorSignup from "./pages/sign-up-instructor/InstructorSignUp";
// admin pages
import AdminProtectedRoute from "./pages/route-guard-admin/AdminProtectedRoute";
import AdminMainPage from "./components/admin/main-page/AdminMainPage";
import AdminSignup from "./pages/sign-up-admin/AdminSignUp";
import CourseManagement from "./components/admin/manage-courses/CourseManagement";
import AdminDashboard from "./pages/dashboard-admin/AdminDashboard";
import InstructorIncs from "./components/admin/instructor-inquiries/InstructorIncs";
import InquiryInfo from "./components/admin/inquiry-info/InquiryInfo";
// instructor pages
import InstructorProtectedRoute from "./pages/route-guard-instructor/InstructorProtectedRoute";
import InstructorDashboard from "./pages/dashboard-instructor/InstructorDashboard";
import InstructorMainPage from "./components/instructor/main-page/InstructorMainPage";
import ContactAdmin from "./components/instructor/contact-admin/ContactAdmin";
import InquiryDetails from "./components/instructor/inquiry-details/InquiryDetails";
import CreateCourse from "./components/instructor/create-course-page/CreateCourse";
import ViewCourses from "./components/instructor/view-courses/ViewCourses";
import ViewCourse from "./components/instructor/view-course/ViewCourse";
import UpdateCourse from "./components/instructor/update-course-page/UpdateCourse";
import AddContent from "./components/instructor/add-new-content-page/AddContent";
import UpdateContent from "./components/instructor/update-content-page/UpdateContent";
// student page
import StudentProtectedRoute from "./pages/route-guard-student/StudentProtectedRoute";
import StudentDashboard from "./pages/dashboard-student/StudentDashboard";
import StudentMainPage from "./components/student/main-page/StudentMainPage";
import ShoppingCart from "./components/student/shopping-cart/ShoppingCart";
import PurchasedCourse from "./components/student/course-page/PurchasedCourse";
import Enrollments from "./components/student/enrollments/Enrollments";
import HomePage from "./pages/home-page/HomePage";
//notification page
import NotificationPage from "./pages/notification/NotificationPage";
import NotificationHistory from "./pages/notification/NotificationHistory";
import SuccessPayment from "./components/student/payment-success/SuccessPayment";
import PaymentUnsuccess from "./components/student/payment-unsuccess/PaymentUnsuccess";
import MessageTemplate from "./pages/notification/MessageTemplate";

function App() {
	return (
		<div className="App">
			<Toaster />
			<Routes>
				<Route path="/" element={<HomePage />} exact />
				<Route path="/home" element={<HomePage />} />
				<Route path="/sign-in" element={<SignIn />} />
				<Route path="/sign-in/:data" element={<SignIn />} />
				<Route
					path="/create-account/student"
					element={<StudentSignup />}
				/>
				<Route
					path="/create-account/instructor"
					element={<InstructorSignup />}
				/>
				{/* admin protected routes */}
				<Route
					path="/admin/dashboard"
					element={<AdminProtectedRoute />}
				>
					<Route
						path="/admin/dashboard/"
						element={<AdminDashboard />}
					>
						<Route
							path="/admin/dashboard/"
							element={<CourseManagement />}
						/>
						<Route
							path="/admin/dashboard/create-admin/"
							element={<AdminSignup />}
						/>
						<Route
							path="/admin/dashboard/course-management/"
							element={<CourseManagement />}
						/>
						<Route
							path="/admin/dashboard/inquiries/"
							element={<InstructorIncs />}
						/>
						<Route
							path="/admin/dashboard/inquiries/:id"
							element={<InquiryInfo />}
						/>
            <Route
              path="/admin/dashboard/notification/"
              element={<NotificationPage />}
            />
            <Route
              path="/admin/dashboard/notification/history"
              element={<NotificationHistory />}
            />
            <Route
              path="/admin/dashboard/notification/template"
              element={<MessageTemplate />}
            />
					</Route>
				</Route>
				{/* instructor protected routes */}
				<Route
					path="/instructor/dashboard"
					element={<InstructorProtectedRoute />}
				>
					<Route
						path="/instructor/dashboard/"
						element={<InstructorDashboard />}
					>
						<Route
							path="/instructor/dashboard/"
							element={<ViewCourses />}
						/>
             <Route
              path="/instructor/dashboard/create-course"
              element={<CreateCourse />}
            />
            <Route
              path="/instructor/dashboard/courses"
              element={<ViewCourses />}
            />
            <Route
              path="/instructor/dashboard/courses/course/:id"
              element={<ViewCourse />}
            />
            <Route
              path="/instructor/dashboard/courses/course/update/:id"
              element={<UpdateCourse />}
            />
            <Route
              path="/instructor/dashboard/courses/course/addcontent/:id"
              element={<AddContent />}
            />
            <Route
              path="/instructor/dashboard/courses/course/updatecontent/:id"
              element={<UpdateContent />}
            />
            
						<Route
							path="/instructor/dashboard/contact-admin"
							element={<ContactAdmin />}
						/>
						<Route
							path="/instructor/dashboard/inquiries/:id"
							element={<InquiryDetails />}
						/>
					</Route>
				</Route>
				{/* student protected routes */}
				<Route
					path="/student/dashboard"
					element={<StudentProtectedRoute />}
				>
					<Route
						path="/student/dashboard/"
						element={<StudentDashboard />}
					>
						<Route
							path="/student/dashboard/"
							element={<StudentMainPage />}
						/>
						<Route
							path="/student/dashboard/courses"
							element={<StudentMainPage />}
						/>
						<Route
							path="/student/dashboard/cart"
							element={<ShoppingCart />}
						/>
						<Route
							path="/student/dashboard/enrollments"
							element={<Enrollments />}
						/>
            <Route
              path="/student/dashboard/purchased-course/:id"
              element={<PurchasedCourse />}
            />
						<Route
							path="/student/dashboard/payment-success"
							element={<SuccessPayment />}
						/>
						<Route
							path="/student/dashboard/payment-unsuccess"
							element={<PaymentUnsuccess />}
						/>
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
}

export default App;
