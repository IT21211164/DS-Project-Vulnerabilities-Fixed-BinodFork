import { MdOutlinePlayLesson } from "react-icons/md";
import { RiShoppingCartFill } from "react-icons/ri";
import { FaGraduationCap, FaHeartCirclePlus } from "react-icons/fa6";
import { IoSettings } from "react-icons/io5";

const studentSidebarData = [
  {
    text: "Courses",
    icon: <MdOutlinePlayLesson />,
    link: "/student/dashboard/courses",
  },
  {
    text: "Shopping Cart",
    icon: <RiShoppingCartFill />,
    link: "/student/dashboard/cart",
  },
  {
    text: "Enrollments",
    icon: <FaGraduationCap />,
    link: "/student/dashboard/enrollments",
  },
  {
    text: "Wishlist",
    icon: <FaHeartCirclePlus />,
    link: "/student/link",
  },
  {
    text: "Settings",
    icon: <IoSettings />,
    link: "/student/link",
  },
];

export default studentSidebarData;
