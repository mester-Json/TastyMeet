import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styled from 'styled-components';


export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 65vh;
  max-width: 70%;
  margin-top: 20px;
  margin-bottom:61px;
  margin-left: auto;
  margin-right: auto;
  background-color: #775144;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  border: 8px double #2a0800;

`;

export const NomConversation = styled.div`
margin-bottom:20px;
margin-top: 15px;
text-align: center;
color: white;
`;

export const UserContainer = styled.div`
display: flex;
flex-direction: ${({ sender }) => (sender === 'user2' ? 'row' : 'row-reverse')};
`;

export const MessagesContainer = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: ${({ sender }) => (sender === 'user2' ? 'row' : 'row-reverse')};
  margin: 5px 50px;
  align-items: flex-end;
  
`;

export const MessageBubble = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ sender }) => (sender === 'user1' ? '#2a0800' : '#D9D9D9')};
  color: ${({ sender }) => (sender === 'user1' ? 'white' : 'black')};
  max-width: 400px;
  box-shadow: 0 10px 5px rgba(0, 0, 0, 0.20);
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: pre-wrap;
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #775144;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  margin-bottom:20px;
  border: 1px solid #ccc;
  border-radius: 50px;
`;

export const Icon = styled(FontAwesomeIcon)`
  font-size:20px;
  color:white;
  padding:10px;
  margin-left:10px;
  margin-bottom:25px;
  background-color: #2a0800;
  border-radius:20px;
  &:hover {
    background-color: #ff6f28a1;
    cursor:pointer;
  }
`;