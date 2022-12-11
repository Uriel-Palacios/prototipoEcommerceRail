function initContacto() {
  console.warn("initContacto()")

  textarea = document.querySelector('main form textarea')
  inputsNodes = document.querySelectorAll("main form input")
  inputs = []

  for (let i = 0; i < inputsNodes.length; i++) {
    inputs.push(inputsNodes[i])
    
  }

  form = document.querySelector("main form")
  button = document.querySelector("main form button")
  inputs.push(textarea)

  camposValidos = [false, false, false, false]
  regExpValidar = [
    /^.+$/, // regexp nombre
    /^.+$/, // regexp apellido
    /^.+$/, // regexp mail
    /^.+$/, // regexp consulta
  ]

  button.disabled = true

  inputs.forEach((input, index) => {
    input.addEventListener("input", () => {
      validar(input.value, regExpValidar[index], index)
    })
  })

  form.addEventListener("submit", (e) => {
    e.preventDefault()

    const comentario = leerComentarioIngresado()
    limpiarFormulario()


    if (contactoController.guardarComentario) contactoController.guardarComentario(comentario)
  })


  function algunCampoValido() {
    let valido =
      camposValidos[0] &&
      camposValidos[1] &&
      camposValidos[2] &&
      camposValidos[3] 

    return !valido
  }

  function validar(valor, validador, index) {
    if (!validador.test(valor)) {
      setCustomValidityJS("Este campo no es válido", index)
      camposValidos[index] = false
      button.disabled = true
      return null // break
    }

    camposValidos[index] = true
    button.disabled = algunCampoValido() // boolean

    setCustomValidityJS("", index)
    return valor
  }
  
  function setCustomValidityJS(mensaje, index) {
    let divs = document.querySelectorAll("form div")
    divs[index].innerHTML = mensaje
    divs[index].style.display = mensaje ? "block" : "none"
  }

  function leerComentarioIngresado() {
    return {
      nombre: inputs[0].value,
      apellido: inputs[1].value,
      email: inputs[2].value,
      consulta: inputs[3].value,
    }
  }

  function limpiarFormulario() {
    inputs.forEach((input) => {
      if (input.type != "checkbox") input.value = ""
      else if (input.type == "checkbox") input.checked = false
    })

    button.disabled = true
    camposValidos = [false, false, false]
  }
}
