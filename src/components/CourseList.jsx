import React from 'react';
import './CourseList.css';

const CourseList = ({ courses, selectedTerm }) => {
    const filteredCourses = Object.values(courses).filter(
        (course) => course.term === selectedTerm
    );
    return(
        <div className='course-list'>
        {filteredCourses.map((course) => (
            <div key={`${course.term}-${course.number}`} className="card m-1 p-2">
                <div className="card-body">
                    <h5 className="card-title">{course.term} CS {course.number}</h5>
                    <p className="card-text">{course.title}</p>
                    {/* New container for line and meets info */}
                    <div className="course-info-divider">
                        <hr className="divider-line" />
                        <p className="card-text">{course.meets}</p>
                    </div>
                </div>
            </div>
        ))}
    </div>
    );
};

export default CourseList;
