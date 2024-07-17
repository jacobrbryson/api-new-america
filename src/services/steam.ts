import https from 'https';
import config from '../config';

class Steam {
	async authenticateUserTicket(sessionTicket:string):Promise<any>{
		return new Promise((resolve, reject) => {
			const options = {
				host: config.steam.host ,
				port: 443,
				path: `/ISteamUserAuth/AuthenticateUserTicket/v1?key=${config.steam.key}&appid=${config.steam.appId}&ticket=${sessionTicket}&identity=${config.steam.identity}`,
				method: 'GET'
			};

			const request = https.get(options, (res) => {
				res.on('data', function (result) {
					if(res.statusCode == 200){
						resolve(JSON.parse(result));
					}else{
						console.error(result);
					}
				});
			});

			request.on('error', function(e) {
				console.error('Steam auth failed: ' + e.message);
			});

		});
	}
}

export default new Steam()