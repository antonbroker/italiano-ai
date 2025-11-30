import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import Layout from "./Layout.jsx";
import Home from "./Home";
import Chat from "./Chat";
import LessonDetail from "./LessonDetail";
import Landing from "./Landing";
import Login from "./Login";
import Register from "./Register";
import { useAuth } from "@/context/AuthContext.jsx";

function ProtectedRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

function LayoutWrapper() {
  const location = useLocation();
  const segments = location.pathname.toLowerCase().split("/").filter(Boolean);
  let currentPage = "Home";
  if (segments[0] === "chat") currentPage = "Chat";
  if (segments[0] === "lesson-detail") currentPage = "LessonDetail";

  return (
    <Layout currentPageName={currentPage}>
      <Outlet />
    </Layout>
  );
}

export default function Pages() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<LayoutWrapper />}>
            <Route path="/home" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/lesson-detail" element={<LessonDetail />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}