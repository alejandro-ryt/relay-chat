import { Request, Response, NextFunction } from "express";

export const validateSearchQuery = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { searchText, page, limit } = req.query;

  // Validate searchText query
  if (!searchText || typeof searchText !== "string") {
    res.status(400).json({
      error: "searchText query parameter is required and should be a string",
    });
  }

  // Validate pagination parameters (page, limit)
  if (page && isNaN(Number(page))) {
    res.status(400).json({ error: "Page must be a number" });
  }

  if (limit && isNaN(Number(limit))) {
    res.status(400).json({ error: "Limit must be a number" });
  }

  // Default values for pagination
  req.query.page = page ? Math.max(1, Number(page)).toString() : "1";
  req.query.limit = limit
    ? Math.min(100, Math.max(1, Number(limit))).toString()
    : "10";

  // Sanitize search query
  req.query.searchText = String(searchText).trim();

  next();
};
