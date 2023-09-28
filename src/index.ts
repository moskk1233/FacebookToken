import axios from 'axios';

type AccessToken = {
	app_id: string;
	client_token: string;
};
/**
 *  FacebookDevice เป็น libray ที่ใช้สำหรับการทำล็อกอินแบบ Token ใน Facebook
 */
class FacebookDevice {
	private accessToken: AccessToken;
	private app_id: string;
	private client_token: string;
	private ACCESSTOKEN: string;
	private ENDPOINT = 'https://graph.facebook.com/v18.0';

	/**
	 *
	 * @param {AccessToken} accessToken
	 */
	constructor(accessToken: AccessToken) {
		this.accessToken = accessToken;
		this.app_id = this.accessToken.app_id;
		this.client_token = this.accessToken.client_token;
		this.ACCESSTOKEN = `${this.app_id}|${this.client_token}`;
	}

	/**
	 *
	 * @param {string} scope
	 * @returns
	 */
	public async getDeviceCode(scope: string[]) {
		const scopeString = scope.join(',');
		const response = await axios(`${this.ENDPOINT}/device/login`, {
			method: 'POST',
			data: {
				access_token: this.ACCESSTOKEN,
				scope: scopeString,
			},
		});

		return response.data;
	}

	/**
	 *
	 * @param {string} codeRef
	 * @returns
	 */
	public async getUesrToken(codeRef: string) {
		const response = await axios(`${this.ENDPOINT}/device/login_status`, {
			method: 'POST',
			data: {
				access_token: this.ACCESSTOKEN,
				code: codeRef,
			},
		});
		return response.data;
	}

	/**
	 *
	 * @param {string[]} fields
	 * @param {string} userToken
	 * @returns
	 */
	public async getConfirm(fields: string[], userToken: string) {
		let filedString = fields.join(',');

		const response = await axios(
			`${this.ENDPOINT}/me?fields=${filedString}&access_token=${userToken}`,
			{
				method: 'GET',
			}
		);

		return response.data;
	}
}

export default FacebookDevice;
