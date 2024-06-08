import { TokenService } from "./token.service";

export class UserService {
  private tokenService: TokenService;

  constructor() {
    this.tokenService = new TokenService();
  }

  async createUser(
    realmName: string,
    username: string,
    password: string,
    attributes?: Record<string, string>
  ): Promise<void> {
    const got = await import("got");

    const token = await this.tokenService.getAdminToken();
    const url = `http://localhost:8080/admin/realms/${realmName}/users`;
    await got.post(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        enabled: true,
        credentials: [{ type: "password", value: password }],
        attributes: attributes || {},
      }),
    });
  }

  async updateUserAttributes(
    realmName: string,
    username: string,
    attributes: Record<string, string>
  ): Promise<void> {
    const got = await import("got");

    const token = await this.tokenService.getAdminToken();
    const userId = await this.getUserId(realmName, username, token);
    const url = `http://localhost:8080/admin/realms/${realmName}/users/${userId}`;
    await got.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ attributes }),
    });
  }

  async getUserId(
    realmName: string,
    username: string,
    token: string
  ): Promise<string> {
    const got = await import("got");

    const url = `http://localhost:8080/admin/realms/${realmName}/users?username=${username}`;
    const response = await got.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const users = JSON.parse(response.body) as { id: string }[];
    return users[0].id;
  }
}
