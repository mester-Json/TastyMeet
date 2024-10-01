import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const LinkStyle = styled(Link)`
    text-decoration: none; 
`;

export const Div = styled.div`
    height: 120px;
`;



export const MessageBar = styled.div`
    margin-left: auto;
    margin-right: auto;
    border-radius: 35px;    
    display: flex;
    align-items: center;
    width: 90%;
    background-color: #5E3826;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3); 
    transition: box-shadow 0.3s; 
    
    &:hover {
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5); 
    }
`;

export const Avatar = styled.div`
    margin-top:20px;
    margin-right: 20px;
    margin-left:20px;
    

    img {
        width: 50px;
        padding:;
        height: 50px;
        box-shadow: 0 10px 5px rgba(0, 0, 0, 0.20);

        border-radius: 50%;
        object-fit: cover;
    }
`;

export const MessageContent = styled.div`
    margin-right: 10px;
    color: white;

    h4 {
        margin: 0;
        font-size: 16px;
    }

    p {
        margin: 5px 0 0 0;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    @media screen and (max-width: 600px) {
        h4 {
            font-size: 14px;
        }

        p {
            font-size: 12px;
        }
    }
`;
