import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  FileText,
  RefreshCw,
  BookOpen,
  Layers,
  HelpCircle
} from "lucide-react";
import Quiz from "../components/Quiz";
import Flashcards from "../components/Flashcards";
import ContentBlock from "../components/ContentBlock ";
import Tab from "../components/Tab";
import api from "../api/api.js";
import toast from "react-hot-toast";

const SessionPage = () => {
  const { id } = useParams();

  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("summary");
  const [aiLoading, setAiLoading] = useState(false);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await api.get(`/sessions/${id}`);
        setSession(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  const regenerate = async (type) => {
    try {
      setAiLoading(true);
      const res = await api.post(`/ai/${type}/${id}`);

      setSession((prev) => ({
        ...prev,
        [type]: res.data[type]
      }));
      toast.success(`${type} generated succesfully`);
    } catch (err) {
      console.error(err);
      toast.error(`${type} generation error`, err);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-slate-600 font-medium">Loading session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-xl text-slate-700 font-semibold">Session not found</p>
          <p className="text-slate-500 mt-2">The requested session could not be located</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 rounded-lg p-3">
              <FileText className="w-7 h-7 text-blue-600" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-800">{session.pdfName}</h1>
              <p className="text-sm text-slate-500 mt-1">Study session materials</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-6 overflow-hidden">
          <div className="flex gap-1 p-2 bg-slate-50">
            <Tab
              label="Summary"
              icon={<BookOpen className="w-4 h-4" />}
              active={activeTab === "summary"}
              onClick={() => setActiveTab("summary")}
            />
            <Tab
              label="Flashcards"
              icon={<Layers className="w-4 h-4" />}
              active={activeTab === "flashcards"}
              onClick={() => setActiveTab("flashcards")}
            />
            <Tab
              label="Quiz"
              icon={<HelpCircle className="w-4 h-4" />}
              active={activeTab === "quiz"}
              onClick={() => setActiveTab("quiz")}
            />
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-8">
            {/* SUMMARY */}
            {activeTab === "summary" && (
              <ContentBlock
                title="Summary"
                content={session.summary}
                onRegenerate={() => regenerate("summary")}
                loading={aiLoading}
              />
            )}

            {/* FLASHCARDS */}
            {activeTab === "flashcards" && (
              <Flashcards
                flashcards={session.flashcards}
                onRegenerate={() => regenerate("flashcards")}
                loading={aiLoading}
              />
            )}

            {/* QUIZ */}
            {activeTab === "quiz" && (
              <Quiz
                quiz={session.quiz}
                onRegenerate={() => regenerate("quiz")}
                loading={aiLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionPage;