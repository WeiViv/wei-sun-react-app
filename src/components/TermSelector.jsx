import React from 'react';

const terms = ["Fall", "Winter", "Spring"];

const TermSelector = ({ selectedTerm, setSelectedTerm }) => (
    <div class="btn-group">
        {terms.map((term) => (
            // create a button for each term, setting the selectedTerm when clicked
            <button 
                type="button" 
                class="btn btn-outline-primary" 
                key={term} 
                onClick={() => setSelectedTerm(term)}
            >
                {term}
            </button>
        ))}
    </div>
);
export default TermSelector;
