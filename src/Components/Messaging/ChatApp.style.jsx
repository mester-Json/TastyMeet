import styled from 'styled-components';
export const MessageBar = styled.div`
  margin-top:10px;
  margin-left:auto;
  margin-right:auto;
  border-radius: 50px;    
  display: flex;
  align-items: center;
  width: 90%;
  background-color: #5E3826;
  padding: 10px;
  box-sizing: border-box;
`;

export const Avatar = styled.div`
  flex-shrink: 0;
  margin-right: 10px;

  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

export const MessageContent = styled.div`
margin-top:auto;
margin-bottom:auto;
margin-right:10px;
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
