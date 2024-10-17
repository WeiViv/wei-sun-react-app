import React from 'react';
import { useNavigate } from 'react-router-dom';

const InputField = ({name, text, defaultValue}) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input className="form-control" id={name} name={name} 
        defaultValue={defaultValue}/>
    </div>
);

const CourseForm = ({ course }) => {
    const { term, number, title, meets } = course || {};
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevents form submission and page reload
        // Do nothing here
    };
    return (
        <form className="mt-3" onSubmit={handleSubmit}>
            <h2 className='mb-3'>Edit Course - <u><b>{term} CS {number}</b></u></h2>
            <InputField name="tittle" text="Course Tittle" defaultValue={title}/>
            <InputField name="meets" text="Course Meets" defaultValue={meets} />
            <div className="d-flex">
                <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="btn btn-primary me-auto">Submit</button>
            </div>
        </form>
    )
};

export default CourseForm;