// Convert a time string like "16:00" to minutes since midnight
export const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
};

// Check if two courses have overlapping times
export const hasTimeConflict = (courseA, courseB) => {
    // Skip checking if either course has no meeting times
    if (!courseA.meets || !courseB.meets) return false;
    // Skip checking if two courses are not in the same term
    if (courseA.term !== courseB.term) return false;

    // Extract days and time range
    const [daysA, timeRangeA] = courseA.meets.split(' ');
    const [daysB, timeRangeB] = courseB.meets.split(' ');

    // Convert days into arrays and check for common days
    const daysOverlap = [...daysA].some(day => daysB.includes(day));
    if (!daysOverlap) return false;

    // Parse start and end times
    const [startA, endA] = timeRangeA.split('-').map(timeToMinutes);
    const [startB, endB] = timeRangeB.split('-').map(timeToMinutes);

    // Check if times overlap
    return startA < endB && startB < endA;
};

// Check if a course has conflicts with any selected courses
export const hasConflictWithSelected = (course, selectedCourses, allCourses) => {
    return selectedCourses.some(selectedKey => 
        hasTimeConflict(course, allCourses[selectedKey])
    );
};