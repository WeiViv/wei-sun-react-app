import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateTitle, validateMeets } from '../utilities/courseEditValidator';

const InputField = ({ name, text, value, onChange, error }) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input 
            type="text"
            className="form-control"
            id={name}
            name={name}
            value={value}
            onChange={onChange}
        />
        {error && <div className="text-danger mt-1">{error}</div>}
    </div>
);

const CourseForm = ({ course }) => {
    const { term, number, title = "", meets = "" } = course || {};
    const navigate = useNavigate();

    // State for form fields and errors
    const [formValues, setFormValues] = useState({ title, meets });
    const [errors, setErrors] = useState({ title: "", meets: "" });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prev) => ({ ...prev, [name]: value }));

        // Run validation for the changed field
        if (name === "title") {
            setErrors((prev) => ({ ...prev, title: validateTitle(value) }));
        } else if (name === "meets") {
            setErrors((prev) => ({ ...prev, meets: validateMeets(value) }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent form submission and page reload

        // Validate all fields before submission
        const titleError = validateTitle(formValues.title);
        const meetsError = validateMeets(formValues.meets);

        if (titleError || meetsError) {
            setErrors({ title: titleError, meets: meetsError });
        } else {
            // Proceed with form submission (e.g., save data) if no errors
            console.log("Form submitted successfully:", formValues);
            navigate(-1); // Redirect back to previous page
        }
    };

    return (
        <form className="mt-3" onSubmit={handleSubmit}>
            <h2 className='mb-3'>Edit Course - <u><b>{term} CS {number}</b></u></h2>
            <InputField 
                name="title"
                text="Course Title"
                value={formValues.title}
                onChange={handleChange}
                error={errors.title}
            />
            <InputField 
                name="meets"
                text="Course Meets"
                value={formValues.meets}
                onChange={handleChange}
                error={errors.meets}
            />
            <div className="d-flex">
                <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="btn btn-primary me-auto">Submit</button>
            </div>
        </form>
    );
};

export default CourseForm;