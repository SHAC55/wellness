  import React, { useEffect, useState, useContext } from "react";
  import { Link } from "react-router-dom";
  import axios from "axios";
  import wellnessContext from "../context/wellnessContext";

  const MySession = () => {
    const { token } = useContext(wellnessContext);
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMySessions = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/session/my-sessions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSessions(res.data.session); // "session" as per API
      } catch (error) {
        console.error("Error fetching my sessions", error);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchMySessions();
    }, []);

    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <h2 className="text-3xl font-semibold mb-6 text-center">My Sessions</h2>

        {loading ? (
          <p className="text-center">Loading...</p>
        ) : sessions.length === 0 ? (
          <p className="text-center text-gray-500">
            You haven't created any sessions yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {sessions.map((session) => (
              <Link
                to={`/session/${session._id}`}
                key={session._id}
                className="bg-white shadow-md rounded-md p-4 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold">{session.title}</h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded ${
                      session.status === "published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {session.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 mt-2">
                  {session.tags?.map((tag, i) => (
                    <span
                      key={i}
                      className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {session.json_file_url && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      window.open(session.json_file_url, "_blank");
                    }}
                    className="text-blue-500 text-sm mt-3 hover:underline"
                  >
                    View JSON File
                  </button>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default MySession;
