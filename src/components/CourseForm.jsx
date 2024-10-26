import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateData } from '../utilities/courseEditValidator';
import { useDbUpdate } from '../utilities/firebase';
import { useFormData } from '../utilities/useFormData';

const InputField = ({ name, text, state, change}) => (
    <div className="mb-3">
        <label htmlFor={name} className="form-label">{text}</label>
        <input 
            type="text"
            className="form-control"
            id={name}
            name={name}
            defaultValue={state.values?.[name]} 
            onChange={change}
        />
        <div className="text-danger mt-1">{state.errors?.[name]}</div>
    </div>
);

const CourseForm = ({ course , courseId }) => {
    const { term, number, title: initialTitle, meets: initialMeets } = course || {};
    // console.log("Initial Values:", {initialTitle, initialMeets});

    const navigate = useNavigate();

    const [updateData, result] = useDbUpdate(`/courses/${courseId}`);
    const [state, change] = useFormData(validateData, { title: initialTitle, meets: initialMeets });

    const [noChangesWarning, setNoChangesWarning] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Check if there are no changes
        const noChanges = initialTitle === state.values.title && initialMeets === state.values.meets;
        setNoChangesWarning(noChanges);

        if (noChanges) {
            console.log("No changes detected, form submission prevented.");
            return; // Prevent submission if no changes
        }

        // Proceed with update if changes are detected
        updateData(state.values);
    };

    // Redirect to the previous page on successful update
    useEffect(() => {
        console.log("Result:", result);
        if (result?.status === 'success') {
            console.log("Update successful:", state.values);
            navigate(-1); // Go back to previous page on success
        } else if (result?.status === 'error') {
            console.error("Error updating course:", result.error);
            alert("Failed to update course.");
        }
    }, [result, navigate, state.values]);
        
    
    return (
        <form className="mt-3" onSubmit={handleSubmit}>
            <h2 className='mb-3'>Edit Course - <u><b>{term} CS {number}</b></u></h2>
            <InputField 
                name="title"
                text="Course Title"
                state={state}
                change={change}
            />
            <InputField 
                name="meets"
                text="Course Meets"
                state={state}
                change={change}
            />
            {/* Warning message if no changes have been made */}
            {noChangesWarning && (
                <div className="alert alert-warning" role="alert">
                    No changes have been made. Click "Cancel" instead of "Submit" to go back.
                </div>
            )}
            <div className="d-flex">
                <button type="button" className="btn btn-outline-dark me-2" onClick={() => navigate(-1)}>Cancel</button>
                <button type="submit" className="btn btn-primary me-auto">Submit</button>
            </div>
        </form>
    );
};

export default CourseForm;