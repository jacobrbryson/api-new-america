import { Request, Response } from "express";
import { encodeToken } from "../../helpers/auth";
import UserService from "../../services/user";
import SteamService from "../../services/steam";

export const login = async (req: Request, res: Response) => {
	const steamId = req.body.steamId;
	const displayName = req.body.displayName;
	const sessionTicket = req.body.sessionTicket;

	const verified = await verifySteamId(
		steamId,
		displayName,
		sessionTicket
	).catch((error) => {
		console.error(error);
	});

	if (!verified)
		return res.status(403).json({
			message:
				"Invalid request, expected request body: {steamId:number, displayName:string}",
		});

	const user = await UserService.login({
		steamId: steamId,
		displayName: displayName,
	}).catch((error: any) => {
		console.error(error);
	});

	if (!user)
		return res.status(500).json({ message: "Unable to create user" });

	const token = encodeToken(user);

	const response = {
		accessToken: token,
		user: user,
	};

	return res.json(response);
};

async function verifySteamId(
	steamId: number,
	displayName: string,
	sessionTicket: string
): Promise<boolean> {
	if (isNaN(steamId) || !displayName?.length)
		throw { message: "Invalid login request body" };

	const data = await SteamService.authenticateUserTicket(
		sessionTicket
	).catch((error) => {
		console.error(error);
	});

	if (data?.response?.params?.result != "OK")
		throw { message: "Steam auth API failure" };
	if (data.response.params.steamid !== steamId)
		throw { message: "SteamId mis-match" };
	if (data.response.params.vacbanned)
		throw { message: "User banned by valve" };
	if (data.response.params.publisherbanned)
		throw { message: "User banned by publisher" };

	return true;
}
