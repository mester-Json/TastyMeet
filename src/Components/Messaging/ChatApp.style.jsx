import styled from 'styled-components';


export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 70vh;
  max-width: 80%;
  margin-top: 20px;
  margin-left: auto;
  margin-right: auto;
  background-color: #775144;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
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
  padding: 10px;
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
  background-color: ${({ sender }) => (sender === 'user2' ? '#2a0800' : '#D9D9D9')};
  color: ${({ sender }) => (sender === 'user2' ? 'white' : 'black')};
  max-width: 60%;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

export const InputContainer = styled.div`
  display: flex;
  padding: 10px;
  background-color: #775144;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export const Button = styled.button`
 padding: 10px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: rgb(42, 8, 0);
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #ff6f28a1;
  }
`;