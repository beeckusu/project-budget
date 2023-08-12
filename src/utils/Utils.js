import { DateInterval } from "./Enums";

const FormatMoney = (value) => {
    return `$${value.toFixed(2)}`;
}


const FormatDate = (date, dateInterval = DateInterval.DAY) => {

    

    let dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };

    if (dateInterval == DateInterval.WEEK) {
        date = new Date(date);
        date.setDate(date.getDate() - date.getDay());
        dateOptions = { year: 'numeric', month: 'short', day: '2-digit' };

    } else if (dateInterval == DateInterval.MONTH) {
        dateOptions = { year: 'numeric', month: 'short' };

    } else if (dateInterval == DateInterval.YEAR) {
        dateOptions = { year: 'numeric' };

    }

    return date.toLocaleDateString('en-US', dateOptions);
}


export { FormatMoney, FormatDate };