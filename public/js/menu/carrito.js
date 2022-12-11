let mostrarCarrito = false

let bloqueoNavBar = document.getElementsByClassName('cont-general')[0]
let bloqueoSecCards = document.querySelector('main')
let bloqueoBotNavBar = document.getElementsByClassName('nav-bar')[0]
let body = document.querySelector('body')

async function renderTablaCarrito(carrito) {

  try {

    const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
    const respuesta = await fetch('plantillas/carrito.hbs')
    const plantillaHbs = await respuesta.text()
    const template = Handlebars.compile(plantillaHbs)
    const html = template({ carrito })

    elemSectionCarrito.innerHTML = html
    elemSectionCarrito.classList.add('section-carrito--visible')
    cerrarCarrito()

  } catch (error) {
    console.error(error)
  }



}


function initCarrito() {
  console.warn("initCarrito()")


  const btnCarrito = document.getElementsByClassName("search-bar__carrito-container")[0]
  const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]



  btnCarrito.addEventListener("click", async () => {
      mostrarCarrito = !mostrarCarrito
      
      try {
        if(mostrarCarrito) {
          await renderTablaCarrito(carritoController.carrito)
          if(!carritoController.carrito.length){
            elemSectionCarrito.classList.add('section-carrito--visible--vacio')
          }
          bloqueoNavBar.classList.add('__bloqueo')
          bloqueoSecCards.classList.add('__bloqueo')
          bloqueoBotNavBar.classList.add('__bloqueo')
          body.classList.add('__stop-scroll')
        } else {
          elemSectionCarrito.classList.remove('section-carrito--visible')
        }
        
      } catch (error) {
        console.error(error)
      }


      cerrarCarrito()
      
      })


    }




function cerrarCarrito(){
  const elemSectionCarrito = document.getElementsByClassName('section-carrito')[0]
  const cerrarCarrito = document.querySelector("#cerrar-carrito") 
  cerrarCarrito.addEventListener("click", () => {
  mostrarCarrito = !mostrarCarrito
  elemSectionCarrito.classList.remove('section-carrito--visible')
  bloqueoNavBar.classList.remove('__bloqueo')
  bloqueoSecCards.classList.remove('__bloqueo')
  bloqueoBotNavBar.classList.remove('__bloqueo')
  body.classList.remove('__stop-scroll')
})
}

initCarrito()
