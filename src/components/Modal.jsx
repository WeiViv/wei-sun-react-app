import './Modal.css';

const Modal = ({ CoursePlan, open, close }) => (
    <div
        className={`modal ${open ? 'modal-show' : 'modal'}`}
        tabIndex="-1"
        role="dialog"
        onClick={(evt) => { if (evt.target === evt.currentTarget) close(); }}
    >
        <div className="modal-dialog" role="document">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title">Course Plan</h5>
                <button type="button" className="btn-close" aria-label="Close"
                    onClick={close}
                />
            </div>
            <div className="modal-body">
                {CoursePlan.length === 0 ? (
                <p>
                    No courses selected.
                    <br/>
                    Please select courses by clicking on the cards.
                </p>
                ) : (
                <ul>
                    {CoursePlan.map((course) => (
                    <li key={course.number}>
                        <strong>{course.term} CS {course.number}: {course.title}</strong>
                        <br/>
                        <i>Time:</i> {course.meets}
                    </li>
                    ))}
                </ul>
                )}
            </div>
        </div>
        </div>
    </div>
    );

export default Modal;