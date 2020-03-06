import React, {useState, useEffect} from 'react';
import Media from '../MediaContainer/MediaContainer.js';
import Header from './Header.js';
import axios from 'axios';
import styled from 'styled-components';

const MainDiv = styled.div`
`;
const BodyContainerDiv = styled.div`
    max-width: 1280px;
    margin: 0 auto;
`;
const SearchContainer = styled.div`
    padding: 25px;
    flex-direction: column;
    justify-content: space-around;
`;
const SubmitButton = styled.button`
    margin-top: 15px;
`;

const DateForm = styled.form`
    
`;

const SelectYear = styled.select`
    
`;
const SelectMonth = styled.select`

`;
const SelectDay = styled.select`

`;

const ApodFooter = styled.footer`
    display: flex;
    justify-content: space-around;
    align-items: flex-end;
    height: 50px;
`;

const FooterP = styled.p`
    margin: 0;
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

    const [chosenDay, setChosenDay] = useState(thisDay);
    const [chosenMonth, setChosenMonth] = useState(thisMonth);
    const [chosenYear, setChosenYear] = useState(thisYear);

    for (let i = 1995; i <= thisYear; i++) {
        yearArray.push(i);
    }

    if (chosenYear === 1995) {
        for (let i = 6; i <= 12; i++) {
            monthArray.push(i);
        }
        if (chosenMonth < 6) {
            setChosenMonth(6);
            if (chosenDay < 20) {
                setChosenDay(20);
            }
        }
    } else if (chosenYear === thisYear) {
        if (chosenMonth > thisMonth) {
            setChosenMonth(thisMonth)
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
        switch (chosenMonth) {
            case 2:
                if (chosenYear % 4 === 0) {
                    setDays(29);
                    if (chosenDay > 29) {
                        setChosenDay(29);
                    }
                } else {
                    setDays(28);
                    if (chosenDay > 28) {
                        setChosenDay(28)
                    }
                }
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                setDays(30);
                if (chosenDay > 30) {
                    setChosenDay(30);
                }
                break;
            default:
                setDays(31);
                break;
        }
    },[chosenMonth,chosenYear,chosenDay])
    
    if (chosenYear === 1995 && chosenMonth === 6) {
        for (let i = 20; i <= days; i++) {
            dayArray.push(i);
        }
    } else if (chosenYear === thisYear && chosenMonth === thisMonth) { 
        for (let i = 1; i <= thisDay; i++) {
            dayArray.push(i);
        }
        if (chosenDay > thisDay) {
            setChosenDay(thisDay);
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
        setChosenYear(parseInt(value));
    }

    let monthHandler = (event) => {
        let value = event.target.value;
        setChosenMonth(parseInt(value));
    }

    let dayHandler = (event) => {
        let value = event.target.value;
        setChosenDay(parseInt(value)); 
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

    const submitHandler = () => {
        setDay(chosenDay);
        setMonth(chosenMonth);
        setYear(chosenYear);
    }
    
    return(
        <MainDiv>
            <Header />
            <BodyContainerDiv>
                <SearchContainer>
                    <DateForm>
                        <SelectYear id="year" value={chosenYear} onChange={(e) => yearHandler(e)}>
                            {yearList}
                        </SelectYear>
                        <SelectMonth id="month" value={chosenMonth} onChange={(e) => monthHandler(e)}>
                            {monthList}
                        </SelectMonth>
                        <SelectDay id="day" value={chosenDay} onChange={(e) => dayHandler(e)}>
                            {dayList}
                        </SelectDay>
                    </DateForm>
                    <SubmitButton onClick={() => submitHandler()}>Submit</SubmitButton>
                </SearchContainer>
                <Media copyright={data.copyright ? data.copyright : ''} date={data.date} explanation={data.explanation} media_type={data.media_type} title={data.title} url={data.hdurl ? data.hdurl : data.url} />
            </BodyContainerDiv>
            <ApodFooter>
                <FooterP>This app was created using React App and NASA's APOD API</FooterP>
            </ApodFooter>
        </MainDiv>
    )
}

export default DateList;