import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Form from "../Pages/Form.jsx";

function App() {
    return (
          <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Form />} />
                        <Route path="*" element={<h1>404 Not Found</h1>} />
                    </Routes>
          </BrowserRouter>
    );
}

export default App;