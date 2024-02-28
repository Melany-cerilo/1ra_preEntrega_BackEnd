import Express from "express";
import ProductManagerDb from "../dao/mongoDb/productManagerDb.js";
import socketServer from "../app.js";
const router = Express.Router();

//Middlewares
router.use(Express.json());
router.use(Express.urlencoded({ extended: true }));

//Servicio para obtener productos con posibilidad de limitar la cantidad de resultados, realizar ordenamiento asc o desc, filtrar por categoria y pagina. s
router.get("/api/products", async (req, res) => {
  const manager = new ProductManagerDb();
  let limit = req.query.limit;
  let page = req.query.page;
  let sort = req.query.sort;
  let category = req.query.category;

  let pagination = await manager.paginateProducts(limit, page, sort, category);

  if (pagination.docs.length > 0) {
    if (pagination.prevPage === null) {
    }

    let sortParam = "";
    if (sort) {
      sortParam = `&sort=${sort}`;
    }
    let categoryParam = "";
    if (category) {
      categoryParam = `&category=${category}`;
    }
    let prevLink = "";
    if (pagination.prevPage !== null) {
      prevLink =
        `/api/products?limit=${pagination.limit}&page=${pagination.prevPage}` +
        sortParam +
        categoryParam;
    }

    let nextLink = "";
    if (pagination.nextPage !== null) {
      nextLink =
        `/api/products?limit=${pagination.limit}&page=${pagination.nextPage}` +
        sortParam +
        categoryParam;
    }

    res.send({
      status: "success",
      payload: pagination.docs,
      totalPages: pagination.totalPages,
      prevPage: pagination.prevPage,
      nextPage: pagination.nextPage,
      page: pagination.page,
      hasPrevPage: pagination.hasPrevPage,
      hasNextPage: pagination.hasNextPage,
      prevLink: prevLink,
      nextLink: nextLink,
    });
  } else {
    res.send({ status: "error" });
  }
});

router.get("/api/products/:idProduct", async (req, res) => {
  //Servicio para obtener producto por ID
  const manager = new ProductManagerDb();
  let idProduct = req.params.idProduct;
  let product = await manager.getProductById(idProduct);
  if (!product) {
    res.send({ status: "error", msg: "No se encuentra el producto" });
  } else {
    res.send({ status: "success", payload: product });
  }
});

//servicio para agregar un producto
router.post("/api/products", async (req, res) => {
  const manager = new ProductManagerDb();
  let resultado = await manager.addProduct(req.body);
  if (resultado._id) {
    res.send({
      status: "success",
      msg: "Producto agregado",
      _id: resultado.id,
    });
    socketServer.emit("product_change", await manager.getProducts());
  } else {
    res.send({
      status: "error",
      msg: "Error al agregar producto: " + resultado.msg,
    });
  }
});

//servicio para actualizar un producto
router.put("/api/products/:idProduct", async (req, res) => {
  const manager = new ProductManagerDb();
  let idProduct = req.params.idProduct;
  let error = await manager.updateProduct(req.body, idProduct);
  if (!error) {
    res.send({ status: "success", msg: "Producto modificado" });
    socketServer.emit("product_change", await manager.getProducts());
  } else {
    res.send({ status: "error", msg: error });
  }
});

//servicio para eliminar un producto buscandolo por ID que se envia por parametro

router.delete("/api/products/:idProduct", async (req, res) => {
  const manager = new ProductManagerDb();
  let idProduct = req.params.idProduct;
  let error = await manager.deleteProduct(idProduct);
  if (!error) {
    res.send({ status: "success", msg: "Producto eliminado" });
    socketServer.emit("product_change", await manager.getProducts());
  } else {
    res.send({ status: "error", msg: error });
  }
});

export default router;
