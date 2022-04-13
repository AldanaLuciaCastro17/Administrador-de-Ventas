//Varibales globales
const nuevaVenta = document.querySelector ('.container-modal')
const btnNuevaVenta = document.querySelector ('.btnNuevaVenta')
const btnCancelar = document.querySelector ('#cancelar')
const cargarTabla = document.querySelector ('#tablaSucursal')
const productoEstrella = document.querySelector ('#productoEstella')
const vendedorEstrella = document.querySelector ('#vendedorEstrella')
const tablaVentas = document.querySelector ('#tablaVentas')
const guardar = document.querySelector ('#guardar')




//Nueva ventana

btnNuevaVenta.addEventListener('click', () =>{
    nuevaVenta.style.display = "block"
}
)

//Btn cancelar todas las modales 

btnCancelar.addEventListener('click', () =>{
    nuevaVenta.style.display = "none"

}
)

//Abrir editar



//Carga de datos ventas x sucursal

const tablaVentasSucursal=()=>{
    cargarTabla.innerHTML=""
    for (const sucursal of sucursales){
            cargarTabla.innerHTML += `<td>${sucursal}</td>`+`<td>${ventasSucursal(sucursal)}<td>`
    }
}

//Carga de datos reportes

const cargaMejorVendedoraProducto = ()=>{
    productoEstrella.innerHTML= `${componenteMasVendido()}`
    vendedorEstrella.innerHTML= `${vendedoraDelMes()}`
}

//Carga de datos ventas

const tablaDeVentas=()=>{
    tablaVentas.innerHTML=""
    for(let i = 0; i < ventas.length; i++){
        const filasTabla=document.createElement('tr')
        tablaVentas.appendChild(filasTabla);
            filasTabla.innerHTML = `<td>${ventas[i].fecha.toLocaleDateString()}</td>` + `<td>${ventas[i].nombreVendedora}</td>` + `<td>${ventas[i].componentes}</td>` + `<td>${ventas[i].sucursal}</td>` + `<td>$${precioMaquina(ventas[i].componentes)}</td>` + `<td><button id="${i}" class="btnicon edit">&nbsp;<i class="fas fa-edit"></i>&nbsp;</button><button id="${i}" class="btnicon cancel"><i class="fas fa-trash-alt"></i></button></td>`
    }
    tablaVentasSucursal()
    cargaMejorVendedoraProducto()
}
tablaDeVentas()



// Borrar los datos 


/* Solo dios sabe como lo voy a logar */

