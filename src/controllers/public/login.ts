import {Request, Response} from 'express';
import { encodeToken } from "../../helpers/auth";
import UserService from "../../services/user";

export const login = async (req:Request, res:Response) => {
  const steamId = req.body.steamId;
  const displayName = req.body.displayName;

  const verified = await verifySteamId(steamId, displayName).catch((error) => {
    console.error(error);
  });

  if(!verified) return res.status(403).json({message: "Invalid request, expected request body: {steamId:number, displayName:string}"});
  
  const user = await UserService.login({steamId:steamId, displayName:displayName}).catch((error:any) => {
    console.error(error);
  });

  if(!user) return res.status(500).json({message: "Unable to create user"});

  const token = encodeToken(user);

  const response = {
    accessToken: token
  }

  return res.json(response);
}

//TODO finish steam integration here...
async function verifySteamId(steamId:number, displayName:string):Promise<boolean>{
  if(isNaN(steamId) || !displayName?.length) throw({message: "Invalid login request body"});

  return true;
}