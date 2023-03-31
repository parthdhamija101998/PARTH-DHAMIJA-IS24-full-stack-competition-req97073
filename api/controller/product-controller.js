import product from "../model/product.js";

export const addProduct = (request, response) => {
  const Product = request.body;
  const newProduct = new product(Product.productName, Product.productOwnerName, Product.developers, Product.scrumMasterName, Product.startDate, Product.methodology);

  try {
    product.save(newProduct);
    response.status(200).json(newProduct);
  } catch (error) {
    response.status(409).json({ message: error.message });
  }
};

export const getProducts = (request, response) => {
  try {
    const Products = product.find({});
    response.status(200).json(Products);
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const getProduct = async (request, response) => {
  try {
    const productId = request.params.productId;
    const Product = await product.findById(productId);
    if (Product) {
      return response.status(200).json(Product);
    } else {
      throw new Error("Product not found");
    }
  } catch (error) {
    response.status(404).json({ message: error.message });
  }
};

export const editProduct = async (request, response) => {
  try {
    const updatedProduct = await product.updateById(request.params.productId, request.body);
    if (!updatedProduct) {
      response.status(404).json({ message: "Product not found." });
    } else {
      response.status(200).json(updatedProduct);
    }
  } catch (error) {
    response.status(500).json({ message: "Failed to update product." });
  }
};


export const deleteProduct = (request, response) => {
  try {
    const deletedProduct = product.deleteById(request.params.productId);
    if (!deletedProduct) {
      return response.status(404).json({ message: "Product not found" });
    }
    return response.status(200).json({ message: "Product deleted" });
  } catch (error) {
    return response.status(500).json({ message: error.message });
  }
};

