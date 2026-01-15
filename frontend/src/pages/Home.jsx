import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, 
  Plus, 
  Eye, 
  FileText, 
  Layers, 
  HelpCircle, 
  Trash2,
  Calendar,
  Sparkles
} from "lucide-react";
import api from "../api/api";

const HomePage = () => {
  const navigate = useNavigate();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 AUTH GUARD
  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/login", { replace: true });
    }
  }, [navigate]);

  const fetchSessions = async () => {
    try {
      const res = await api.get("/sessions");
      setSessions(res.data);
    } catch (error) {
      console.error("Failed to fetch sessions", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSession = async (id) => {
    if (!confirm("Delete this session?")) return;

    try {
      await api.delete(`/sessions/${id}`);
      setSessions((prev) => prev.filter((s) => s._id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-indigo-600 mb-4"></div>
          <p className="text-lg text-slate-700 font-medium">Loading your sessions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-2.5 shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-3xl py-1 sm:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  Your Learning Sessions
                </h1>
              </div>
              <p className="text-slate-600 ml-12">
                Manage your study materials and track your progress
              </p>
            </div>
            <button
              onClick={() => navigate("/upload")}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
            >
              <Plus className="w-5 h-5" />
              New Upload
            </button>
          </div>
        </div>

        {/* Empty State */}
        {sessions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-12 h-12 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-3">
                Start Your Learning Journey
              </h2>
              <p className="text-slate-600 mb-6">
                Upload your first document to generate summaries, flashcards, and quizzes powered by AI
              </p>
              <button
                onClick={() => navigate("/upload")}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200 font-medium"
              >
                <Plus className="w-5 h-5" />
                Upload Your First Document
              </button>
            </div>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <div
                key={session._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl border border-slate-200 transition-all duration-300 overflow-hidden group"
              >
                {/* Card Header */}
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-white/20 backdrop-blur-sm rounded-lg p-2 flex-shrink-0">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="font-semibold text-lg text-white line-clamp-2 leading-tight">
                      {session.pdfName || "Untitled Session"}
                    </h2>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 space-y-4">
                  {/* Date */}
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(session.createdAt).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}</span>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Primary Action */}
                    <button
                      onClick={() => navigate(`/sessions/${session._id}`)}
                      className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2.5 rounded-lg transition-colors duration-200"
                    >
                      <Eye className="w-4 h-4" />
                      View Session
                    </button>

                    {/* Secondary Actions */}
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        onClick={() => navigate(`/summary/${session._id}`)}
                        className="flex flex-col items-center gap-1 bg-blue-50 hover:bg-blue-100 text-blue-600 px-3 py-2 rounded-lg transition-colors duration-200"
                        title="Summary"
                      >
                        <FileText className="w-4 h-4" />
                        <span className="text-xs font-medium">Summary</span>
                      </button>

                      <button
                        onClick={() => navigate(`/flashcards/${session._id}`)}
                        className="flex flex-col items-center gap-1 bg-green-50 hover:bg-green-100 text-green-600 px-3 py-2 rounded-lg transition-colors duration-200"
                        title="Flashcards"
                      >
                        <Layers className="w-4 h-4" />
                        <span className="text-xs font-medium">Cards</span>
                      </button>

                      <button
                        onClick={() => navigate(`/quiz/${session._id}`)}
                        className="flex flex-col items-center gap-1 bg-purple-50 hover:bg-purple-100 text-purple-600 px-3 py-2 rounded-lg transition-colors duration-200"
                        title="Quiz"
                      >
                        <HelpCircle className="w-4 h-4" />
                        <span className="text-xs font-medium">Quiz</span>
                      </button>
                    </div>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteSession(session._id)}
                      className="w-full flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 font-medium px-4 py-2 rounded-lg transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete Session
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;