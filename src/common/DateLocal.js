import moment from "moment";

export const DateLocal = (end, min) => {
    if(min === 'min' && end && end.value !== '') {
        return end.value;
    } else if(min === 'max' && end && end.value !== '') {
        return end.value;
    } else if(min === 'max' && end) {
        return new Date(2030,1,1)
    }  else {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        return today = yyyy + '-' + mm + '-' + dd;
    }
}
export const DateLocalWeekStart = () => {
        let m = moment(new Date());
        return m.weekday(1).format("YYYY-MM-DD")
}

export const DateLocalWeekEnd = () => {
    let m = moment(new Date());
    return m.weekday(7).format("YYYY-MM-DD")
}

export const DateLocalMoonStart = () => {
    let m = moment(new Date());
    return m.startOf('month').format("YYYY-MM-DD")
}

export const DateLocalMoonEnd = () => {
    let m = moment(new Date());
    return m.endOf('month').format("YYYY-MM-DD")
}

export const DateLocalYearStart = () => {
    let m = moment(new Date());
    return m.startOf('year').format("YYYY-MM-DD")
}

export const DateLocalYearEnd = () => {
    let m = moment(new Date());
    return m.endOf('year').format("YYYY-MM-DD")
}