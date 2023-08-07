const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
}

export { handleFileChange };
