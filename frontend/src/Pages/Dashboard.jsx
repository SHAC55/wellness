import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSessions = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/session/sessions");
      setSessions(res.data.sessions);
    } catch (error) {
      console.error("Error fetching sessions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-semibold mb-6 text-center">All Published Sessions</h2>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : sessions.length === 0 ? (
        <p className="text-center text-gray-500">No sessions found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {sessions.map((session) => (
            <div
              key={session._id}
              className="bg-white shadow-md rounded-md p-4 border border-gray-200"
            >
              <h3 className="text-xl font-bold mb-2">{session.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{session.description}</p>

              <div className="mb-2">
                <strong className="text-sm">Status:</strong>{' '}
                <span className={`text-xs px-2 py-1 rounded ${
                  session.status === "published"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}>
                  {session.status}
                </span>
              </div>

              <div className="mb-2 text-sm text-gray-700">
                <strong>Owner (user_id):</strong> {session.user_id}
              </div>

              <div className="mb-2 text-sm text-gray-700">
                <strong>Created At:</strong>{' '}
                {new Date(session.created_at).toLocaleString()}
              </div>

              <div className="mb-2 text-sm text-gray-700">
                <strong>Updated At:</strong>{' '}
                {new Date(session.updated_at).toLocaleString()}
              </div>

              <div className="flex flex-wrap gap-2 mt-2">
                {session.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {session.json_file_url && (
                <a
                  href={session.json_file_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-500 text-sm mt-3 hover:underline"
                >
                  View JSON File
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
