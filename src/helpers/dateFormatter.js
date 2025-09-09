function dateFormatter(date) {
    const options = {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    }

    const formattedDate = new Date(date).toLocaleDateString('nl-NL', options);

    return formattedDate;
}

export default dateFormatter;