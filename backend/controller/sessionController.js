import sessionModel from "../models/sessionModel.js";

export const getAllSession = async (req, res) => {
  try {
    const sessions = await sessionModel
      .find({ status: "published" })
      .sort({ created_at: -1 });
    res.status(200).json({ success: true, sessions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get session for personal
export const getMysessions = async (req, res) => {
  try {
    const session = await sessionModel
      .find({ user_id: req.user.id })
      .sort({ updated_at: -1 });
    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// get each session detail
export const getSessionById = async (req, res) => {
  try {
    const session = await sessionModel.findOne({
      _id: req.params.id,
      user_id: req.user.id,
    });
    if (!session)
      return res
        .status(404)
        .json({ success: false, message: "Session not found" });

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// post session
export const postSession = async (req, res) => {
  const { title, tags, description, status } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ success: false, message: "Title and description are required" });
  }
  try {
    const session = await sessionModel.create({
      user_id: req.user.id,
      title,
      description,
      tags,
      status: status || "draft",
      created_at: new Date(),
      updated_at: new Date(),
    });

    res.status(201).json({ success: true, session });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Session creation failed" });
  }
};

// 🔐 Private: Save or update a draft session
export const saveDraftSession = async (req, res) => {
  const { sessionId, title, description, tags, json_file_url } = req.body;

  if (!title) return res.status(400).json({ success: false, message: 'Title is required' });

  try {
    let session;

    if (sessionId) {
      // Update existing
      session = await sessionModel.findOneAndUpdate(
        { _id: sessionId, user_id: req.user.id },
        {
          title,
          tags,
          description,
          json_file_url,
          status: 'draft',
          updated_at: new Date(),
        },
        { new: true }
      );
    } else {
      // Create new draft
      session = await sessionModel.create({
        user_id: req.user.id,
        title,
        tags,
        json_file_url,
        status: 'draft',
      });
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Could not save draft' });
  }
};

// 🔐 Private: Publish session
export const publishSession = async (req, res) => {
  const { sessionId } = req.body;

  if (!sessionId) return res.status(400).json({ success: false, message: 'sessionId is required' });

  try {
    const session = await sessionModel.findOneAndUpdate(
      { _id: sessionId, user_id: req.user.id },
      { status: 'published', updated_at: new Date() },
      { new: true }
    );

    if (!session) return res.status(404).json({ success: false, message: 'Session not found' });

    res.status(200).json({ success: true, session });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Publish failed' });
  }
};
