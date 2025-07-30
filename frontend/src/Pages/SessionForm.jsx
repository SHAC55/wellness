import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import wellnessContext from "../context/wellnessContext";

const SessionForm = () => {
  const { token } = useContext(wellnessContext);
  const { id: sessionId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (sessionId) {
      const fetchSession = async () => {
        try {
          const res = await axios.get(`http://localhost:5000/api/session/my-sessions/${sessionId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const session = res.data.session;
          reset({
            title: session.title,
            description: session.description,
            tags: session.tags?.join(", "),
            json_file_url: session.json_file_url,
          });
        } catch (error) {
          console.error("Failed to load session", error);
        }
      };
      fetchSession();
    }
  }, [sessionId, token, reset]);

  const onSubmit = async (data, status) => {
    setLoading(true);
    const payload = {
      title: data.title,
      description: data.description,
      tags: data.tags?.split(",").map(tag => tag.trim()),
      json_file_url: data.json_file_url,
    };

    try {
      if (sessionId) {
        if (status === "draft") {
          await axios.post("http://localhost:5000/api/session/my-sessions/draft", {
            ...payload,
            sessionId,
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Draft updated");
        } else if (status === "published") {
          await axios.post("http://localhost:5000/api/session/my-sessions/publish", {
            sessionId,
          }, {
            headers: { Authorization: `Bearer ${token}` },
          });
          alert("Session published");
        }
      } else {
        await axios.post("http://localhost:5000/api/session/post", {
          ...payload,
          status,
        }, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert(status === "published" ? "Session published" : "Draft saved");
      }

      navigate("/mysession");
    } catch (error) {
      console.error("Submission failed", error);
      alert("Failed to submit session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded mt-10">
      <h2 className="text-2xl font-semibold mb-4">
        {sessionId ? "Edit Draft Session" : "Create New Session"}
      </h2>

      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className="w-full border px-3 py-2 rounded"
          />
          {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div>
          <label className="block mb-1 font-medium">Tags (comma separated)</label>
          <input
            type="text"
            {...register("tags")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">JSON File URL</label>
          <input
            type="text"
            {...register("json_file_url")}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, "draft"))}
            className="bg-gray-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            {sessionId ? "Update Draft" : "Save as Draft"}
          </button>

          <button
            type="button"
            onClick={handleSubmit((data) => onSubmit(data, "published"))}
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={loading}
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default SessionForm;