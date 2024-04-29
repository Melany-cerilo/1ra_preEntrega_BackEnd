export const generateProductPropertyMissingInfo = (product) => {
  return `Una o más propiedades estaban incompletas
      Lista de propiedades requeridas:
      * title: Se recibió ${product.title}
      * description: Se recibió ${product.description}
      * price: Se recibió ${product.price}
      * code: Se recibió ${product.code}
      * stock: Se recibió ${product.stock}
      * category: Se recibió ${product.category}
     `;
};

export const generateProductCodeDuplicateInfo = (code) => {
  return `Código ${code} ya existe en base de datos`;
};

export const generateDataBaseInfo = () => {
  return "Error inesperado en base de datos";
};
export const generateProductNotFoundInfo = () => {
  return "No se encontró el producto indicado";
};
