import Banner from './Banner';
import TermPage from './TermPage';
import CourseForm from './CourseForm';
import { BrowserRouter, Routes, Route, useParams} from "react-router-dom";
import { useJsonQuery } from '../utilities/fetch';

const CourseFormWrapper = ({ courses }) => {
    const { courseID } = useParams(); // Get the courseId from the URL
    const course = courses[courseID];
    return <CourseForm course={course} />;
};

const Main = ({ url }) => {
    const [data, isLoading, error] = useJsonQuery(url);

    if (error) {return <h1>Error loading courses data: {`${error}`}</h1>};
    if (isLoading) {return <h1>Loading courses data...</h1>};
    if (!data) {return <h1>No course data found</h1>};

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