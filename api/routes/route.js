import express from "express";
import {
  addProduct,
  getProducts,
  getProduct,
  editProduct,
  deleteProduct,
} from "../controller/product-controller.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Products Management
 *   description: API endpoints for managing all products
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       required:
 *         - productName
 *         - productOwnerName
 *         - developers
 *         - scrumMasterName
 *         - startDate
 *         - methodology
 *       properties:
 *         productName:
 *           type: string
 *           description: The name of the product
 *         productOwnerName:
 *           type: string
 *           description: The name of the product owner
 *         developers:
 *           type: array
 *           items:
 *              type: string
 *           description: An array of developers
 *         scrumMasterName:
 *           type: string
 *           description: The name of the scrum master
 *         startDate:
 *           type: string
 *           format: date
 *           description: The start date of the product (YYYY-MM-DD)
 *         methodology:
 *           type: string
 *           description: The methodology of the product being developed
 *
 */

/**
 * @swagger
 * /add:
 *   post:
 *     summary: Add a new product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: New product successfully added
 *       400:
 *         description: Invalid request parameters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /all:
 *   get:
 *     summary: Get all products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /product/{productId}:
 *   get:
 *     summary: Get a specific product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product information for the specified ID
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /edit/product/{productId}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Product information updated successfully
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /delete/product/{productId}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       400:
 *         description: Invalid request parameters
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

router.post("/add", addProduct);
router.get("/all", getProducts);
router.get("/product/:productId", getProduct);
router.put("/edit/product/:productId", editProduct);
router.delete("/delete/product/:productId", deleteProduct);

export default router;
