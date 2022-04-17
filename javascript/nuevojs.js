// Datos Venta por Sucursal

const tablaSucursal = document.querySelector('#tablaSucursal')


const datosVentasSucursal = () =>{
    tablaSucursal.innerHTML =""
    for (const sucursal of sucursales){
        tablaSucursal.innerHTML += `<td>${sucursal}</td>`+`<td>$${ventasSucursal(sucursal)}<td>`
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

const ventasVendedora = (nombre) =>{ 
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
}return masVendio
}
//console.log(ventasPorVendedora("Grace"))
//console.log(ventasVendedora("Grace"))
//console.log(contadorVentas(ventasPorVendedora("Grace")))


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
    datosVentas()

    //Nose no lo toma, no tengo ni idea ya, es algo que ver con el de componentes que no funciona....
})

// Boton Editar

const modalEditar = document.querySelector ('#modalEditar')

const iconoEditar = () =>{
    const editar = document.querySelectorAll('.editar')
    editar.forEach (boton => {
        boton.addEventListener ('click', () =>{
            modalEditar.style.display ="block"
            fondo.style.display = "block"
        })        
    })
}
iconoEditar()

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

            let guardarId = boton.getAttribute("id");
            btnEliminar.setAttribute("aceptarEliminar", guardarId);            
        })
    })
}
iconoEliminar()

const btnEliminar = document.querySelector('#btnEliminar')

const aceptarEliminar = () =>{
    const {ventas} = local

    modalEliminar.style.display = "none"
    fondo.style.display = "none"

    ventas.forEach ((venta, index) =>{
        if (index === btnEliminar.getAttribute('aceptarEliminar')){
            ventas.splice(index, 1)
            datosVentas()
            limpiarTabla()
        }
    })
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

const limpiarTabla = () => {
    tablaVentas.innerHTML = "";
  };

// Modal Nueva Venta

const selectVendedora = document.querySelector ('#selectVendedora')
const selectComponentes = document.querySelectorAll ('#selectComponentes')
const optionComponente = document.querySelectorAll('.optionComponente')
const selectSucursales = document.querySelector ('#selectSucursales')
const selectFecha = document.querySelector ('#selectFecha')

let saveData = () =>{

    let resultado = []
        
    optionComponente.forEach(componente => {
        if(componente.selected) {
            resultado.push(componente.value)
                
            //NO ME LO TOMA
        
        };
        //console.log(componente.selected)
    })


    if (selectVendedora === "" || resultado.length === 0 || selectSucursales === "" || parsearFecha(new Date(selectFecha.value),1) === ""){
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
    }
        
    
    //console.log(ventas)
}

// Modal Editar venta

const editVentas = (id) => {

    for (const option of selectVendedora){
        if (option.select === true){
            ventas[id].nombreVendedora = option.value
        }
    }
    for (const option of selectSucursales){
        if (option.select === true){
            ventas[id].sucursal = option.value
        }
    }
    for (const option of selectComponentes){
        if (option.select === true){
            ventas[id].componentes = option.value
        }
    }
    selectFecha.value = `${parsearFecha(ventas[id].fecha)}`

}

let dataEdit = () =>{

    let resultado = []
        
    optionComponente.forEach(componente => {
        if(componente.selected) {
            resultado.push(componente.value)
                
            //NO ME LO TOMA
        
        };
        //console.log(componente.selected)
    })

    if (selectVendedora === "" || resultado.length === 0 || selectSucursales === "" || parsearFecha(new Date(selectFecha.value),1) === ""){
    alert('Por favor complete todos los datos')   
        
    }else{

        let editarVenta = {

            fecha: parsearFecha(new Date(selectFecha),1),
            nombreVendedora: selectVendedora,
            componentes: resultado,
            sucursal: selectSucursales,

        }
        modalEditar.style.display ="none"
        modalEliminar.style.display = "none"
        ventas.push(editarVenta)
        limpiarTabla()
    }
        
    
    //console.log(ventas)
}