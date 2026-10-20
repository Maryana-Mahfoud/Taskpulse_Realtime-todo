import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Read from "./components/read/Read";
import Creat from "./components/creat/Creat";
import Edit from "./components/edit/Edit";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Read />} />
        <Route path="/new" element={<Creat />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Route>
    </Routes>
  );
}