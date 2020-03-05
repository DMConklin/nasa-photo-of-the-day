import React, {useState, useEffect} from 'react';
import axios from 'axios';

const DateList = (props) => {
    const thisYear = new Date().getFullYear();
    const yearArray = [];
    const monthArray = [];
    const dayArray = [];

    const [year, setYear] = useState(thisYear);
    const [month, setMonth] = useState(new Date().getMonth()+1)
    const [day, setDay] = useState(new Date().getDate())
    const [days, setDays] = useState();

    useEffect(() => {
        axios
          .get(`https://api.nasa.gov/planetary/apod?api_key=VSDX406ElKtT7Zaql3PPtpmCz7yhy6tKEgRV796g&date=${year}-${month}-${day}`)
          .then(response => {
            props.dataSetter(response.data);
          }).catch(err => console.log(err));
      }, [year,month,day,props]);

    for (let i = 1995; i <= thisYear; i++) {
        yearArray.push(i);
    }

    for (let i = 1; i <= 12; i++) {
        monthArray.push(i);
    }

    useEffect(() => {
        switch (month) {
            case 2:
                if (year % 4 === 0) {
                    setDays(29);
                } else {
                    setDays(28);
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                setDays(30);
                break;
            default:
                setDays(31);
                break;
        }
    },[month,year])
    

    for (let i = 1; i <= days; i++) {
        dayArray.push(i);
    }

    const dayList = dayArray.map((day, index) => {
        return <option value={day} key={index}>{day}</option>
    })

    const monthList = monthArray.map((month, index) => {
        return <option value={month} key={index}>{month}</option>
    })

    let yearList = yearArray.map((year, index) => {
        return <option value={year} key={index}>{year}</option>;
    })

    let yearHandler = (event) => {
        let value = event.target.value;
        setYear(parseInt(value));  
    }

    let monthHandler = (event) => {
        let value = event.target.value;
        setMonth(parseInt(value));  
    }

    let dayHandler = (event) => {
        let value = event.target.value;
        setDay(parseInt(value));  
    }

    return(
        <form>
            <select id="year" value={year} onChange={(e) => yearHandler(e)}>
                {yearList}
            </select>
            <select id="month" value={month} onChange={(e) => monthHandler(e)}>
                {monthList}
            </select>
            <select id="day" value={day} onChange={(e) => dayHandler(e)}>
                {dayList}
            </select>
        </form>
    )
}

export default DateList;