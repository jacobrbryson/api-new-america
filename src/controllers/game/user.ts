import { Request, Response } from "express";
import UserService from "../../services/user";

export const setAvatar = async (req: Request, res: Response) => {
	const uuid = req.params.uuid;
	const user = await UserService.get(uuid).catch((error) => {
		console.error(error);
	});

	if (!user?.uuid)
		return res.status(500).json({ message: "Failed to get user" });

	if (req.user.uuid !== user.uuid)
		return res.status(401).json({ message: "Unauthorized" });

	user.avatarEnum = req.body.avatarEnum;

	await UserService.update(user.uuid, user).catch((error) => {
		console.error(error);
	});

	res.json(user);
};

export const setCorp = async (req: Request, res: Response) => {
	const uuid = req.params.uuid;
	const user = await UserService.get(uuid).catch((error) => {
		console.error(error);
	});

	if (!user?.uuid)
		return res.status(500).json({ message: "Failed to get user" });

	if (req.user.uuid !== user.uuid)
		return res.status(401).json({ message: "Unauthorized" });

	user.corpEnum = req.body.corpEnum;

	await UserService.update(user.uuid, user).catch((error) => {
		console.error(error);
	});

	res.json(user);
};
