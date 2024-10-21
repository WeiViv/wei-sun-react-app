import Banner from './Banner';
import TermPage from './TermPage';
import CourseForm from './CourseForm';
import { BrowserRouter, Routes, Route, useParams} from "react-router-dom";

import { useDbData } from "../utilities/firebase";

const CourseFormWrapper = ({ courses }) => {
    const { courseID } = useParams(); // Get the courseId from the URL
    const course = courses[courseID];
    return <CourseForm course={course} courseID={courseID}/>;
};

const Main = () => {
    const [data, error] = useDbData('/');

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (data === undefined) return <h1>Loading data...</h1>;
    if (!data) return <h1>No data found</h1>;

    return (
        <BrowserRouter>
        <br/>
        <Banner title={data.title}></Banner>
        <br/>
        <Routes>
            <Route path="/" element={<TermPage courses={data.courses}/>} />
            <Route path="/edit/:courseID" element={<CourseFormWrapper courses={data.courses} />} />
        </Routes>
        </BrowserRouter>
        
    );
};
export default Main;