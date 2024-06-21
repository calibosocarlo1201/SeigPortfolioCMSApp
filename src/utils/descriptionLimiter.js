const limitDescription = (description, maxLength) => {
    if (description.length <= maxLength) {
        return description;
    } else {
        return description.substring(0, maxLength) + '...';
    }
};

export default limitDescription