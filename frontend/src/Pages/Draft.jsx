import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import wellnessContext from "../context/wellnessContext";

const Draft = () => {
  const { token } = useContext(wellnessContext);
  const [drafts, setDrafts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDrafts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/session/my-sessions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const onlyDrafts = res.data.session.filter((s) => s.status === "draft");
      setDrafts(onlyDrafts);
    } catch (error) {
      console.error("Error fetching drafts", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  const handlePublish = async (sessionId) => {
    try {
      await axios.post(
        "http://localhost:5000/api/session/my-sessions/publish",
        { sessionId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Draft published successfully");
      fetchDrafts(); // Refresh
    } catch (err) {
      console.error("Publish failed", err);
      alert("Failed to publish");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-semibold mb-6 text-center">Draft Sessions</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : drafts.length === 0 ? (
        <p className="text-center text-gray-500">No draft sessions available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {drafts.map((session) => (
            <div
              key={session._id}
              className="bg-white p-4 rounded shadow border border-gray-200"
            >
              <h3 className="text-xl font-bold mb-2">{session.title}</h3>
              <p className="text-sm text-gray-600 mb-3">{session.description}</p>

              <div className="flex flex-wrap gap-2 mb-3">
                {session.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <Link
                  to={`/edit-session/${session._id}`}
                  className="text-blue-600 hover:underline text-sm"
                >
                  ✏️ Edit
                </Link>

                <button
                  onClick={() => handlePublish(session._id)}
                  className="text-green-600 hover:underline text-sm"
                >
                  🚀 Publish
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Draft;
