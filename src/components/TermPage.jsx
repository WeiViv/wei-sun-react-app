import React, { useState, useEffect } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import Modal from './Modal';
import { hasConflictWithSelected } from '../utilities/timeUtils';

const TermPage = ({ courses, profile }) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall");
    const [selectedCourse, setSelectedCourse] = useState([]);
    const [conflictingCourses, setConflictingCourses] = useState([]); // New state for conflicts

    // Modal state and functions
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    // Toggle selected course
    const toggleSelectedCourse = (item) => {
        setSelectedCourse(
            selectedCourse.includes(item)
                ? selectedCourse.filter(x => x !== item) // Unselect if already selected
                : [...selectedCourse, item]             // Add to selection if not selected
        );
    };

    // Recalculate conflicts whenever `selectedCourse` changes
    useEffect(() => {
        const conflicts = Object.keys(courses).filter(key => 
            hasConflictWithSelected(courses[key], selectedCourse, courses)
        );
        setConflictingCourses(conflicts);
    }, [selectedCourse, courses]); // Depend on `selectedCourse` and `courses`

    const CoursePlan = selectedCourse.map(key => courses[key]);

    return (
        <div>
            <div className="d-flex">
                <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
                <button className="ms-auto btn btn-outline-dark" onClick={openModal}>Course Plan</button>
            </div>
            <Modal CoursePlan={CoursePlan} open={open} close={closeModal} />
            <CourseList 
                courses={courses} 
                selectedTerm={selectedTerm} 
                selectedCourse={selectedCourse} 
                conflictingCourses={conflictingCourses} // Pass conflicts to CourseList
                toggleSelectedCourse={toggleSelectedCourse} 
                profile={profile}
            />
        </div>
    );
};

export default TermPage;