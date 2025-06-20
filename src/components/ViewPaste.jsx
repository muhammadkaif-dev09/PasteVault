import { ArrowLeft, Copy } from "lucide-react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const ViewPaste = () => {
  const navigate = useNavigate();
  const { id: pasteId } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);
  const [paste, setPaste] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const match = allPaste.find((p) => p._id === pasteId);
    if (match) {
      setPaste({ title: match.title, content: match.content });
    }
  }, [allPaste, pasteId]);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white shadow-2xl rounded-3xl p-6 sm:p-10 space-y-8 relative">
      {/* 🔙 Back Button (Now inside top area) */}
      <div className="mb-4">
        <button
          onClick={() => navigate("/pastes")}
          className="flex items-center gap-2 text-purple-600 hover:text-purple-800 transition text-sm font-medium"
        >
          <ArrowLeft size={20} />
          <span className="hidden sm:inline">Back</span>
        </button>
      </div>

      {/* 📌 Paste Title */}
      <div className="w-full">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            📌 Paste Title
          </h2>
          <button
            onClick={() => handleCopy(paste.title)}
            className="text-purple-600 hover:text-purple-800"
            title="Copy Title"
          >
            <Copy size={20} />
          </button>
        </div>
        <input
          type="text"
          className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 text-gray-700 font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          value={paste.title}
          disabled
        />
      </div>

      {/* 📝 Paste Content */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
            📝 Paste Content
          </h2>
          <button
            onClick={() => handleCopy(paste.content)}
            className="text-purple-600 hover:text-purple-800"
            title="Copy Content"
          >
            <Copy size={20} />
          </button>
        </div>
        <textarea
          className="w-full min-h-[300px] p-4 rounded-xl border border-gray-300 bg-gray-100 text-gray-700 font-medium shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
          value={paste.content}
          disabled
        ></textarea>
      </div>
    </div>
  );
};

export default ViewPaste;
