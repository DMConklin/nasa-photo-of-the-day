import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
    display: flex;
    padding: 15px calc((100% - 1280px) / 2);
`;

const LogoHeader = styled.h1`

`;

const Header = () => {
    return(
        <HeaderDiv>
            <LogoHeader>Astronomy Picture of the Day</LogoHeader>
        </HeaderDiv>
    )
}

export default Header;