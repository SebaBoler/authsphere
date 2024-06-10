# AuthSphere

AuthSphere is a middleware service for Keycloak, providing enhanced authentication capabilities.

## Features

- Integration with Keycloak
- Middleware service for authentication and authorization
- Extensible and customizable

## Prerequisites

- Node.js >= 18
- TypeScript => 5
- Keycloak server

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SebaBoler/authsphere.git
   cd authsphere

   ```

2. Install dependencies:

   ```bash
   yarn install
   ```

3. Create a .env file based on .env.example and configure your environment variables.

## Usage

1. Start the development server:

```bash
yarn dev
```

2. Build the project for production:

```bash
yarn build
```

3. Run the production server:

```bash
yarn start
```

4. To start the service with Docker Compose:

```bash
docker-compose up -d
```

## Project Structure

- src/: Source code
- test/: Test files
- config/: Configuration files

## Custom Keycloak Realm Configuration

1. Create a custom realm configuration file keycloak-realm-config.json in the config directory.
2. Update your docker-compose.yml to include the volume and import command for the custom configuration.

Example keycloak-realm-config.json:

```json
{
  "realm": "myrealm",
  "enabled": true,
  "duplicateEmailsAllowed": false,
  "passwordPolicy": "length(10) and maxLength(256) and digits(1) and lowerCase(1) and upperCase(1) and specialChars(1) and notUsername() and notEmail() and history(10)",
  "accessCodeLifespan": 60,
  "accessCodeLifespanUserAction": 60,
  "refreshTokenLifespan": 86400,
  "users": [
    {
      "username": "testuser",
      "enabled": true,
      "emailVerified": true,
      "firstName": "Test",
      "lastName": "User",
      "email": "testuser@example.com",
      "credentials": [
        {
          "type": "password",
          "value": "testpassword",
          "temporary": false
        }
      ]
    }
  ]
}
```

### Password Policy

The password policy for the Keycloak realm is configured to ensure a high level of security:

Minimum Length: Passwords must be at least 10 characters long.
Maximum Length: Passwords can be up to 256 characters long.
Complexity Requirements:
* At least 1 digit.
* At least 1 lowercase letter.
* At least 1 uppercase letter.
* At least 1 special character.
Uniqueness:
* Passwords must not contain the username or email address.
* Users cannot reuse their last 10 passwords (password history).

### User Configuration

In the provided configuration, a default user is created with the following properties:

- Username: testuser
- Enabled: The user account is enabled.
- Email Verified: The email address associated with the user account is verified.
- First Name: Test
- Last Name: User
- Email: testuser@example.com
- Credentials:
  - Type: Password
  - Value: testpassword
  - Temporary: The password is not temporary, meaning the user is not required to change it at the next login.

## Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/fooBar)
3. Commit your changes (git commit -am 'Add some fooBar')
4. Push to the branch (git push origin feature/fooBar)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Contact

For more information, visit my github profile
