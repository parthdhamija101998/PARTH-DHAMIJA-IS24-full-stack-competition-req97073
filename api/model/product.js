// import mockData from '../database/mockData.js';
import * as fs from "fs";

const jsonData = fs.readFileSync("./database/mockData.json", "utf-8");
const mockData = JSON.parse(jsonData);

// const mockDataPath = path.join(__dirname, 'database', 'mockData.json');

class Product {
  constructor(
    productName,
    productOwnerName,
    developers,
    scrumMasterName,
    startDate,
    methodology
  ) {
    const existingProducts = mockData;
    const maxProductId = existingProducts.reduce((maxId, eachProduct) => {
      const pId = parseInt(eachProduct.productId);
      return pId > maxId ? pId : maxId;
    }, 0);
    this.productId = (maxProductId + 1).toString();
    this.productName = productName;
    this.productOwnerName = productOwnerName;
    this.developers = developers;
    this.scrumMasterName = scrumMasterName;
    this.startDate = startDate;
    this.methodology = methodology;
  }

  static save(product) {
    const existingProducts = this.find();
    const maxProductId = existingProducts.reduce((maxId, eachProduct) => {
      const pId = parseInt(eachProduct.productId);
      return pId > maxId ? pId : maxId;
    }, 0);
    const productId = (maxProductId + 1).toString();
    const newProduct = { productId, ...product };
    existingProducts.push(newProduct);
    fs.writeFile(
      "./database/mockData.json",
      JSON.stringify(existingProducts),
      (err) => {
        if (err) {
          console.error(`Error writing mock data to file: ${err}`);
        } 
      }
    );
    return newProduct;
  }

  static find() {
    const jsonData = fs.readFileSync("./database/mockData.json", "utf-8");
    const mockData = JSON.parse(jsonData);
    return mockData;
  }

  static findById(productId) {
    const existingProducts = this.find();
    const fetchedProduct = existingProducts.find(
      (product) => product.productId == productId
    );
    return fetchedProduct;
  }

  static updateById(productId, updatedProduct) {
    try {
      const existingProducts = this.find();
      const productIndex = existingProducts.findIndex(
        (product) => product.productId == productId
      );
      if (productIndex === -1) {
        return null; // Product with given ID not found
      }
      const updatedProductWithId = { ...updatedProduct, productId };
      existingProducts[productIndex] = updatedProductWithId;
      fs.promises.writeFile(
        "./database/mockData.json",
        JSON.stringify(existingProducts)
      );
      return updatedProductWithId;
    } catch (error) {
      console.error(`Error updating product with id ${productId}: ${error}`);
      throw error;
    }
  }

  static deleteById(productId) {
    const existingProducts = this.find();
    const filteredProducts = existingProducts.filter(
      (product) => product.productId != productId
    );
    if (filteredProducts.length === existingProducts.length) {
      return null; // Product with given ID not found
    }
    fs.writeFile(
      "./database/mockData.json",
      JSON.stringify(filteredProducts),
      (err) => {
        if (err) {
          console.error(`Error writing mock data to file: ${err}`);
        } 
      }
    );
    return productId;
  }
}

export default Product;
