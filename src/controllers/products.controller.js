import socketServer from "../app.js";
import { productService } from "../repositories/repository.config.js";
import CustomError from "../services/errors/CustomError.js";
import EErrors from "../services/errors/enums.js";
import {
  generateDataBaseInfo,
  generateProductCodeDuplicateInfo,
  generateProductPropertyMissingInfo,
  generateProductNotFoundInfo,
} from "../services/errors/info.js";

class productController {
  constructor() {
    this.productsService = productService;
  }

  getProducts = async (req, res) => {
    let limit = req.query.limit;
    let page = req.query.page;
    let sort = req.query.sort;
    let category = req.query.category;

    if (!limit) {
      limit = 10;
    }
    if (!page) {
      page = 1;
    }
    const options = {
      limit: limit,
      page: page,
    };

    if (sort === "asc") {
      options.sort = { price: 1 };
    } else if (sort === "desc") {
      options.sort = { price: -1 };
    }
    const query = {};
    if (category) {
      query.category = category;
    }
    let pagination = await this.productsService.paginateProducts(
      query,
      options
    );

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
      res
        .status(400)
        .send({ status: "error", msg: "No se encontraron productos" });
    }
  };

  createProduct = async (req, res, next) => {
    try {
      let error;
      let resultado;
      if (
        !req.body.title ||
        !req.body.description ||
        !req.body.price ||
        !req.body.code ||
        !req.body.stock ||
        !req.body.category
      ) {
        // error = "Ingresar todos los campos.";

        CustomError.createError(req, {
          message: "Error creando el producto",
          cause: generateProductPropertyMissingInfo(req.body),
          code: EErrors.PROPERTY_MISSING_ERROR,
        });
      } else {
        const product = await this.productsService.getProductByCode(
          req.body.code
        );
        if (product) {
          // error = "Error. Codigo repetido";

          CustomError.createError(req, {
            message: "Error creando el producto",
            cause: generateProductCodeDuplicateInfo(req.body.code),
            code: EErrors.PRODUCT_CODE_DUPLICATE,
          });
        } else {
          const newProduct = {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            code: req.body.code,
            stock: req.body.stock,
            category: req.body.category,
            status: true,
            owner: req.session.email,
          };
          resultado = await this.productsService.addProduct(newProduct);
          if (resultado === null) {
            CustomError.createError(req, {
              message: "Error creando el producto",
              cause: generateDataBaseInfo(),
              code: EErrors.DATABASE_ERROR,
            });
            // error = "Error de sistema";
          }
        }
      }
      if (!error) {
        res.send({
          status: "success",
          msg: "Producto agregado",
          _id: resultado.id,
        });
        socketServer.emit(
          "product_change",
          await this.productsService.getProducts()
        );
      } else {
        res.status(400).send({
          status: "error",
          msg: "Error al agregar producto: " + error,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  getProductById = async (req, res, next) => {
    try {
      let idProduct = req.params.idProduct;
      let product = await this.productsService.getProductById(idProduct);
      if (!product) {
        CustomError.createError(req, {
          message: "Error buscando el producto",
          cause: generateProductNotFoundInfo(),
          code: EErrors.PRODUCT_NOT_FOUND,
        });
        // res.send({ status: "error", msg: "No se encuentra el producto" });
      } else {
        res.send({ status: "success", payload: product });
      }
    } catch (error) {
      next(error);
    }
  };

  updateProduct = async (req, res, next) => {
    try {
      let idProduct = req.params.idProduct;
      let error;
      if (
        !req.body.title ||
        !req.body.description ||
        !req.body.price ||
        !req.body.code ||
        !req.body.stock ||
        !req.body.category
      ) {
        CustomError.createError(req, {
          message: "Error actualizando el producto",
          cause: generateProductPropertyMissingInfo(req.body),
          code: EErrors.PROPERTY_MISSING_ERROR,
        });
        // error = "Ingresar todos los campos.";
      } else {
        let resultado = await this.productsService.updateProduct(
          req.body,
          idProduct
        );
        if (resultado.matchedCount === 0) {
          error = "No se encontró producto para modificar";
        } else if (resultado.modifiedCount === 0) {
          error = "No hay cambios en el producto enviado";
        } else if (resultado === null) {
          CustomError.createError(req, {
            message: "Error actualizando el producto",
            cause: generateDataBaseInfo(),
            code: EErrors.DATABASE_ERROR,
          });
          // error = "Error de sistema";
        }
      }

      if (!error) {
        res.send({ status: "success", msg: "Producto modificado" });
        socketServer.emit(
          "product_change",
          await this.productsService.getProducts()
        );
      } else {
        res.status(400).send({ status: "error", msg: error });
      }
    } catch (error) {
      next(error);
    }
  };

  deleteProduct = async (req, res, next) => {
    try {
      let idProduct = req.params.idProduct;
      let error;
      if (req.session.role !== "admin") {
        //Si no es admin, solo puede borrar productos propios
        let product = await this.productsService.getProductById(idProduct);
        if (!product) {
          CustomError.createError(req, {
            message: "Error eliminando el producto",
            cause: generateProductNotFoundInfo(),
            code: EErrors.PRODUCT_NOT_FOUND,
          });
        } else if (product.owner !== req.session.email) {
          error =
            "No tiene permiso para eliminar un producto del cual no es dueño";
        }
      }
      if (!error) {
        let resultado = await this.productsService.deleteProduct(idProduct);
        if (resultado.deletedCount === 0) {
          CustomError.createError(req, {
            message: "Error eliminando el producto",
            cause: generateProductNotFoundInfo(),
            code: EErrors.PRODUCT_NOT_FOUND,
          });
          // error = "No se encontró producto para eliminar";
        } else if (resultado === null) {
          CustomError.createError(req, {
            message: "Error eliminando el producto",
            cause: generateDataBaseInfo(),
            code: EErrors.DATABASE_ERROR,
          });
          // error = "Error de sistema";
        }
      }
      if (!error) {
        res.send({ status: "success", msg: "Producto eliminado" });
        socketServer.emit(
          "product_change",
          await this.productsService.getProducts()
        );
      } else {
        res.status(400).send({ status: "error", msg: error });
      }
    } catch (error) {
      next(error);
    }
  };
}
export default productController;
