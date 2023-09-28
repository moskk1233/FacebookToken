import axios from 'axios';

class FacebookDevice {
	private ACCESS_TOKEN: string;
	constructor(ACCESS_TOKEN: string) {
		this.ACCESS_TOKEN = ACCESS_TOKEN;
	}

	public async getCode(scope: string[]) {
		const scopeString = scope.join(',');
		const response = await axios(
			'https://graph.facebook.com/v18.0/device/login',
			{
				method: 'POST',
				data: {
					access_token: this.ACCESS_TOKEN,
					scope: scope,
				},
			}
		);

		return response.data;
	}

	public async getUesrToken(code: string) {
		const response = await axios(
			'https://graph.facebook.com/v18.0/device/login_status',
			{
				method: 'POST',
				data: {
					access_token: this.ACCESS_TOKEN,
					code: code,
				},
			}
		);
		return response.data;
	}

	public async getConfirm(fields: string[], userToken: string) {
		let filedString = fields.join(',');

		const response = await axios(
			`https://graph.facebook.com/v2.3/me?fields=${filedString}&access_token=${userToken}`,
			{
				method: 'GET',
			}
		);

		return response.data;
	}
}

export default FacebookDevice;
