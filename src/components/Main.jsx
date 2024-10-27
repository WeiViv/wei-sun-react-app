import Banner from './Banner';
import TermPage from './TermPage';
import CourseFormWrapper from './CourseFormWrapper';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import { useDbData } from "../utilities/firebase";
import { useProfile } from '../utilities/profile';

const Main = () => {
    // get profile information
    const [profile, profileLoading, profileError] = useProfile();

    const [data, error] = useDbData('/');
    
    // handling course data loading
    if (error) return <h1>Error loading data: {error.toString()}</h1>;
    if (data === undefined) return <h1>Loading data...</h1>;
    if (!data) return <h1>No data found</h1>;

    // handling profile data loading
    if (profileError) return <h1>Error loading profile: {`${profileError}`}</h1>;
    if (profileLoading) return <h1>Loading user profile</h1>;
    if (!profile) return <h1>No profile data</h1>;

    return (
        <BrowserRouter>
        <br/>
        <Banner title={data.title}></Banner>
        <br/>
        <Routes>
            <Route path="/" element={<TermPage courses={data.courses} profile={profile}/>} />
            <Route path="/edit/:courseId" element={<CourseFormWrapper courses={data.courses} profile={profile}/>} />
        </Routes>
        </BrowserRouter>
        
    );
};
export default Main;