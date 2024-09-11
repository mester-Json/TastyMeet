import { Nav } from "../Components/Nav/Nav.jsx";
import { Footer } from "../Components/Footer/Footer.jsx";
import CartMessaging from '../Components/Messaging/CartMessaging.jsx'
import CountMessaging from "../Components/Messaging/CountMessaging.jsx";

//List des messages reçu

function Messaging() {
    return (
        <>
            <Nav />
            <CountMessaging />
            <CartMessaging />
            <CartMessaging />
            <CartMessaging />
            <CartMessaging />
            <CartMessaging />
            <Footer />
        </>
    );
}


export default Messaging;