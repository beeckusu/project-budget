const FormatMoney = (value) => {
    return `$${value.toFixed(2)}`;
}


const FormatDate = (date) => {
    // Format date in the format such as Jul 07 2021
    let dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-US', dateOptions);
}


export { FormatMoney, FormatDate };