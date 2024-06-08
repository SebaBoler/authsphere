export class TokenService {
  async getAdminToken(): Promise<string> {
    const got = await import("got");
    const url =
      "http://localhost:8080/realms/master/protocol/openid-connect/token";

    const options = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        username: "admin",
        password: "admin_password",
        grant_type: "password",
        client_id: "admin-cli",
      }).toString(),
    };

    const response = await got.post(url, options);

    const responseBody = JSON.parse(response.body) as { access_token: string };
    return responseBody.access_token;
  }
}
