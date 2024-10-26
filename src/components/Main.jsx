import Banner from './Banner';
import TermPage from './TermPage';
import CourseFormWrapper from './CourseFormWrapper';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import { useAuthState, useDbData } from "../utilities/firebase";

const Main = () => {
    const [data, error] = useDbData('/');
    const [user] = useAuthState();
    console.log("Authenticated user:", user); 

    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (data === undefined) return <h1>Loading data...</h1>;
    if (!data) return <h1>No data found</h1>;

    return (
        <BrowserRouter>
        <br/>
        <Banner title={data.title}></Banner>
        <br/>
        <Routes>
            <Route path="/" element={<TermPage courses={data.courses} user={user} />} />
            <Route path="/edit/:courseId" element={<CourseFormWrapper courses={data.courses} user={user} />} />
        </Routes>
        </BrowserRouter>
        
    );
};
export default Main;