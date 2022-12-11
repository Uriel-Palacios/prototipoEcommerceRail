class FormularioAlta {
    inputs = null
    form = null
    button = null
    camposValidos = [false, false, false, false, false, false]
    regExpValidar = [
        /^.+$/, // regexp nombre
        /^[0-9]+$/, // regexp precio
        /^[0-9]+$/, // regexp stock
        /^.+$/, // regexp marca
        /^.+$/, // regexp categoria
        /^.+$/, // regexp detalles
    ]

    /* ------------------- drag an drop ------------------------ */
    imagenSubida = ''
    dropArea = null
    progressBar = null
    /* ------------------- drag an drop ------------------------ */


    constructor(renderTablaAlta, guardarProducto) {
        this.inputs = document.querySelectorAll('main form input.data-validation')
        this.form = document.querySelector('main form')
        this.button = document.querySelector('main form button')

        this.button.disabled = true
        // console.log('asdasd', this.inputs)
        
        this.inputs.forEach((input, index) => {
        if(input.type != 'checkbox') {
            input.addEventListener('input', () => {
                this.validar(input.value, this.regExpValidar[index], index)
                if(renderTablaAlta) renderTablaAlta(!this.algunCampoValido(), productoController.productos)
            })
        }
        })
    
        this.form.addEventListener('submit', e => {
            e.preventDefault()

            const producto = this.leerProductoIngresado()
            this.limpiarFormulario()

            console.log(guardarProducto)
            if(guardarProducto) guardarProducto(producto)
        })

        /* ------------------- drag an drop ------------------------ */
        this.dropArea = document.getElementById('drop-area')
        this.progressBar = document.getElementById('progress-bar')

        // Para cancelar el evento automático de drag and drop

        ;['dragenter', 'dragover', 'dragleave', 'drop'].forEach( eventName => {
            this.dropArea.addEventListener(eventName, e => e.preventDefault())
            document.body.addEventListener(eventName, e => e.preventDefault())
        })

        // Para remarcar la zona de drop al arrastrar una imagen dentro de ella
        ;['dragenter', 'dragover'].forEach( eventName => {
            this.dropArea.addEventListener(eventName, () => {
                this.dropArea.classList.add('highlight')
            })
        })
        
        ;['dragleave', 'drop'].forEach( eventName => {
            this.dropArea.addEventListener(eventName, () => {
                this.dropArea.classList.remove('highlight')
            })
        })

        this.dropArea.addEventListener('drop' , e => {
            // console.log(e)
            const dataTransf = e.dataTransfer
            const files = dataTransf.files

            this.handleFiles(files)
        })

        /* ------------------- drag an drop ------------------------ */
        const inputFoto = document.querySelector('#foto')

        inputFoto.addEventListener('change', () => {
          console.log('Cambió el input')
    
          const files = inputFoto.files
    
          this.handleFiles(files)
        })
    
        }

        
    // Comprobar la validez de los campos
    algunCampoValido () {
    let valido =
        this.camposValidos[0] &&
        this.camposValidos[1] &&
        this.camposValidos[2] &&
        this.camposValidos[3] &&
        this.camposValidos[4] &&
        this.camposValidos[5]


    return !valido
}

    // Validar campos
    validar (valor, validador, index) {
    
    
    if(!validador.test(valor)) {
        this.setCustomValidityJS('Este campo no es válido', index)
        this.camposValidos[index] = false
        this.button.disabled = true
        return null // break
    }

    this.camposValidos[index] = true
    this.button.disabled = this.algunCampoValido() // boolean

    this.setCustomValidityJS('', index)
    return valor

}

    // Mostrar u ocultar el mensaje
        setCustomValidityJS(mensaje, index) {
        let divs = document.querySelectorAll('form .mensaje-validacion')
        divs[index].innerHTML = mensaje 
        divs[index].style.display = mensaje ? 'block' : 'none'
    }

    // Producto ingresado en el formulario
    leerProductoIngresado() {
    return {
        nombre: this.inputs[0].value,
        precio: this.inputs[1].value,
        stock: this.inputs[2].value,
        marca: this.inputs[3].value,
        categoria: this.inputs[4].value,
        detalles: this.inputs[5].value,
        foto: this.imagenSubida ? `/uploads/${this.imagenSubida}`: '/uploads/sinimagen.jpg',
        envio: this.inputs[6].checked
    }
}

    // Limpiamos los inputs del formulario
    limpiarFormulario() {
    
    // borro todos los inputs
    this.inputs.forEach((input) => {
        if(input.type != 'checkbox') input.value = ''
        else if(input.type == 'checkbox') input.checked = false
    })

    this.button.disabled = true
    this.camposValidos = [false, false, false, false, false, false]

    const img = document.querySelector('#gallery img')
    console.log(img)
    img.src= ''

    this.initializeProgress()
    this.imagenSubida = ''
}

/* ------------------- drag an drop ------------------------ */
initializeProgress() {
    this.progressBar.value = 0
}

updateProgress(porcentaje) {
    this.progressBar.value = porcentaje
}

previewFile(file) {
    const reader = new FileReader() //
    reader.readAsDataURL(file)
    //reader.addEventListener('loadend', () => {})
    reader.onloadend = function() {
        const img = document.querySelector('#gallery img')
        img.src = reader.result
    }
}

handleFiles = files => {
    // console.log(files)
    const file = files[0]
    this.initializeProgress()
    this.uploadFile(file)
    this.previewFile(file)
}

uploadFile = file => {
    const url = '/api/upload'

    const xhr = new XMLHttpRequest()
    const formData = new FormData()

    xhr.open('POST', url)

    xhr.upload.addEventListener('progress', e => {
      let porcentaje = (((e.loaded * 100.0) / e.total) || 100)
      this.updateProgress(porcentaje)
    })

    xhr.addEventListener('load', () => { // readyState === 4
      if ( xhr.status === 200) {
        const objImagen = JSON.parse(xhr.response) 
        this.imagenSubida = objImagen.nombre // {nombre: 'imagen.jpg'}
      }
    })

    formData.append('foto', file)
    xhr.send(formData)

  }



/* ------------------- drag an drop ------------------------ */


}

// Rendereabamos la plantilla
const renderTablaAlta = (validos, productos) => {

    const xhr = new XMLHttpRequest()
    xhr.open('get', 'plantillas/alta.hbs')
    xhr.addEventListener('load', () => {
        if(xhr.status === 200) {
            let plantillaHbs = xhr.response
            // console.log(plantillaHbs)

            let template = Handlebars.compile(plantillaHbs)

            // console.log(template)
            
            // console.warn(productos)
            let html = template({ productos, validos })
            document.getElementById('listado-productos').innerHTML = html

            // console.log(html)
        }
    })

    xhr.send()

}

    /* ----------------------------------------------------- */
    /* Inicializaciones para el funcionamiento del modulo    */
    /* ----------------------------------------------------- */
    let formularioAlta = null

    async function initAlta() {
        console.warn('initAlta()')
    
        formularioAlta = new FormularioAlta(renderTablaAlta, productoController.guardarProducto)

        const productos = await productoController.obtenerProductos()
        renderTablaAlta(null, productos)
    }
