class ContactoService {
    URL_CONTACTO = 'https://633ccbc0f2b0e623dc67cb35.mockapi.io/contacto/'

    async obtenerComentarioService() {
        let comentarios = await http.get(this.URL_CONTACTO)
        return comentarios
    }
    
    async guardarComentarioServcie(comentario) {
        const comentarioGuardado = await http.post(this.URL_CONTACTO, comentario)
        // console.log(productoGuardado)
        return comentarioGuardado
    }
}


const contactoService = new ContactoService()