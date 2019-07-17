import moment from 'moment';
import {isDateValid, areDatesValid} from '../dateChecker.js';

describe('dateChecker __tests__', function() {
    let date1 = new Date(),
        date2 = moment(),
        date3 = '02/01/2018',
        date4 = '01-Jan-2018',
        date5 = '2018-01-02',
        date6 = '010208',
        notDate1 = '14:00:00',
        notDate2 = '',
        notDate3 = 'hello',
        notDate4 = '01022018',
        nullDate = null;

    it('isDateValid should return true if date is valid', async () => {
        let date1Valid = isDateValid({date:date1});
        let date2Valid = isDateValid({date:date2});
        let date3Valid = isDateValid({date:date3});
        let date4Valid = isDateValid({date:date4});
        let date5Valid = isDateValid({date:date5});
        let date6Valid = isDateValid({date:date6});

        expect(date1Valid).toBe(true);
        expect(date2Valid).toBe(true);
        expect(date3Valid).toBe(true);
        expect(date4Valid).toBe(true);
        expect(date5Valid).toBe(true);
        expect(date6Valid).toBe(true);
        expect(isDateValid({date:null, allowNull:true})).toBe(true);
    });

    it('isDateValid should return false if date is invalid', async () => {
        let notDate1Valid = isDateValid({date:notDate1});
        let notDate2Valid = isDateValid({date:notDate2});
        let notDate3Valid = isDateValid({date:notDate3});
        let notDate4Valid = isDateValid({date:notDate4});
        let nullDateValid = isDateValid({date:nullDate});

        expect(notDate1Valid).toBe(false);
        expect(notDate2Valid).toBe(false);
        expect(notDate3Valid).toBe(false);
        expect(notDate4Valid).toBe(false);
        expect(nullDateValid).toBe(false);
    });

    it('areDateValids should return true if all dates are valid', async () => {
        let datesValid = areDatesValid({dates:[date1,date2,date3,date4,date5]});
        expect(datesValid).toBe(true);
    });

    it('areDateValids should return false if any date is invalid', async () => {
        let datesValid = areDatesValid({dates:[date1,date2,date3,date4,notDate1, date5]});
        expect(datesValid).toBe(false);
    });


});
