import React, {useState, useEffect} from 'react';
import Media from '../MediaContainer/MediaContainer.js';
import axios from 'axios';
import styled from 'styled-components';

const MainDiv = styled.div``;
const SearchContainer = styled.div`
    padding: 25px;
    flex-direction: column;
    justify-content: space-around;
`;

const DateList = (props) => {
    const thisYear = new Date().getFullYear();
    const thisMonth = new Date().getMonth()+1;
    const thisDay = new Date().getDate();
    const yearArray = [];
    const monthArray = [];
    const dayArray = [];

    const [year, setYear] = useState(thisYear);
    const [month, setMonth] = useState(new Date().getMonth()+1)
    const [day, setDay] = useState(new Date().getDate())
    const [days, setDays] = useState();

    for (let i = 1995; i <= thisYear; i++) {
        yearArray.push(i);
    }

    if (year === 1995) {
        for (let i = 6; i <= 12; i++) {
            monthArray.push(i);
        }
        if (month < 6) {
            setMonth(6);
            if (day < 20) {
                setDay(20);
            }
        }
    } else if (year === thisYear) {
        if (month > thisMonth) {
            setMonth(thisMonth)
        }
        for (let i = 1; i <= thisMonth; i++) {
            monthArray.push(i);
        }
    } else {
        for (let i = 1; i <= 12; i++) {
            monthArray.push(i);
        }
    }

    useEffect(() => {
        switch (month) {
            case 2:
                if (year % 4 === 0) {
                    setDays(29);
                    if (day > 29) {
                        setDay(29);
                    }
                } else {
                    setDays(28);
                    if (day > 28) {
                        setDay(28)
                    }
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                setDays(30);
                if (day > 30) {
                    setDay(30);
                }
                break;
            default:
                setDays(31);
                break;
        }
    },[month,year,day])
    
    if (year === 1995 && month === 6) {
        for (let i = 20; i <= days; i++) {
            dayArray.push(i);
        }
    } else if (year === thisYear && month === thisMonth) { 
        for (let i = 1; i <= thisDay; i++) {
            dayArray.push(i);
        }
        if (day > thisDay) {
            setDay(thisDay);
        }
    } else {
        for (let i = 1; i <= days; i++) {
            dayArray.push(i);
        }
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

    const [data, setData] = useState(Object);
    useEffect(() => {
        axios
            .get(`https://api.nasa.gov/planetary/apod?api_key=VSDX406ElKtT7Zaql3PPtpmCz7yhy6tKEgRV796g&date=${year}-${month}-${day}`)
            .then(response => {
                console.log(response.data);
                setData(response.data);
            }).catch(err => console.log(err));   
    }, [year,month,day,setData])
    
    return(
        <MainDiv>
            <SearchContainer>
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
            </SearchContainer>
            <Media copyright={data.copyright ? data.copyright : ''} date={data.date} explanation={data.explanation} media_type={data.media_type} title={data.title} url={data.hdurl ? data.hdurl : data.url} />
        </MainDiv>
    )
}

export default DateList;