import axios from 'axios';

type AccessToken = {
	app_id: string;
	client_token: string;
};
/**
 *  FacebookDevice เป็น libray ที่ใช้สำหรับการทำล็อกอินแบบ Token ใน Facebook
 */
export class FacebookDevice {
	private accessToken: AccessToken;
	private app_id: string;
	private client_token: string;
	private ACCESSTOKEN: string;
	private ENDPOINT = axios.create({
		baseURL: 'https://graph.facebook.com/v18.0'
	})


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
		const response = await this.ENDPOINT.post('/device/login', {
			access_token: this.ACCESSTOKEN,
			scope: scopeString
		})

		return response.data;
	}

	/**
	 *
	 * @param {string} codeRef
	 * @returns
	 */
	public async getUesrToken(codeRef: string) {
		const response = await this.ENDPOINT.post('/device/login_status', {
			access_token: this.ACCESSTOKEN,
			code: codeRef
		})
		return response.data;
	}

	/**
	 *
	 * @param {string[]} fields
	 * @param {string} userToken
	 * @returns
	 */
	public async getConfirm(fields: string[], userToken: string) {
		let fieldString = fields.join(',');
		const response = await this.ENDPOINT.get(`/me?fields=${fieldString}&access_token=${userToken}`)
		return response.data;
	}
}