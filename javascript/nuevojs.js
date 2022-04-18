// Datos Venta por Sucursal

const tablaSucursal = document.querySelector('#tablaSucursal')


const datosVentasSucursal = () =>{
    tablaSucursal.innerHTML =""
    for (const sucursal of sucursales){
        tablaSucursal.innerHTML += `<td>${sucursal}</td>`+`<td>$ ${ventasSucursal(sucursal)}<td>`
    }
}
datosVentasSucursal()

// Datos Producto estrella y mejor vendedora

const productoEstrella = document.querySelector ('#productoEstrella')
const vendedoraMasIngresos = document.querySelector ('#vendedoraMasIngresos') 

const cargaProductoEstrella = () =>{
    productoEstrella.innerHTML += ` ${componenteMasVendido()}`
}

cargaProductoEstrella()

/*const ventasVendedora = (nombre) =>{ 
    return contadorVentas(ventasPorVendedora(nombre))
}

const mejorVendedoraa = ()=> {

    let acc = 0
    let masVendio =""
    for (let vendedora of vendedoras){
        if(acc < ventasVendedora(vendedora)){
           acc = ventasVendedora(vendedora)
           masVendio = vendedora
    } 
}
return masVendio
}
//console.log(ventasPorVendedora("Grace"))
//console.log(ventasVendedora("Grace"))
//console.log(contadorVentas(ventasPorVendedora("Grace")))*/


const cargaMejorVendedora = () =>{
    vendedoraMasIngresos.innerHTML += ` ${mejorVendedoraa()}`
}

cargaMejorVendedora()

// Datos Ventas

const tablaVentas = document.querySelector ('#tablaVentas')

const datosVentas = () =>{

    tablaVentas.innerHTML=""
    for(let i = 0; i < ventas.length; i++){

        const filaTabla=document.createElement('tr')

        tablaVentas.appendChild(filaTabla);
            filaTabla.innerHTML = 
            `<td>${ventas[i].fecha.toLocaleDateString()}</td>` + `<td>${ventas[i].nombreVendedora}</td>` + `<td>${ventas[i].componentes}</td>` + `<td>${ventas[i].sucursal}</td>` + `<td>$${precioMaquina(ventas[i].componentes)}</td>` + `<td><button id="${i}" class="btnedit editar">&nbsp;<i class="fas fa-edit"></i>&nbsp;</button><button id="${i}" class="btnedit eliminar"><i class="fas fa-trash-alt"></i></button></td>`
    }
}

datosVentas()

// +Nueva Venta

const btnNuevaVenta = document.querySelector('#btnNuevaVenta')
const modalNuevaVenta = document.querySelector('#modalNuevaVenta')
const fondo = document.querySelector ('.fondo')


btnNuevaVenta.addEventListener ('click', () =>{
    modalNuevaVenta.style.display = "block"
    fondo.style.display = "block"
})

// Boton Guardar

const guardarVenta = document.querySelector ('#guardarVenta')

guardarVenta.addEventListener ('click', (e) =>{
    e.preventDefault()

    modalNuevaVenta.style.display = "none"
    fondo.style.display = "none"

    saveData()
    prueba()
    datosVentas()
    iconoEditar()
    iconoEliminar()

})

// Boton Editar

const modalEditar = document.querySelector ('#modalEditar')

let idIcono = ''

const iconoEditar = () =>{
    const editar = document.querySelectorAll('.editar')
    editar.forEach (boton => {
        boton.addEventListener ('click', () =>{
            modalEditar.style.display ="block"
            fondo.style.display = "block"

            idIcono = boton.getAttribute('id')

            //console.log(idIcono)
            editVentas(idIcono)
        })        
    })
}
iconoEditar()

const guardarVentaEditar = document.querySelector('#guardarVentaEditar')

guardarVentaEditar.addEventListener ('click', (e) =>{
    e.preventDefault()

    modalEditar.style.display = "none"
    fondo.style.display = "none"

    edit()
    pruebaedit()
    datosVentas()
    iconoEditar()
    iconoEliminar()
})

    

/*editar.addEventListener('click', () =>{
    modalEditar.style.display = "block"
    fondo.style.display = "block"
})*/

//Boton Eliminar

const modalEliminar = document.querySelector ('#modalEliminar')

const iconoEliminar = () =>{
    const eliminar = document.querySelectorAll('.eliminar')
    eliminar.forEach(boton => {
        boton.addEventListener ('click', () =>{
            modalEliminar.style.display = "block"
            fondo.style.display = "block"

            idIcono = boton.getAttribute('id')
  
        })
    })
}
iconoEliminar()

const btnEliminar = document.querySelector('#btnEliminar')

