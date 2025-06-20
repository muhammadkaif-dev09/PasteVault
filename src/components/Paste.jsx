import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Paste = () => {
  const navigate = useNavigate();
  const pastes = useSelector((state) => state.paste.pastes);

  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const filteredData = pastes.filter((paste) => {
    return paste.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDelete = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
  };
  // console.log("Your result: ", filteredData);
  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-8">
      {/* 🔍 Search Input */}
      <input
        className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-700 shadow-sm"
        type="search"
        placeholder="Search pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-6">
        {/* 📄 Paste List */}
        {filteredData.length > 0 ? (
          filteredData.map((paste, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 space-y-4"
            >
              {/* Paste Info */}
              <div>
                <h3 className="text-xl font-semibold text-purple-600">
                  {paste.title}
                </h3>
                <p className="text-gray-700 line-clamp-3">{paste.content}</p>
              </div>

              {/* Paste Actions */}
              <div className="flex flex-row flex-wrap gap-2 mt-2 text-sm">
                <button
                  onClick={() => navigate(`/?pasteId=${paste?._id}`)}
                  className="px-3 py-1 rounded-md bg-blue-100 hover:bg-blue-200 text-blue-700 font-medium transition"
                >
                  Edit
                </button>

                <button
                  onClick={() => navigate(`/pastes/${paste?._id}`)}
                  className="px-3 py-1 rounded-md bg-green-100 hover:bg-green-200 text-green-700 font-medium transition"
                >
                  View
                </button>

                <button
                  onClick={() => handleDelete(paste?._id)}
                  className="px-3 py-1 rounded-md bg-red-100 hover:bg-red-200 text-red-700 font-medium transition"
                >
                  Delete
                </button>

                <button
                  onClick={async () => {
                    try {
                      await navigator.share({
                        title: paste?.title,
                        text: paste?.content,
                        url: "https://www.google.com/" + paste?._id,
                      });
                      toast.success("Shared successfully!");
                    } catch (err) {
                      toast.error("Share failed or canceled.");
                    }
                  }}
                  className="px-3 py-1 rounded-md bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium transition"
                >
                  Share
                </button>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success("Copied to Clipboard");
                  }}
                  className="px-3 py-1 rounded-md bg-yellow-100 hover:bg-yellow-200 text-yellow-700 font-medium transition"
                >
                  Copy
                </button>
              </div>

              {/* Timestamp */}
              <div className="text-sm text-gray-400 mt-2">
                {new Date(paste.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
