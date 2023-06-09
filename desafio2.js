const { promises: fs } = require("fs");

class ProductManager {
  async getProducts() {
    try {
      const content = JSON.parse(
        await fs.readFile(`./productos.json`, "utf-8")
      );

      return content;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  async addProduct(prod) {
    try {
      const saveCont = await this.getProducts();

      const codeExists = saveCont.some((product) => product.code === prod.code);
      if (codeExists) {
        console.log(`Ya existe un producto con el código ${prod.code}`);
        return;
      }

      if (!prod.titulo ||!prod.descripcion ||!prod.precio ||!prod.code ||!prod.thumbnail ||!prod.stock) 
      {
        console.log("Todos los campos son obligatorios");
      }

      const lastId = saveCont.length;
      const newProduct = {
        id: (lastId + 1),
        titulo: prod.titulo,
        descripcion: prod.descripcion,
        precio: prod.precio,
        code: prod.code,
        thumbnail: prod.thumbnail,
        stock: prod.stock,
      };
      await saveCont.push(newProduct);
      console.log("producto nuevo", newProduct);
      await fs.writeFile(`./productos.json`, JSON.stringify(saveCont, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
  async updateProductById(id, newProduct) {
    try {
      const products = await this.getProducts();
      const productIndex = products.findIndex((product) => product.id === id);
      if (productIndex === -1) {
        console.log(`Producto con id ${id} no encontrado`);
        return null;
      }
      const updatedProduct = { ...products[productIndex], ...newProduct };
      products[productIndex] = updatedProduct;
      await fs.writeFile(`./productos.json`, JSON.stringify(products, null, 2));
      console.log(`Producto con id ${id} actualizado:`, updatedProduct);
      return updatedProduct;
    } catch (error) {
      console.log(error);
    }
  }

  async getByid(id) {
    try {
      const prod = await rute.getProducts();
      const getByid = prod.filter((e) => e.id === id);
      console.log("producto buscado", getByid);
      return getByid;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteById(id) {
    try {
      const content = await rute.getProducts();
      const deleteByid = content.filter((e) => e.id !== id);
      console.log("producto eliminado", eliminado);
      await fs.writeFile(
        `./productos.json`,
        JSON.stringify(deleteByid, null, 2)
      );
      return deleteByid;
    } catch (error) {
      console.log(error);
    }
  }
  async deleteAll() {
    try {
      let products = await rute.getProducts();
      products.splice(0, products.length);

      await fs.writeFile(`./productos.json`, JSON.stringify(products, null, 2));
    } catch (error) {
      console.log(error);
    }
  }
}

const rute = new ProductManager("productos.json");

rute.getProducts();

//rute.addProduct(
//  {titulo:"fender stratocaster",
//  descripcion:"guitarra electrica",
//  precio:1299,
//  code:"abc001",
//  thumbnail: "wwww.xxxxx.com//jjjj.jpg",
//  stock:25}
//);
//rute.addProduct(
//  {titulo:"fender stratocaster HH",
//  descripcion:"guitarra electrica",
//  precio:1299,
//  code:"abc002",
//  thumbnail: "wwww.xxxxx.com//jjjj.jpg",
//  stock:25}
//);
//rute.addProduct(
//  {titulo:"fender telecaster HH",
//  descripcion:"guitarra electrica",
//  precio:1299,
//  code:"abc003",
//  thumbnail: "wwww.xxxxx.com//jjjj.jpg",
//  stock:25}
//);
//rute.getProducts()
//rute.getByid(2)
//rute.deleteById(3)

//rute.updateProductById(
//  1,{titulo:"fender stratocaster",
//    descripcion:"guitarra electrica",
//    precio:1500,
//    code:"abc001",
//    thumbnail: "wwww.xxxxx.com//jjjj.jpg",
//    stock:50})
