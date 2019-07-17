import moment from 'moment';

export const isDateValid = ({date, allowNull = false})=>{   //TODO:syd set strict mode
    if(date==='') return false;
    if(allowNull){
        if(!date) return true; //allow null to proceed
    }
    let momentObj = moment(date);
    if(!momentObj) return false;    //momentObj will be null if argument is empty string
    return momentObj.isValid();
};

export const areDatesValid = ({dates, allowNull = false})=>{
    for(let i=0; i<dates.length; i++){
        let valid = isDateValid({date: dates[i], allowNull});
        if(!valid) return false
    }
    return true;
};