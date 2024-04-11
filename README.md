#Proyecto integrador

- Agregando cartId a usuario y ruta current para devolver en una respuesta el usuario actual. Video demostrativo:
  https://www.loom.com/share/259c026e43474098857e4256e0b0cb81?sid=7015fead-3132-44d7-9243-005416f8de98

- Agregando bcrypt, passport y login con Github. Video demostrativo:
  https://www.loom.com/share/733a466afab445aba37e6c90d4204c14?sid=35b7a1f6-2dd7-403e-b6ad-69aae80c704a

- Agregando cookies y session al proyecto. Video demostrativo:
  https://www.loom.com/share/63b4eed03e7b4b918f9d763891175f97?sid=148cbcf4-135e-4a31-9d34-fcee1977d20a

1- Servicio de productos.

- Devuelve todos los productos:
  ![get_products](./capturas/trae%20todos%20los%20productos.png)

- Devuelve productos con limit
  ![get_products_limit](./capturas/trae%20productos%20con%20limit.png)

- Devuelve productos con limit y filtro por categoria
  ![get_products_limit_category](./capturas/trae%20prod%20con%20limit%20y%20filtro%20categoria.png)

- Devuelve productos con limit, filtrado por categoria y pagina
  ![get_products_limit_category_page](./capturas/trae%20prod%20con%20limit%20filtro%20y%20page.png)

- Devuelve un ordenamiento ascendente por precio
  ![asc_order](./capturas/ordenamiento%20ascendente.png)

- Devuelve un ordenamiento descendente por precio
  ![desc_order](./capturas/ordenamiento%20descendente.png)

- Agrega producto
  ![add_product](./capturas/producto%20agregado.png)

- No pudo agregarse un producto. El codigo esta repetido
  ![error_code](./capturas/prod%20no%20agregado.%20cod%20repetido.png)

- No pudo agregarse un producto. Faltan campos
  ![error](./capturas/prod%20no%20agregado.%20fantan%20campos.png)

- Modificación de producto
  ![modify](./capturas/modificaci%C3%B3n%20de%20producto.png)

- Error en la modificación del producto. Por que no hay cambios
  ![modify_error](./capturas/error%20en%20la%20modificacion%20no%20hay%20cambios..png)

- Error en la modificación del producto. Por que faltan campos
  ![modify_error](./capturas/error%20en%20la%20modificacion%20ingresar%20todos%20los%20campos.png)

- Devuelve producto por ID
  ![get_products_ID](./capturas/trae%20producto%20por%20id.png)

- Error al no encontrar por ID
  ![error_get_products_ID](./capturas/error%20no%20encuentra%20id.png)

- Borrado de producto
  ![deleted](./capturas/producto%20eliminado.png)

- Error al querer borrar producto. No lo encuentra para eliminar
  ![deleted_error](./capturas/error%20no%20encuentra%20para%20eliminar.png)

- VISTAS:

- http://localhost:8080
  ![views](./capturas/localhost8080.png)

- PAGINACIÓN 1
  ![views](./capturas/paginate1.png)
- PAGINACIÓN 2
  ![views](./capturas/paginate2.png)
- PAGINACIÓN 3
  ![views](./capturas/paginate3.png)

- Carrito con sus productos
  ![views](./capturas/vista%20carrito%20con%20prods.png)
- El carrito mostrado en la vista existente en DB
  ![views](./capturas/carrito%20mostrado%20ahora%20db.png)

2- Servicio para carrito

- Creación de un carrito
  ![create_cart](./capturas/creacion%20de%20carrito.png)

- Agrego producto al carrito
  ![add_prod_cart](./capturas/agrego%20producto%20a%20mi%20carrito.png)

- Error. Si ingresa mal el ID del carrito donde quiero meter el producto
  ![error_add_prod_cart](./capturas/error%20si%20pongo%20mal%20el%20id%20del%20carrito%20donde%20quiero%20poner%20producto.png)

- Devuelve carrito por ID
  ![get_cart_id](./capturas/traigo%20carrito%20por%20id.png)

- Error. Si no encuentra carrito por ID
  ![error_get_cart_id](./capturas/si%20esta%20mal%20el%20id%20no%20encuentra%20carrito.png)

- Devuelve todos los carritos
  ![get_carts](./capturas/trae%20todos%20los%20carritos.png)

- Eliminación de un producto del carrito seleccionado
  ![delete_pord_cart](./capturas/eliminacion%20de%20un%20producto%20del%20carrito.png)

- Error. Querer eliminar un producto que no existe en el carrito seleccionado
  ![error_delete_pord_cart](./capturas/quiero%20eliminar%20el%20mismo%20producto%20del%20carrito%20y%20no%20existe.png)

- PRE eliminación de todos los productos del primer carrito
  ![delete](./capturas/antes%20de%20eliminar%20todos%20los%20productos%20del%201er%20carrito.png)

- Eliminación de TODOS los productos del carrito
  ![delete](./capturas/eliminacion%20de%20todos%20los%20productos%20del%20carrito.png)

- Muestro que los productos quedaron eliminados
  ![delete](./capturas/muestro%20que%20el%20carrito%20queda%20sin%20productos.png)

- PRE MODIFICACIÓN de productos dentro del carrito seleccionado
  ![modify](./capturas/carrito%20antes%20de%20la%20modificacion%20de%20productos.png)

- POST MODIFICACIÓN de productos dentro del carrito seleccionado
  ![modify](./capturas/carrito%20despues%20de%20la%20modificacion%20de%20productos..png)

- MODIFICACIÓN APLICADA al carrito
  ![modify](./capturas/carrito%20con%20la%20nueva%20modificacion%20de%20productos.png)

- Modificación de la cantidad de productos en el carrito
  ![modify](./capturas/modificacion%20de%20la%20cantidad%20de%20un%20producto%20del%20carrito.png)

- Visualización de la modificación de la cantidad aplicada
  ![modify](./capturas/muestro%20la%20modificacion%20de%20la%20cantidad%20del%20producto%20en%20el%20carrito.png)

3- Servicio de mensajes mediante formulario

- Get messages
  ![get_messages](./capturas/trae%20todos%20los%20mensajes.png)

- Get message by ID
  ![get_messages_by_id](./capturas/trae%20mensaje%20por%20id.png)

- Deleted message
  ![delete_message](./capturas/borra%20mensaje%20por%20id.png)

4- Message sent from the form

![form](./capturas/formulario%20handlebars.png)
![form_ok](./capturas/viaja%20info%20desde%20el%20front.png)
![data_form_in_db](./capturas/llega%20el%20mensaje%20a%20la%20db.png)
