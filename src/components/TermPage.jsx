import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';
import Modal from './Modal';

const TermPage = ({ courses }) => {
    const [selectedTerm, setSelectedTerm] = useState("Fall"); // Default to "Fall"
    const [selectedCourse, setSelectedCourse] = useState([]);

    // Modal state and functions
    const [open, setOpen] = useState(false);
    const openModal = () => setOpen(true);
    const closeModal = () => setOpen(false);

    const toggleSelectedCourse = (item) => setSelectedCourse(
        selectedCourse.includes(item)
        ? selectedCourse.filter(x => x !== item)
        : [...selectedCourse, item]
    );// store selected items in selected array

    const CoursePlan = selectedCourse.map(key => courses[key]);

    return (
        <div>
            <div className="d-flex">
                <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
                <button className="ms-auto btn btn-outline-dark" onClick={openModal}>Course Plan</button>
            </div>
            <Modal CoursePlan={CoursePlan} open={open} close={closeModal}></Modal>
            <CourseList courses={courses} selectedTerm={selectedTerm} selectedCourse={selectedCourse} toggleSelectedCourse={toggleSelectedCourse} />
        </div>
    );
};

export default TermPage;