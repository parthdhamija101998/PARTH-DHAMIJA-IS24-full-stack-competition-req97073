import axios from "axios";

const URL = "http://localhost:3000/api";

export const addProduct = async (productDetails) => {
  try {
    return await axios.post(`${URL}/add`, productDetails);
  } catch (error) {
    console.log("Error while adding product details ", error);
  }
};

export const getProducts = async () => {
  try {
    return await axios.get(`${URL}/all`);
  } catch (error) {
    console.log("Error while getting all the products ", error);
  }
};

export const editProduct = async (product, productId) => {
  try {
    return await axios.put(`${URL}/edit/product/${productId}`, product);
  } catch (error) {
    console.log("Error while calling edit user API ", error);
  }
};

export const getProduct = async (productId) => {
  try {
    return await axios.get(`${URL}/product/${productId}`);
  } catch (error) {
    console.log("Error while getting the product with product ID ", error);
  }
};

export const deleteProduct = async (productId) => {
  try {
    return await axios.delete(`${URL}/delete/product/${productId}`);
  } catch (error) {
    console.log("Error while deleting the product api ", error);
  }
};