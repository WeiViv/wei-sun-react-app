export const validateTitle = (title) => {
    return title.length >= 2 ? "" : "Title must be at least 2 characters long.";
};

export const validateMeets = (meets) => {
    const meetsPattern = /^(?:M|Tu|W|Th|F){1,5}\s\d{2}:\d{2}-\d{2}:\d{2}$/;
    return meets === "" || meetsPattern.test(meets)
        ? ""
        : "Meeting time must contain days and start-end time, e.g. MWF 12:00-13:20 or TuTh 14:00-15:20.";
};
