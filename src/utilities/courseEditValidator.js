export const validateData = (key, val) => {
    switch (key) {
        case 'tittle':
            return val.length >= 2 ? "" : "Title must be at least 2 characters long.";
        case 'meets':
            return val === "" || /^(?:M|Tu|W|Th|F){1,5}\s\d{2}:\d{2}-\d{2}:\d{2}$/.test(val)
            ? ""
            : "Meeting time must contain days and start-end time, e.g. MWF 12:00-13:20 or TuTh 14:00-15:20.";
        default: return '';
    }
};
