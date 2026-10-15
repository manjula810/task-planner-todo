import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import MyTasks from "./pages/MyTasks";
export default function App() {
  return (
    <div className=" box-border">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="tasks" element={<MyTasks />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
