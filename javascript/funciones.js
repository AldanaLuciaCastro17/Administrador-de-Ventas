const { precios, ventas, vendedoras, sucursales} = local


//Ejercicio 1. precioMaquina(componentes): recibe un array de componentes y devuelve el precio de la máquina que se puede armar con esos componentes, que es la suma de los precios de cada componente incluido.

const precioComponentes = (componente) => {
    const { precios } = local;
    for (const precio of precios) {
      if (precio.componente === componente) {
        return precio.precio;
      }
    }
  };
  //console.log(precioComponente("Motherboard ASUS 1500"))

  const precioMaquina = (componentes) => {
    let acc = 0;
    for (const componente of componentes) {
      acc += precioComponentes(componente);
    }
    return acc;
  };
  
  
//console.log(precioMaquina(["Motherboard MZI", "RAM Quinston Fury"]))
  

//Ejercicio 2. cantidadVentasComponente(componente): recibe un componente y devuelve la cantidad de veces que fue vendido, o sea que formó parte de una máquina que se vendió. La lista de ventas no se pasa por parámetro, se asume que está identificada por la variable ventas

const cantidadVentasComponentes = (nombreComponente) =>{
    let acc = 0 
    const {ventas} = local
    for (const venta of ventas){
        for (const componente of venta.componentes){
            if(nombreComponente === componente){
                acc++
            }
        }
    }
    return acc
}

//console.log(cantidadVentasComponentes("Motherboard ASUS 1500"))

//Ejercicio 3. vendedoraDelMes(mes, anio), se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la vendedora que más vendió en plata en el mes. O sea no cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).



const ventasDelMes = (mes,anio) =>{
    return ventas.filter(ventas => ventas.fecha.getMonth() === mes -1 && ventas.fecha.getFullYear() ===anio)
}

//console.log(ventasDelMes(1,2019))

const contadorVentas = (ventas) =>{
    let acc = 0
    for(let venta of ventas){
        acc += precioMaquina(venta.componentes)
    }
    return acc
}
//console.log(contadorVentas(ventas))

const vendedoraDelMes = (mes,anio) =>{
    let acc = 0
    let vendedoraMasVendio = ""

    for (const vendedora of vendedoras) {
        if (acc < contadorVentas((ventasDelMes(mes,anio)).filter(venta =>venta.nombreVendedora === vendedora))){
            acc = contadorVentas((ventasDelMes(mes,anio)).filter(venta =>venta.nombreVendedora === vendedora))
            vendedoraMasVendio = vendedora
        }
    }
    return  vendedoraMasVendio
}
//console.log (vendedoraDelMes(2,2019))

//Ejecicio 4. ventasMes(mes, anio): Obtener las ventas de un mes. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const ventasMes = (mes,anio) => contadorVentas(ventasDelMes(mes,anio))

//console.log (ventasMes(2,2019))

//Ejercicio 5.ventasVendedora(nombre): Obtener las ventas totales realizadas por una vendedora sin límite de fecha.

const ventasPorVendedora = (nombreVendedora)=> ventas.filter(venta => venta.nombreVendedora === nombreVendedora)
//console.log(ventasPorVendedora("Grace"))

/*const ventasVendedora = (nombre) => contadorVentas(ventas.filter(venta => venta.nombreVendedora === nombre))*/

const ventasVendedora = (nombre) =>{ 
    return contadorVentas(ventasPorVendedora(nombre))
}

//console.log(ventasVendedora("Grace"))


//Ejercicio 6. componenteMasVendido(): Devuelve el nombre del componente que más ventas tuvo historicamente. El dato de la cantidad de ventas es el que indica la función cantidadVentasComponente

const componenteMasVendido = () =>{
    let masVendido = ""
    let acc = 0 

    for (const precio of precios){
       if (acc < cantidadVentasComponentes(precio.componente)){
           acc = cantidadVentasComponentes(precio.componente)
           masVendido = precio.componente
       }
       
    }
    return masVendido
}
//
//console.log(componenteMasVendido())

//Ejercicio 7. huboVentas(mes, anio): que indica si hubo ventas en un mes determinado. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const huboVentas = (mes,anio) => ventasDelMes(mes,anio).length > 0

//console.log(huboVentas(3, 2019))




// Parte 2


//Ejercicio 1. Crear la función ventasSucursal(sucursal), que obtiene las ventas totales realizadas por una sucursal sin límite de fecha.

const ventasSucursal = (sucursal) => contadorVentas(ventas.filter(venta => venta.sucursal === sucursal))

//console.log(ventasSucursal("Caballito"))

//Ejercicio2. Crear la función sucursalDelMes(mes, anio), que se le pasa dos parámetros numéricos, (mes, anio) y devuelve el nombre de la sucursal que más vendió en plata en el mes. No cantidad de ventas, sino importe total de las ventas. El importe de una venta es el que indica la función precioMaquina. El mes es un número entero que va desde el 1 (enero) hasta el 12 (diciembre).

const sucursalDelMes = (mes, anio) => {
    let acc = 0;
    let sucDelMes = "";
    for (const sucursal of sucursales) {
        if (acc < contadorVentas((ventasDelMes(mes,anio)).filter(venta => venta.sucursal === sucursal))){
            acc = contadorVentas((ventasDelMes(mes,anio)).filter(venta => venta.sucursal === sucursal))
            sucDelMes = sucursal
        }
    }
    return sucDelMes
}    

//console.log(sucursalDelMes(2,2019))




//Parte 3

//Ejercicio 1. renderPorMes(): Muestra una lista ordenada del importe total vendido por cada mes/año

const renderPorMes = (anio) => {
    let meses = []
    for (const venta of ventas) {
      !meses.includes(venta.fecha.getMonth()+1) ? meses.push(venta.fecha.getMonth()+1) : false
    }
    meses.sort((a,b) => {return a-b})
    
    let acc = ""
    for (const mes of meses) {
      acc += `<li>En ${mes}/${anio} las ganacias fueron de $${ventasMes(mes,anio)}</li>`
    } 
       return acc
    }
    //console.log(renderPorMes(2019));



    //Ejercicio 2. renderPorSucursal(): Muestra una lista del importe total vendido por cada sucursal}

    const renderPorSucursal = () => {
    let acc = ""
    for (const sucursal of sucursales) {
      acc += `<li>En ${sucursal} las ganacias fueron de ${ventasSucursal(sucursal)}</li>`
    }
      return acc
    }
    //console.log(renderPorSucursal());
    
    
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
    //console.log(laMejorVendedora());
    
    
    //Ejercicio 3. render(): Tiene que mostrar la unión de los dos reportes anteriores,
    //cual fue el producto más vendido y la vendedora que más ingresos generó
    
    
    const render = () => {
      return {
         renderMes: renderPorMes(2019),
         reporteSucursal: renderPorSucursal(),
         productoEstrella: componenteMasVendido(),
         vendedoraQueMasVendio: mejorVendedora()
      }
    }

    //console.log(render());


    // NO FUNCIONA NINGUN RENDER.....



