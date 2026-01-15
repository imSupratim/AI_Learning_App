import React from "react";
import api from "../api/api";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Flashcards from "../components/Flashcards";
import toast from "react-hot-toast";

const SeperateFlashcards = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
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
        [type]: res.data[type],
      }));
      toast.success("Flashcards generated successfully");
    } catch (err) {
      console.error(err);
      toast.error("Flashcard generation error: ",err);
    } finally {
      setAiLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <p className="text-lg text-slate-600 font-medium">
            Loading session...
          </p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-lg shadow-lg p-8">
          <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
          <p className="text-xl text-slate-700 font-semibold">
            Summary not found
          </p>
          <p className="text-slate-500 mt-2">
            The requested session could not be located
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden
                hover:shadow-md transition"
    >
      {/* Header */}
      <div className="px-6 py-4 sm:px-8 bg-slate-50 border-b border-slate-200">
        <h2 className="text-sm font-medium text-slate-700 truncate">
          📄 {session.pdfName}
        </h2>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <Flashcards
          flashcards={session.flashcards}
          onRegenerate={() => regenerate("flashcards")}
          loading={aiLoading}
        />
      </div>
    </div>
  );
};

export default SeperateFlashcards;
