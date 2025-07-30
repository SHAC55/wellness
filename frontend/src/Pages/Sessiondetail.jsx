import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import wellnessContext from "../context/wellnessContext";

const Sessiondetail = () => {
  const { id } = useParams();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const { token } = useContext(wellnessContext);

  const fetchSession = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/session/my-sessions/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSession(res.data.session);
    } catch (error) {
      console.error("Error fetching session:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!session) return <p>Session not found</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto mt-10 border">
      <h2 className="text-3xl font-bold mb-2">{session.title}</h2>

      <p className="text-gray-600 mb-4">{session.description}</p>

      <div className="mb-4">
        <span className="font-medium">Status:</span>{" "}
        <span
          className={`px-2 py-1 text-sm rounded ${
            session.status === "published"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {session.status}
        </span>
      </div>

      <div className="mb-4">
        <span className="font-medium">Tags:</span>{" "}
        {session.tags?.length > 0 ? (
          <div className="flex flex-wrap gap-2 mt-2">
            {session.tags.map((tag, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-gray-500">No tags</span>
        )}
      </div>

      <div className="mb-4">
        <span className="font-medium">JSON File:</span>{" "}
        {session.json_file_url ? (
          <a
            href={session.json_file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 underline"
          >
            View JSON
          </a>
        ) : (
          <span className="text-gray-500">Not uploaded</span>
        )}
      </div>

      <div className="mt-6 text-sm text-gray-500">
        <p>
          <strong>Created At:</strong>{" "}
          {new Date(session.created_at).toLocaleString()}
        </p>
        <p>
          <strong>Last Updated:</strong>{" "}
          {new Date(session.updated_at).toLocaleString()}
        </p>
        <p>
          <strong>Session ID:</strong> {session._id}
        </p>
        <p>
          <strong>Owner (user_id):</strong> {session.user_id}
        </p>
      </div>
    </div>
  );
};

export default Sessiondetail;