const aceptarEliminar = () =>{
    
    const {ventas} = local

    modalEliminar.style.display = "none"
    fondo.style.display = "none"

   
    ventas.splice(idIcono, 1)

    datosVentas()
    iconoEditar()
    iconoEliminar()

}
btnEliminar.addEventListener('click', aceptarEliminar)


// NO LAS ELIMINA


/*eliminar.addEventListener('click', () =>{
    modalEliminar.style.display = "block"
    fondo.style.display = "block"
})*/

// Boton Cancelar

const btnCancelar = () =>{
    const cancelarVenta = document.querySelectorAll('#cancelarVenta')
    cancelarVenta.forEach(boton => {
        boton.addEventListener ('click', () =>{
            modalNuevaVenta.style.display ="none"
            modalEditar.style.display ="none"
            modalEliminar.style.display = "none"
            fondo.style.display = "none"            
        })
    })

}
btnCancelar()


// Funcionalidad a todo

//  Parsear Fecha

const parsearFecha = (fecha, dias) => {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
}

const parsearFecha2 = (date) =>{
    var dd = (date.getDate() < 10 ? '0' : '') + date.getUTCDate();
    var anio = date.getFullYear()
    var mm = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
              
    return `${anio}-${mm}-${dd}`
}



// Modal Nueva Venta

const selectVendedora = document.querySelector ('#selectVendedora')
const selectComponentes = document.querySelector ('#selectComponentes')
//const optionComponente = document.querySelectorAll('.optionComponente')
const selectSucursales = document.querySelector ('#selectSucursales')
const selectFecha = document.querySelector ('#selectFecha')

let resultado

let saveData = () =>{

    resultado = []


    for (let i = 0; i < selectComponentes.selectedOptions.length; i++){

        resultado[i]=(selectComponentes.selectedOptions[i].value)



    }
    //console.log(selectComponentes.selectedOptions)
        
    /*optionComponente.forEach(componente => {
        if(componente.selected) {
            resultado.push(componente.value)
                
            //NO ME LO TOMA
        
        };
        console.log(resultado)
    })*/


   /*  if (selectVendedora === "" || resultado.length > 0 || selectSucursales === "" || selectFecha.value === ""){
   alert('Por favor complete todos los datos')  
        
    }else{
        // Push Nueva Venta

        let pushVenta = {

            fecha: parsearFecha(new Date(selectFecha.value),1),
            nombreVendedora: selectVendedora.value,
            componentes: resultado,
            sucursal: selectSucursales.value,

        }
        ventas.push(pushVenta)
    } */

        
    
    //console.log(ventas)
}

const prueba = () =>{

    if (selectVendedora === "" || resultado.length === 0 || selectSucursales === "" || selectFecha.value === ""){
        alert('Por favor complete todos los datos')
    }else{

    let pushVenta = {

        fecha: parsearFecha(new Date(selectFecha.value),1),
        nombreVendedora: selectVendedora.value,
        componentes: resultado,
         sucursal: selectSucursales.value,

    }
    ventas.push(pushVenta)
}
}
// Modal Editar venta

let selectComponentesEditar = document.querySelector ('#selectComponentesEditar')
let selectVendedoraEditar = document.querySelector ('#selectVendedoraEditar')
let selectSucursalesEditar = document.querySelector ('#selectSucursalesEditar')
let selectFechaEditar = document.querySelector('#selectFechaEditar')

//console.log(selectComponentesEditar)

const editVentas = (id) => {

    for (const option of selectVendedoraEditar){
        if (ventas[id].nombreVendedora === option.value){
            option.selected = true
        }
    }
    for (const option of selectSucursalesEditar){
        if (ventas[id].sucursal === option.value){
            option.selected = true
        }
    }
    for (const option of selectComponentesEditar){

        for (const componente of ventas[id].componentes){

            if (componente === option.value){
             option.selected = true
            }
        }
    }
    selectFechaEditar.value = `${parsearFecha2(ventas[id].fecha)}`

}

let resultadoEdit

let edit = () =>{

    resultadoEdit = []


    for (let i = 0; i < selectComponentesEditar.selectedOptions.length; i++){

        resultadoEdit[i]=(selectComponentesEditar.selectedOptions[i].value)



    }
    
}

const pruebaedit = () =>{

    if (selectVendedoraEditar === "" || resultadoEdit.length === 0 || selectSucursalesEditar === "" || selectFechaEditar.value === ""){
        alert('Por favor complete todos los datos')
    }else{

    let pushVenta = {

        fecha: parsearFecha(new Date(selectFechaEditar.value),1),
        nombreVendedora: selectVendedoraEditar.value,
        componentes: resultadoEdit,
        sucursal: selectSucursalesEditar.value,

    }
    ventas[idIcono] = pushVenta
}
}

