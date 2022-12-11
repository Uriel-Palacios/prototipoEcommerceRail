class ContactoController extends ContactoModel {
    constructor() {
        super()

    }

    async obtenerComentario() {
        this.comentarios = await contactoService.obtenerComentarioService()
        console.log(this.comentarios)
        return this.comentarios
    }
    
    async guardarComentario(comentario) {
    
        const comentarioGuardado = await contactoService.guardarComentarioServcie(comentario)

    }
    

}

const contactoController = new ContactoController()