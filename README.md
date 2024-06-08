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
