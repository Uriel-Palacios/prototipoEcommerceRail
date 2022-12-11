const ProductoModel = require("../model/productos");
const ProductoValidation = require("../utils/producto.validation");

const model = ProductoModel.get(process.env.PERSISTENCIA || 'MONGODB') // FILE O MONGO

const obtenerProducto = async id => {
    let producto = await model.readProducto(id)
    return producto
}

const obtenerProductos = async () => {
    let productos = await model.readProductos()
    console.log(productos)
    return productos
}

const guardarProducto = async (producto) => {

    const errorValidacion = ProductoValidation.validar(producto)

    if(!errorValidacion) {
        const productoGuardado = await model.createProducto(producto)
        return productoGuardado
    } else {
        console.log('Error en GuardarProducto', errorValidacion.details[0].message)
        return {}
    }

}

const actualizarProducto = async (id, producto) => {

    const errorValidacion = ProductoValidation.validar(producto)

    if(!errorValidacion) {
        const productoActualizado = await model.updateProducto(id, producto)
        return productoActualizado
    } else {
        console.log('Error en ActualizarProducto', errorValidacion.details[0].message)
        return {}
    }

}

const borrarProducto = async id => {
    const productoEliminado = await model.deleteProducto(id)
    return productoEliminado
}

module.exports = {
    obtenerProducto,
    obtenerProductos,
    guardarProducto,
    borrarProducto,
    actualizarProducto,
}