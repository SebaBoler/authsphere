/**
 * @swagger
 * /v1/users:
 *   post:
 *     summary: Create a new user
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to create.
 *         schema:
 *           type: object
 *           required:
 *             - realmName
 *             - username
 *             - password
 *             - attributes
 *           properties:
 *             realmName:
 *               type: string
 *             username:
 *               type: string
 *             password:
 *               type: string
 *             attributes:
 *               type: object
 *     responses:
 *       201:
 *         description: User created successfully
 *       500:
 *         description: Error creating user
 */
export const createUserSwagger = {};

/**
 * @swagger
 * /v1/users:
 *   put:
 *     summary: Update user attributes
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to update.
 *         schema:
 *           type: object
 *           required:
 *             - realmName
 *             - username
 *             - attributes
 *           properties:
 *             realmName:
 *               type: string
 *             username:
 *               type: string
 *             attributes:
 *               type: object
 *     responses:
 *       200:
 *         description: User attributes updated successfully
 *       500:
 *         description: Error updating user attributes
 */
export const updateUserAttributesSwagger = {};
