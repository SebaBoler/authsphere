import nock from 'nock';
import { TokenService, UserService } from '../src/services';

jest.mock('@src/services/token.service');
const mockedTokenService = TokenService as jest.MockedClass<
  typeof TokenService
>;

mockedTokenService.prototype.getAdminToken.mockResolvedValue('fake-token');

describe('UserService', () => {
  let userService: UserService;

  beforeAll(() => {
    userService = new UserService();
  });

  afterEach(() => {
    nock.cleanAll();
  });

  it('should create a user', async () => {
    const realmName = 'test-realm';
    const username = 'testuser';
    const password = 'password123';
    const attributes = { attribute1: 'value1' };

    nock('http://localhost:8080')
      .post(`/admin/realms/${realmName}/users`, {
        username,
        enabled: true,
        credentials: [{ type: 'password', value: password }],
        attributes,
      })
      .reply(201);

    await expect(
      userService.createUser(realmName, username, password, attributes)
    ).resolves.not.toThrow();
  });

  it('should update user attributes', async () => {
    const realmName = 'test-realm';
    const username = 'testuser';
    const attributes = { attribute1: 'value1' };
    const userId = '1234';

    nock('http://localhost:8080')
      .get(`/admin/realms/${realmName}/users?username=${username}`)
      .reply(200, [{ id: userId }]);

    nock('http://localhost:8080')
      .put(`/admin/realms/${realmName}/users/${userId}`, { attributes })
      .reply(204);

    await expect(
      userService.updateUserAttributes(realmName, username, attributes)
    ).resolves.not.toThrow();
  });
});
