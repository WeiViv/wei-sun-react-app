const CourseList = ({courses}) => (
    <div>
        {Object.values(courses).map((course) => (
            <div key={course.number}>
                <p>{course.term} CS {course.number}: {course.title}</p>
            </div>
        ))}
    </div> 
);

export default CourseList;
