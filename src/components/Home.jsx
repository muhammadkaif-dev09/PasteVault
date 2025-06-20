import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { addToPaste, updateToPaste } from "../redux/pasteSlice";

const Home = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  const [searchParam, setSearchParam] = useSearchParams();
  const pasteId = searchParam.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  // ✅ Hook moved to correct position
  useEffect(() => {
    if (pasteId) {
      const pasteToEdit = allPastes.find((p) => p._id === pasteId);
      if (pasteToEdit) {
        setTitle(pasteToEdit.title);
        setValue(pasteToEdit.content);
      }
    }
  }, [pasteId, allPastes]);

  const createPaste = () => {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
    }

    // Reset
    setTitle("");
    setValue("");
    setSearchParam({});

    navigate("/pastes");
  };

  return (
    <div className="max-w-5xl mx-auto mt-6 bg-white shadow-lg rounded-2xl p-6">
      {/* Title Input & Button */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <input
          className="w-full md:w-[75%] p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
          type="text"
          placeholder="Enter Your Paste Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className="hidden md:block w-full md:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transform transition duration-200 shadow-md cursor-pointer"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>

      {/* Paste Textarea */}
      <div className="mt-6">
        <textarea
          className="w-full min-h-[300px] p-4 rounded-2xl border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 text-gray-800 resize-none"
          value={value}
          placeholder="📝 Enter your paste content here..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button
          onClick={createPaste}
          className="mt-5 md:hidden w-full md:w-auto px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold hover:scale-105 transform transition duration-200 shadow-md cursor-pointer"
        >
          {pasteId ? "Update Paste" : "Create Paste"}
        </button>
      </div>
    </div>
  );
};

export default Home;
