import { Request, Response } from "express";
import HeightmapService from "../../services/heightmap";

export const generate = async (req: Request, res: Response) => {
  const params = req.params;

  const result = await HeightmapService.generate(params).catch((error) => {
    console.error(error);
  });

  if (!result)
    return res.status(500).json({ message: "Failed to get heightmap" });

  res.json(result);
};