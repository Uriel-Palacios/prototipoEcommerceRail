class ProductoService {
    // URL_PRODUCTOS = 'https://633ccbc0f2b0e623dc67cb35.mockapi.io/productos/'
    URL_PRODUCTOS = '/api/productos/'

    async obtenerProductosService() {
        let productos = await http.get(this.URL_PRODUCTOS)
        return productos
    }
    
    async guardarProductoServcie(producto) {
        const productoGuardado = await http.post(this.URL_PRODUCTOS, producto)
        // console.log(productoGuardado)
        return productoGuardado
    }
    
    async actualizarProductoService(id, producto) {
        const productoActualizado = await http.put(this.URL_PRODUCTOS, id, producto)
        return productoActualizado
    
    }
    
    async borrarProductoService(id) {
        const productoBorrado = await http.del(this.URL_PRODUCTOS, id)
        // console.log(productoBorrado)
        return productoBorrado
    
    }
}

const productoService = new ProductoService()