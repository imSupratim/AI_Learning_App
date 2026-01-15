import { useState } from "react";
import api from "../api/api";
import { UploadCloud, FileText, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const UploadPage = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type !== "application/pdf") {
      setError("Only PDF files are allowed");
      return;
    }
    setFile(selected);
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("pdf", file);

      await api.post("/upload/pdf", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/"); // redirect to home (history)
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-gray-900 mb-1">
            📄 Upload PDF
          </h1>
          <p className="text-sm text-gray-500">
            Upload a PDF to generate summary, flashcards, and quizzes
          </p>
        </div>

        {/* Upload Box */}
        <div
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center
                    hover:border-blue-500 transition"
        >
          <UploadCloud className="mx-auto w-12 h-12 text-blue-500 mb-4" />

          <p className="mb-4 text-gray-600 text-sm">
            Select a PDF file to start learning
          </p>

          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="hidden"
            id="pdf-upload"
          />

          <label
            htmlFor="pdf-upload"
            className="inline-block cursor-pointer rounded-lg bg-blue-600 px-6 py-2.5
                   text-sm font-medium text-white hover:bg-blue-700 transition"
          >
            Choose PDF
          </label>

          {/* File Info */}
          {file && (
            <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-700">
              <FileText className="w-4 h-4 text-gray-500" />
              <span className="truncate max-w-xs">{file.name}</span>
            </div>
          )}

          {/* Error */}
          {error && <p className="mt-4 text-red-500 text-sm">{error}</p>}
        </div>

        {/* Submit Button */}
        <div className="mt-8 text-center">
          <button
            onClick={handleUpload}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg bg-green-600
                   px-8 py-2.5 text-sm font-medium text-white
                   hover:bg-green-700 transition disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload & Analyze"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
