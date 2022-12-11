class CarritoController extends CarritoModel {

    constructor() {
        super()

        try {
            
            this.carrito = JSON.parse(localStorage.getItem('carrito')) || []

        } catch (error) {
            
            console.error('Algo ocurrió con la lectura del localStorage', error)
            this.carrito = []
            localStorage.setItem('carrito', this.carrito)

        }

    }
    
    elProductoEstaEnElCarrito(producto) {
        console.log(producto)
        // console.log(producto.id)
        const tengoProductos = this.carrito.filter(prod => prod.id == producto.id).length
        
        return tengoProductos
    }

    obtenerProductoDeCarrito(producto) {
        return this.carrito.find(prod => prod.id == producto.id)
    }

    agregarAlCarrito(producto) {
        console.log(producto)


        if(!this.elProductoEstaEnElCarrito(producto)) {
            producto.cantidad = 1
            this.carrito.push(producto)
        } else {
            const productoDeCarrito = this.obtenerProductoDeCarrito(producto)
            productoDeCarrito.cantidad++
        }

        localStorage.setItem('carrito', JSON.stringify(this.carrito))

    }

    async borrarProductoCarrito(id) {

        try {
            const index = this.carrito.findIndex(prod => prod.id == id)
            this.carrito.splice(index, 1)
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
    
            await renderTablaCarrito(this.carrito)
        
            
        } catch (error) {
            console.error(error)
        }

        
    }

    async enviarCarrito() {
        try {

            const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
        
            elemSectionCarrito.innerHTML = '<img src="../img/carrito/x.svg" alt="cerrar" id="cerrar-carrito" onclick="cerrarCarrito()"> <img src="../img/carrito/spinner.svg" alt="enviando" class="carrito-enviando"><h2 class="carrito-h2-enviando">Enviando carrito...</h2>'
            const preference = await carritoService.guardarCarritoServicio(this.carrito)
            this.carrito = []
            localStorage.setItem('carrito', JSON.stringify(this.carrito))
    
            elemSectionCarrito.innerHTML = '<img src="../img/carrito/x.svg" alt="cerrar" id="cerrar-carrito" onclick="cerrarCarrito()"> <img src="../img/carrito/check.gif" alt="enviado" class="carrito-enviado"><h2 class="carrito-h2-enviado">Carrito enviado</h2>'

            setTimeout( async () => {
                elemSectionCarrito.classList.remove('section-carrito--visible')
                mostrarCarrito = false
                console.log(preference)
                await renderPago(preference)
            }, 0)
        } catch (error) {
            console.error(error)
        }

    }

}

const carritoController = new CarritoController()