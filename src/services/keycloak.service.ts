import { UserService } from "./user.service.js";
import { TokenService } from "./token.service.js";

export class KeyCloakService {
  private userService: UserService;
  private tokenService: TokenService;

  constructor() {
    this.userService = new UserService();
    this.tokenService = new TokenService();
  }

  async createRealm(realmName: string): Promise<void> {
    const got = await import("got");
    const token = await this.tokenService.getAdminToken();
    const url = `http://localhost:8080/admin/realms`;

    await got.post(url, {
      body: JSON.stringify({ realm: realmName, enabled: true }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async createRole(realmName: string, roleName: string): Promise<void> {
    const got = await import("got");

    const token = await this.tokenService.getAdminToken();
    const url = `http://localhost:8080/admin/realms/${realmName}/roles`;

    await got.post(url, {
      body: JSON.stringify({ name: roleName }),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async assignRoleToUser(
    realmName: string,
    username: string,
    roleName: string
  ): Promise<void> {
    const got = await import("got");

    const token = await this.tokenService.getAdminToken();
    const userId = await this.userService.getUserId(realmName, username, token);
    const roleId = await this.getRoleId(realmName, roleName, token);
    const url = `http://localhost:8080/admin/realms/${realmName}/users/${userId}/role-mappings/realm`;

    await got.post(url, {
      body: JSON.stringify([{ id: roleId, name: roleName }]),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
  }

  async setAttributeLimit(
    realmName: string,
    username: string,
    attribute: string,
    limit: number
  ): Promise<boolean> {
    const got = await import("got");

    const token = await this.tokenService.getAdminToken();
    const userId = await this.userService.getUserId(realmName, username, token);
    const url = `http://localhost:8080/admin/realms/${realmName}/users/${userId}`;

    const response = await got.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const user = JSON.parse(response.body);
    const currentSessions = parseInt(user.attributes?.[attribute] || "0");

    if (currentSessions < limit) {
      user.attributes = {
        ...user.attributes,
        [attribute]: (currentSessions + 1).toString(),
      };

      await got.put(url, {
        body: JSON.stringify(user),
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      return true;
    } else {
      return false;
    }
  }

  private async getRoleId(
    realmName: string,
    roleName: string,
    token: string
  ): Promise<string> {
    const got = await import("got");

    const url = `http://localhost:8080/admin/realms/${realmName}/roles/${roleName}`;
    const response = await got.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const role = JSON.parse(response.body);
    return role.id;
  }
}
