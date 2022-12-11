class CarritoService {
    // URL_CARRITO = 'https://633ccbc0f2b0e623dc67cb35.mockapi.io/carrito/'
    URL_CARRITO = '/api/carrito/'

    async guardarCarritoServicio(carrito) {
        const carritoGuardado = await http.post(this.URL_CARRITO, carrito)
        return carritoGuardado
    }

}

const carritoService = new CarritoService()