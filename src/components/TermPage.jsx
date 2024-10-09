import React, { useState } from 'react';
import TermSelector from './TermSelector';
import CourseList from './CourseList';

const TermPage = ({ courses }) => {
  const [selectedTerm, setSelectedTerm] = useState("Fall"); // Default to "Fall"

return (
    <div>
        <TermSelector selectedTerm={selectedTerm} setSelectedTerm={setSelectedTerm} />
        <CourseList courses={courses} selectedTerm={selectedTerm} />
    </div>
);
};

export default TermPage;