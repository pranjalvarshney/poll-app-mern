import { Header } from "./components/header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./components/home";
import { CreatePoll } from "./components/create";
import { PollPage } from "./components/poll";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poll/:id" element={<PollPage />} />
        <Route path="/create" element={<CreatePoll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
