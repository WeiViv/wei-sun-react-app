import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

const TermPage = ({ courses }) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall"); // Default to "Fall"
    const [selectedCourse, setSelectedCourse] = useState([]);
    const toggleSelectedCourse = (item) => setSelectedCourse(
        selectedCourse.includes(item)
        ? selectedCourse.filter(x => x !== item)
        : [...selectedCourse, item]
    );// store selected items in selected array
    return (
        <div>
            <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
            <CourseList courses={courses} selectedTerm={selectedTerm} selectedCourse={selectedCourse} toggleSelectedCourse={toggleSelectedCourse} />
        </div>
    );
};

export default TermPage;