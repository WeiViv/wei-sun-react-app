import React from 'react';
import './CourseList.css';

const CourseList = ({ courses, selectedTerm, selectedCourse, conflictingCourses, toggleSelectedCourse }) => {
    const filteredCourses = Object.entries(courses).filter(([key, course]) => course.term === selectedTerm);

    return (
        <div className='course-list'>
            {filteredCourses.map(([key, course]) => {
                const isSelected = selectedCourse.includes(key);
                const hasConflict = conflictingCourses.includes(key) && !isSelected;

                // Apply conditional styling classes
                const cardClass = `card m-1 p-2 ${isSelected ? 'selected' : ''} ${hasConflict ? 'conflict' : ''}`;
                
                return (
                    <div 
                        key={key} 
                        className={cardClass}
                        onClick={!hasConflict ? () => toggleSelectedCourse(key) : undefined} // Only apply onClick if no conflict
                    >
                        <div className="card-body">
                            <h5 className="card-title">{course.term} CS {course.number}</h5>
                            <p className="card-text">{course.title}</p>
                            <div className="course-info-divider">
                                <hr className="divider-line" />
                                <p className="card-text">{course.meets}</p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default CourseList;