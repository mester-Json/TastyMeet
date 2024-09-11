import { Nav } from "../Components/Nav/Nav.jsx";
import { Footer } from "../Components/Footer/Footer.jsx";
import ChatApp from "../Components/Messaging/ChatApp.jsx";

//Conversation 

function Message() {
    return (
        <>
            <Nav />
            <ChatApp />
            <Footer />
        </>
    );
}


export default Message;