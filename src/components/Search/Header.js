import React from 'react';
import styled from 'styled-components';

const HeaderDiv = styled.div`
    padding: 15px;
    display: flex;
    padding: 0 calc((100% - 1280px) / 2);
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