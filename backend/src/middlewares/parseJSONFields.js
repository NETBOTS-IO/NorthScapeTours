export const parseJSONFields = (req, res, next) => {
  try {
    // First parse the blogData if it exists
    if (req.body.blogData && typeof req.body.blogData === "string") {
      try {
        const parsedData = JSON.parse(req.body.blogData);
        // Merge parsed data into req.body
        req.body = { ...req.body, ...parsedData };
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid blogData JSON format",
        });
      }
    }

    // Then ensure content is properly parsed
    if (typeof req.body.content === "string") {
      try {
        req.body.content = JSON.parse(req.body.content);
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid content JSON format",
        });
      }
    }

    next();
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "JSON parsing error",
      error: error.message,
    });
  }
};
