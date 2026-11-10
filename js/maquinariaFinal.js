const spinner = document.getElementById("spinner");spinner.style.display = "block";
let salida = document.getElementById("salida");
let salidaCarrito = document.getElementById("salidaCarrito");
const botonMostrarContrasena = document.getElementById("mostrarContrasena");
const botonMostrarContrasenaLogin = document.getElementById("mostrarContrasenaLogin");




const SUPABASE_URL = "https://vsmfqpadrpzbuhhjqjfn.supabase.co";
const SUPABASE_KEY = "sb_publishable_NUAVYj2oi0jXmIiutoCptQ_zAM-sUDs";
const supabaseJav = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
                                            );

const EMAIL_ADMIN = "mercaditobatan97@gmail.com";
function esAdministrador(usuario) {
    return usuario.email === EMAIL_ADMIN;
                                  }

const registro = document.getElementById("registro");
const panelAdministrador = document.getElementById("panelAdministrador");
const tituloPedidos = document.getElementById("tituloPedidos");

const formularioRegistro = document.getElementById("formularioRegistro"); 
const formularioLogin = document.getElementById("formularioLogin");
const hache2 = document.getElementById("hache2");

formularioRegistro.addEventListener("submit", async function(evento) {
    
    evento.preventDefault();    
    const nombre = document.getElementById("nombreUsuario").value;
    const email = document.getElementById("emailUsuario").value;
    const password = document.getElementById("passwordUsuario").value;
    const telefono = document.getElementById("telefonoUsuario").value;

    console.log("Datos recogidos correctamente");
    
    const { data, error } = await supabaseJav.auth.signUp({
        email: email,
        password: password,       
        options: {
          data: {
            nombre: nombre,
            telefono: telefono
                }
                 }
                                                        });
       
    const mensajeRegistro = document.getElementById("mensajeRegistro");

    if (error) {
        mensajeRegistro.classList.remove("negro");
        mensajeRegistro.classList.add("rojo");
        mensajeRegistro.textContent = "Error en el registro: " + error.message;
               } 
    else if (data.user && !data.session) {
        mensajeRegistro.classList.remove("rojo");
        mensajeRegistro.classList.add("negro");
        mensajeRegistro.textContent ="Cuenta creada. Revisa tu correo para confirmar el registro.";
                                         } 
    else {
        mensajeRegistro.classList.remove("rojo");
        mensajeRegistro.classList.add("negro");
        mensajeRegistro.textContent ="Registro completado correctamente.";
         }
    setTimeout(() => {
        mensajeRegistro.textContent = "";
        mensajeRegistro.classList.remove("rojo", "negro");
        document.getElementById("nombreUsuario").value = "";
        document.getElementById("emailUsuario").value = "";
        document.getElementById("passwordUsuario").value = "";
        document.getElementById("telefonoUsuario").value = "";
                      }, 5000);     
                                                               });


formularioLogin.addEventListener("submit", async function(evento) {  
    evento.preventDefault();
    document.getElementById("nombreUsuario").value = "";
    document.getElementById("emailUsuario").value = "";
    document.getElementById("passwordUsuario").value = "";
    document.getElementById("telefonoUsuario").value = "";
    hache2.style.display = "block";
    formularioLogin.style.display = "block";
    const mensajeLogin = document.getElementById("mensajeLogin");
    const usuarioConectado = document.getElementById("usuarioConectado");
    mensajeLogin.textContent = "";
    usuarioConectado.textContent = "";
    const email = document.getElementById("emailLogin").value;
    const password = document.getElementById("passwordLogin").value;

    const { data, error } = await supabaseJav.auth.signInWithPassword({
        email: email,
        password: password
                                                                      });

     if (error) {
        mensajeLogin.classList.add("rojo");
        mensajeLogin.textContent = "Error al iniciar sesión: " + error.message;
        setTimeout(() => {
            mensajeLogin.textContent = "";
            mensajeLogin.classList.remove("rojo");
                         }, 4000);
                }
     else  {
       mensajeLogin.classList.remove("rojo"); 
       mensajeLogin.classList.add("negro");
       cerrarSesion.classList.remove("botonCerrarSesion");
       cerrarSesion.classList.add("botonCerrarSesionIzquierda");
       mensajeLogin.textContent = "Sesión iniciada correctamente.";
       document.getElementById("usuarioConectado").classList.add("negro");
       document.getElementById("usuarioConectado").textContent = "Usuario conectado: " + data.user.user_metadata.nombre;
       document.getElementById("emailLogin").value = "";
       document.getElementById("passwordLogin").value = "";
       hache2.style.display = "none";
       formularioLogin.style.display = "none";
       console.log("Usuario conectado:", data.user.id);
       console.log("Correo del usuario:", data.user.email);
           }          
                                                                });


const cerrarSesion = document.getElementById("cerrarSesion");

/*cerrarSesion.addEventListener("click", async function() {
    const { error } = await supabaseJav.auth.signOut();

    if (error) {
        alert("Error al cerrar sesión: " + error.message);
               } 
    else {
        document.getElementById("mensajeLogin").textContent ="Sesión cerrada correctamente.";
        document.getElementById("usuarioConectado").textContent = "";
        console.log("Sesión cerrada");
           }
                                                       });*/

async function ejecutarCierreSesion(automatico = false) {

    clearTimeout(temporizadorInactividad);
    cerrarSesion.classList.remove("botonCerrarSesionIzquierda");
    cerrarSesion.classList.add("botonCerrarSesion");
    document.getElementById("passwordLogin").type = "password";
    document.getElementById("passwordUsuario").type = "password";
    document.getElementById("mensajeLogin").classList.remove("compraClienteTotal");

    if(carrito.length > 0) {
        productos.forEach(productoStock =>{
            carrito.forEach(productoCompra => {
                if(productoStock.id === productoCompra.id) {productoStock.stock = productoStock.stock + productoCompra.cantidad;}
                                               })
                                          });
                          }

    const { data } = await supabaseJav.auth.getSession();

    if (!data.session) {
         document.getElementById("mensajeLogin").classList.remove("negro");
         document.getElementById("mensajeLogin").classList.add("rojo");
         document.getElementById("mensajeLogin").textContent ="No hay ninguna sesión iniciada.";
         cerrarSesion.classList.remove("botonCerrarSesionIzquierda");
         cerrarSesion.classList.add("botonCerrarSesion"); 
         setTimeout(() => {
             document.getElementById("mensajeLogin").textContent = "";document.getElementById("mensajeLogin").classList.remove("rojo");
                          }, 3000);
         return;
                       }

    const { error } = await supabaseJav.auth.signOut();

    if (error) {
        alert("Error al cerrar sesión: " + error.message);
               } 
    else {
        cerrarSesion.classList.remove("botonCerrarSesionIzquierda");
        cerrarSesion.classList.add("botonCerrarSesion");
        document.getElementById("mensajeLogin").classList.remove("rojo");
        document.getElementById("mensajeLogin").classList.add("negro");
        document.getElementById("mensajeLogin").textContent =
            automatico ? "Sesión cerrada por inactividad." : "Sesión cerrada correctamente.";
        setTimeout(() => {
            document.getElementById("mensajeLogin").textContent = "";
            document.getElementById("mensajeLogin").classList.remove("negro");
        }, 6000);

        document.getElementById("usuarioConectado").classList.remove("negro");
        document.getElementById("usuarioConectado").textContent = "";
        hache2.style.display = "block";
        formularioLogin.style.display = "block";

        console.log("Sesión cerrada");
        }
                                                       }   
                                                       
cerrarSesion.addEventListener("click", function() {
    ejecutarCierreSesion();principal();
                                                  });                                                       
 

async function comprobarSesion() {
    const { data, error } = await supabaseJav.auth.getSession();

    if (error) {
        document.getElementById("usuarioConectado").textContent = "";
        console.error("Error al comprobar la sesión:", error.message);
        return;
               }

    const usuarioConectado = document.getElementById("usuarioConectado");

    if (data.session) {
        usuarioConectado.classList.add("negro");cerrarSesion.classList.add("botonCerrarSesion");
        usuarioConectado.textContent =
            "Usuario conectado: " + data.session.user.user_metadata.nombre;
                     } 
    else {
        usuarioConectado.textContent = "";cerrarSesion.classList.add("botonCerrarSesion");
         }
                               }

comprobarSesion();
                               
console.log(supabaseJav);

async function actualizarEstado(idPedido, nuevoEstado) {

    const { data, error } = await supabaseJav
        .from("pedidos")
        .update({ estado: nuevoEstado }) /*modifica el estado.*/
        .eq("id", idPedido) /*indica que solo debe modificar el pedido cuyo identificador coincida.*/
        .select("id") /*para que Supabase nos devuelva el pedido actualizado.*/
        .maybeSingle(); /*para recibir un único resultado o null si no se ha actualizado ninguna fila.*/

    if (error) {
        console.error("Error al actualizar:", error.message);
        return false;
               }
 
    if (!data) {
        console.error("No se ha actualizado ningún pedido.");
        return false;
               }

    console.log("Pedido actualizado:", data.id);
    return true;
                                                       }

async function cargarPedidos() {
    spinner.style.display = "block";
    hache2.style.display = "none";
    formularioLogin.style.display = "none";
    cerrarSesion.classList.add("botonCerrarSesion");
    document.getElementById("usuarioConectado").style.display = "block";
    const { data: { session } } = await supabaseJav.auth.getSession();
    const administrador = session && esAdministrador(session.user);
    const { data, error } = await supabaseJav
        .from("pedidos") /*desde la tabla "pedidos"*/
        .select("*") /*solicitamos todas las columnas.*/
        .order("created_at",/*ordenamos por fecha de creación.Del más reciente al más antiguo.*/ { ascending: false }); /*indica orden descendente.*/

    if (error) {
        console.error("Error al cargar pedidos:", error.message);
        return;
              }
    const listaPedidos = document.getElementById("listaPedidos");
    listaPedidos.innerHTML = "";
let totalCompraCliente = 0;    
    data.forEach(function(pedido) {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjetaPedido");
             
        const titulo = document.createElement("h3");titulo.style.color="black";titulo.style.background="white";
        titulo.textContent = "Pedido Nº " + pedido.id;
        tarjeta.appendChild(titulo);
        const fecha = document.createElement("p");
        fecha.textContent = "Fecha: " + new Date(pedido.created_at).toLocaleString();
        tarjeta.appendChild(fecha);
        const nombre = document.createElement("p");
        nombre.textContent = "Usuario: " + pedido.nombre;
        tarjeta.appendChild(nombre);
        const telefono = document.createElement("p");
        telefono.textContent = "Teléfono: " + pedido.telefono;
        tarjeta.appendChild(telefono);
        const correo = document.createElement("p");
        correo.textContent = "Correo: " + pedido.cliente;
        tarjeta.appendChild(correo);
        const textoEstado = document.createElement("p");
        if(administrador) {
            const selectorEstado = document.createElement("select");
            const estados = ["pendiente", "preparado", "entregado"];

            textoEstado.textContent = "Cambiar estado:";
            tarjeta.appendChild(textoEstado);

            estados.forEach(function(valor) {
               const opcion = document.createElement("option");
               opcion.value = valor;
               opcion.textContent = valor;
               selectorEstado.appendChild(opcion);
                                           });

            selectorEstado.value = pedido.estado; /*establece el valor seleccionado en el selector según el estado actual del pedido.*/

            tarjeta.appendChild(selectorEstado);

            const botonGuardar = document.createElement("button");
            botonGuardar.textContent = "Guardar estado";
            botonGuardar.addEventListener("click", async function() {
            const resultado = await actualizarEstado(
               pedido.id,
               selectorEstado.value
                                                   );
                                                                             
            if (resultado) {
                alert("Estado del pedido actualizado correctamente.");
                           }
            else {
                alert("No se pudo actualizar el estado del pedido.");
                 }               
                                                                    });
            tarjeta.appendChild(botonGuardar);
            
                            }
        else {
            const estado = document.createElement("p");
            estado.textContent = "Estado: " + pedido.estado;
            tarjeta.appendChild(estado);
            }               
                                                              
        /*tarjeta.innerHTML = `
            <h3>Pedido #${pedido.id}</h3>
            <p>Usuario: ${pedido.nombre}</p>
            <p>Correo: ${pedido.cliente}</p>
            <p>Teléfono: ${pedido.telefono}</p>
            <p>Total: ${pedido.total} €</p>
            <p>Estado: ${pedido.estado}</p>
            <p>Fecha: ${pedido.created_at}</p>
        `;*/

        pedido.productos.forEach(function(producto) {
            const item = document.createElement("p");
            item.textContent = `${producto.nombre} : ${producto.cantidad} x ${producto.precio} € = ${producto.total} €`;
            tarjeta.appendChild(item);
                                                   });
        const total = document.createElement("p");
        total.classList.add("compraClienteTotal");
        total.textContent = "Total : " + pedido.total + " €";
        totalCompraCliente = totalCompraCliente+pedido.total;
        tarjeta.appendChild(total);                                           
        listaPedidos.appendChild(tarjeta);  

                                     });

        /*document.getElementById("mensajeLogin").textContent = "";
        document.getElementById("mensajeLogin").classList.remove("negro", "rojo");
        document.getElementById("mensajeLogin").classList.add("compraClienteTotal");
        document.getElementById("mensajeLogin").textContent = "Total compra : " +  totalCompraCliente  + " €";*/

        const puntos = document.getElementById("puntos"); 
        puntos.style.display = "block";
        let añadirPuntos = 0;
        const animacion = setInterval(() => {
             añadirPuntos++;
             if(añadirPuntos>8) {
                añadirPuntos = 1;
                                }
             puntos.textContent = ".".repeat(añadirPuntos);
                                             },500);
        
        setTimeout(() => { 
            clearInterval(animacion);puntos.textContent = "";
            document.getElementById("mensajeLogin").textContent = "";
            document.getElementById("mensajeLogin").classList.remove("negro", "rojo");
            document.getElementById("mensajeLogin").classList.add("compraClienteTotal");
            document.getElementById("mensajeLogin").textContent = "Total compra : " +  totalCompraCliente  + " €";
                      },5000);
    spinner.style.display = "none"; 
    console.log("Pedidos recibidos:", data);   
                               }
        
let carrito = [];
let mensaje  = "";
let temporizadorInactividad;
const TIEMPO_INACTIVIDAD =  15 * 60 * 1000;

function reiniciarTemporizador() {
    clearTimeout(temporizadorInactividad);

    temporizadorInactividad = setTimeout(function() {
        /*cerrarSesion.click();*/
        ejecutarCierreSesion(true);
                                                    }, TIEMPO_INACTIVIDAD);
                                 }

document.addEventListener("mousemove", reiniciarTemporizador);
document.addEventListener("keydown", reiniciarTemporizador);
document.addEventListener("click", reiniciarTemporizador);
document.addEventListener("scroll", reiniciarTemporizador);                                

let productos = [
    {id: "1",nombre: "Picadora con Sierra",imagen: "imagenes/picadora1.jpg",precioMin: "700",precioMax: "900", stock: 1},
    {id: "2",nombre: "Picadora",imagen: "imagenes/picadora2.jpg",precioMIn: "700",precioMax: "900", stock: 1},
    {id: "3",nombre: "Cortadora",imagen: "imagenes/cortadora1.jpg",precioMin: "700",precioMax: "800", stock: 1},
    {id: "4",nombre: "Cortadora",imagen: "imagenes/cortadora2.jpg",precioMIn: "200",precioMax: "400", stock :1},
    {id: "5",nombre: "Envasadora de Vacio",imagen: "imagenes/envasadora1.jpg",precioMin: "800",precioMax: "1200", stock: 1},
    {id: "6",nombre: "Envasadora de Vacio",imagen: "imagenes/envasadora2.jpg",precioMIn: "300",precioMax: "400", stock: 1},
    {id: "7",nombre: "Mueble Expositor",imagen: "imagenes/expositor.jpg",precioMin: "200",precioMax: "400", stock: 1},
    {id: "8",nombre: "Focos Led",imagen: "imagenes/foco.jpg",precioMIn: "100",precioMax: "150", stock: 5},
    {id: "9",nombre: "Horno Electrico SALVA",imagen: "imagenes/horno.jpg",precioMin: "600",precioMax: "450", stock: 0},
    {id: "10",nombre: "Fermentadora SALVA",imagen: "imagenes/fermentadora.jpg",precioMIn: "800",precioMax: "550", stock: 0},
    {id: "11",nombre: "Bancos de Acero Inoxidable ",imagen: "imagenes/bancos2.jpg",precioMIn: "100",precioMax: "150", stock: 2},
    {id: "12",nombre: "Bancos de Acero Inoxidable ",imagen: "imagenes/bancos3.jpg",precioMIn: "100",precioMax: "150", stock: 1},
    {id: "13",nombre: "Bancos de Acero Inoxidable ",imagen: "imagenes/bancos4.jpg",precioMIn: "100",precioMax: "150", stock: 1},
    {id: "14",nombre: "Bancos de Acero Inoxidable ",imagen: "imagenes/bancos1.jpg",precioMIn: "100",precioMax: "150", stock: 1},
    {id: "15",nombre: "Arcon Congelador1",imagen: "imagenes/arcon1.jpg",precioMIn: "200",precioMax: "300", stock: 1},
    {id: "16",nombre: "Arcon Congelador2",imagen: "imagenes/arcon2.jpg",precioMin: "200",precioMax: "300", stock: 1},
    {id: "17",nombre: "Jamonero",imagen: "imagenes/jamonero.jpg",precioMin: "35",precioMax: "50", stock: 1},
    {id: "18",nombre: "Mesa de Acero Inoxidable1",imagen: "imagenes/mesaAcero1.jpg",precioMIn: "150",precioMax: "200", stock: 2},
    {id: "19",nombre: "Mesa de Acero Inoxidable2 ",imagen: "imagenes/mesaAcero2.jpg",precioMIn: "150",precioMax: "200", stock: 1},
    {id: "20",nombre: "Mesa de Acero Inoxidable3 ",imagen: "imagenes/mesaAcero3.jpg",precioMIn: "150",precioMax: "200", stock: 1},
    {id: "21",nombre: "Mesa de Acero Inoxidable4 ",imagen: "imagenes/mesaAcero4.jpg",precioMIn: "150",precioMax: "200", stock: 3},
    {id: "22",nombre: "Mesa de Corte1 ",imagen: "imagenes/mesaCortePeq.jpg",precioMIn: "100",precioMax: "150", stock: 1},
    {id: "23",nombre: "Mesa de Corte2",imagen: "imagenes/mesaCorteMed.jpg",precioMIn: "150",precioMax: "200", stock: 2},
    {id: "24",nombre: "Mesa de Corte3",imagen: "imagenes/mesaCorteGra.jpg",precioMin: "150",precioMax: "250", stock: 1}, 
    {id: "25",nombre: "Carro de transporte Manual",imagen: "imagenes/carro.jpg",precioMin: "50",precioMax: "75", stock: 1},
    {id: "26",nombre: "Estanteria de Plastico",imagen: "imagenes/estanteriaPlastico.jpg",precioMin: "50",precioMax: "75", stock: 4},
    {id: "27",nombre: "Estanteria de Acero inosidable",imagen: "imagenes/estanteriaAcero1.jpg",precioMin: "150",precioMax: "200", stock: 0},
    {id: "28",nombre: "Carro de Acero Inoxidable",imagen: "imagenes/carritoAcero.jpg",precioMin: "150",precioMax: "200", stock: 1},
    {ID: "29",nombre: "Bascula", imagen: "imagenes/bascula.jpg", precioMin: "50",precioMax: "100", stock: 0}
                ];

function fecha() {
    let fecha = new Date().toLocaleDateString("es-ES");
    let minutos = new Date().getMinutes().toString().padStart(2, "0");
    let hora = new Date().getHours().toString().padStart(2, "0");
    let dia = new Date().getDate().toString().padStart(2, "0");
    let mes = (new Date().getMonth() +1).toString().padStart(2, "0");
    let año = new Date().getFullYear();
    let mensaje = "";let mensaje1 = "";
    mensaje = `Fecha : ${dia}/${mes}/${año}<br>Hora : ${hora}:${minutos}`;
    mensaje1 = `Fecha : ${fecha}<br>Hora : ${hora}:${minutos}`; 
    return mensaje1;
                 }
             
function principal() {
     salidaCarrito.classList.remove("resultadoFinalError", "resultadoParcial");
     salida.classList.remove("resultadoFinalImprimir", "resultado", "salidaCarrito", "resultadoFinal", "resultadoParcial");
     salida.classList.add("salida");
     salida.innerHTML =""; 
     /*cerrarSesion.classList.add("botonCerrarSesion");*/
     productos.forEach(producto => {
            /*spinner.style.display = "block";*/
            let imagen = document.createElement("img");
            let tarjeta = document.createElement("div");
            let botonA = document.createElement("button");
            let botonE = document.createElement("button");
            let botonV = document.createElement("button"); 
            let titulo = document.createElement("p");
            let precio = document.createElement("p");
            if(producto.stock === 0) {titulo.classList.remove("negro");titulo.classList.add("rojo");}
            titulo.textContent=`${producto.nombre}. Stock :${producto.stock}`;
            imagen.src = producto.imagen;
            tarjeta.classList.add("tarjeta");
            botonA.classList.add("boton"); 
            botonA.textContent = `🛒 añadir al carrito`;
            botonE.classList.add("boton");
            botonE.textContent =`🛒 eliminar una unidad`;
            botonV.classList.add("boton");
            botonV.textContent =`🛒 ver carrito`; 
            precio.innerHTML = `<strong>Precio :${producto.precioMax} €</strong>`;
            tarjeta.appendChild(titulo); 
            tarjeta.appendChild(imagen);
            tarjeta.appendChild(precio);
            tarjeta.appendChild(botonA);
            tarjeta.appendChild(botonE);
            tarjeta.appendChild(botonV);
            salida.appendChild(tarjeta);
         setTimeout(function() {spinner.style.display = "none";} ,2000);   
            /*spinner.style.display = "none";*/
                                                       
    botonA.addEventListener("click", ()=>{
                salidaCarrito.innerHTML = "";
                salidaCarrito.classList.remove("resultadoFinalError");
                let encontrado = carrito.find(item =>{                  
                    return item.id === producto.id;
                                                     });
                if(!encontrado && producto.stock > 0){
                 carrito.push({id:producto.id, nombre: producto.nombre, precio: producto.precioMax, cantidad: 1});producto.stock--;
                                                     } 
                else if(encontrado && producto.stock > 0) {                             
                    encontrado.cantidad++;producto.stock--;                                      
                                                          }
                else { 
                    salidaCarrito.classList.add("resultadoFinalError");
                    salidaCarrito.textContent =`Producto sin STOCK`;
                    setTimeout(function() {salidaCarrito.innerHTML ="";salidaCarrito.classList.remove("resultadoFinalError");} ,3000);
                    }
                if(producto.stock === 0) {titulo.classList.add("rojo");} 
                titulo.textContent=`${producto.nombre}. Stock :${producto.stock}`;                                                                                     
                console.log(carrito);
                                                });

     botonE.addEventListener("click", ()=>{ 
                salidaCarrito.innerHTML = "";
                salidaCarrito.classList.remove("resultadoFinalError");
                salida.classList.add("salida");
                let encontrado = carrito.find(item =>{    
                    return item.id === producto.id;
                                                     });console.log(`encontrar : ${encontrado}`);
                if(!encontrado){
                    salidaCarrito.classList.add("resultadoFinalError");
                    salidaCarrito.innerHTML = `No esta en el Carrito<br>No se puede Eliminar`;
                    setTimeout(function() {salidaCarrito.innerHTML ="";salidaCarrito.classList.remove("resultadoFinalError");} ,3000);
                    return;
                               }                                     
                else {
                    let posicion = carrito.findIndex(indice=>{
                    return indice.id === producto.id;});console.log(`posicion :${posicion}`);                
                    if(encontrado.cantidad > 1) {
                      encontrado.cantidad--;producto.stock++;
                                                } 
                    else {producto.stock++;carrito.splice(posicion, 1);}                                                                                     
                    console.log(carrito);
                    if(producto.stock > 0) {titulo.classList.remove("rojo");}
                    titulo.textContent=`${producto.nombre}. Stock :${producto.stock}`;
                    }                                                                                                                                                         
                                            });
        botonV.addEventListener("click", ()=>{
                if(carrito.length > 0) {
                    let totales = carrito.reduce(function(acumulador, precio) {
                    let total = precio.precio * precio.cantidad;
                    acumulador.push({nombre: precio.nombre, precio: precio.precio,
                        cantidad: precio.cantidad, total: total});
                    return acumulador;
                                                                                  }, []);
                    console.log(totales);
                    const productosPedido = totales.map(producto => ({
                        nombre: producto.nombre,
                        precio: producto.precio,
                        cantidad: producto.cantidad,
                        total: producto.total
                                                                    }));

                    let totalCompra = totales.reduce(function(acumulador, precio) {
                    let total = Number(precio.total);
                    return acumulador + total;
                                                                              }, 0); 
                    console.log(`${totalCompra}€`);
                    salida.innerHTML = "";
                    salidaCarrito.innerHTML = "";
                    salidaCarrito.classList.remove("resultadoFinalError");
                    totales.forEach(resultado =>{
                    let muestra = document.createElement("div");
                    muestra.classList.add("resultado");
                    let precioNumero = Number(resultado.precio);
                    muestra.innerHTML = `${resultado.nombre}<br> Precio :${precioNumero.toFixed(2)} €<br>
                    Cantidad :${resultado.cantidad} UND<br> Total Producto : ${resultado.total.toFixed(2)} €`; 
                    salida.classList.add("salidaCarrito");                  
                    salida.appendChild(muestra);                   
                                           });
                    let totalFinal = document.createElement("p");
                    totalFinal.classList.add("resultadoFinal");
                    totalFinal.innerHTML = `<strong>Total Compra : ${totalCompra.toFixed(2)} €</strong>`;
                    salida.appendChild(totalFinal);

                    let botonS = document.createElement("button");
                    botonS.classList.add("boton");
                    botonS.textContent ="⬅️ 🛒 seguir comprando";
                    salida.appendChild(botonS);
                    let botonF = document.createElement("button");
                    botonF.classList.add("boton");
                    botonF.textContent ="🛒 finalizar compra";
                    salida.appendChild(botonF);
                    salidaCarrito.classList.add("resultadoParcial");
                    botonS.addEventListener("click", ()=>{
                       salida.innerHTML ="";
                       salida.classList.remove("salidaCarrito");
                       salida.classList.add("salida");
                       salidaCarrito.innerHTML =""; 
                       principal();
                                                         });
                    botonF.addEventListener("click", async()=>{                       
                       const { data: sesionActual } = await supabaseJav.auth.getSession();
                       if (!sesionActual.session) {
                            alert("Debes iniciar sesión antes de finalizar la compra.");
                            return;
                                                 }
                    
                       const { data: pedidoGuardado, error: errorPedido } =
                       await supabaseJav
                       .from("pedidos")
                       .insert({
                          usuario_id: sesionActual.session.user.id,
                          cliente: sesionActual.session.user.email,
                          nombre: sesionActual.session.user.user_metadata.nombre,
                          telefono: sesionActual.session.user.user_metadata.telefono,
                          total: totalCompra,
                          productos: productosPedido,
                          estado: "pendiente"
                              })
                       .select("id")
                       .single();

                       if (errorPedido) {
                          console.error("Error al guardar el pedido:", errorPedido.message);
                          alert("No se ha podido guardar el pedido. Tu carrito se mantiene.");
                          return;
                                        }

                console.log("Pedido guardado. Número:", pedidoGuardado.id);
                             
                    salida.innerHTML ="";
                    salidaCarrito.innerHTML ="";
                    salidaCarrito.classList.remove("resultado", "resultadoParcial");
                    let f = document.createElement("p");
                    let muestraFecha = fecha();
                    f.innerHTML = `${muestraFecha}`;
                    salida.appendChild(f);
                    totales.forEach(resultado =>{
                        let p = document.createElement("p");                        
                        p.innerHTML = `${resultado.nombre} // ${resultado.cantidad} und. : ${resultado.total.toFixed(2)} €<br>`;
                        salida.classList.remove("salida", "salidaCarrito");
                        salida.classList.add("resultadoFinalImprimir");
                        salida.appendChild(p);
                                               });
                    let p = document.createElement("div");                  
                    p.classList.add("seguir");                                               
                    p.innerHTML = `<strong><span class="color">💰 Total Compra : ${totalCompra.toFixed(2)} €</span></strong>`; 
                    salida.appendChild(p); 
                    /*cerrarSesion.addEventListener("click", function() {
                        principal();ejecutarCierreSesion();
                                                                      });*/ 
                    carrito= [];
                    let botonN = document.createElement("button");
                    botonN.classList.add("boton");
                    botonN.textContent = `🛒 nueva compra`;
                    p.appendChild(botonN);
                    salidaCarrito.classList.remove("salidaCarrito");
                    botonN.addEventListener("click", () => {
                        salida.innerHTML ="";
                        salida.classList.remove("salidaCarrito");
                        salida.classList.add("salida");
                        salidaCarrito.innerHTML =""; 
                        principal();
                                                            }); 
                    let botonI = document.createElement("button");
                    botonI.classList.add("boton");
                    botonI.textContent = `imprimir`;
                    p.appendChild(botonI);
                    botonI.addEventListener("click", () => {
                        window.print();
                                                           });                                                                 
                                                      });                                                     
                                       }
                else {
                    salidaCarrito.classList.add("resultadoFinalError");
                    salidaCarrito.textContent = `El carrito esta Vacio`;
                    setTimeout(function() {salidaCarrito.innerHTML ="";salidaCarrito.classList.remove("resultadoFinalError");} ,3000);
                    return;
                    }                       
                                            });                                     
                                }); 
                       }
                                       
principal(); 

supabaseJav.auth.onAuthStateChange((evento, session) => {

    if (session) {
        reiniciarTemporizador();
        if (esAdministrador(session.user)) {
            registro.style.display = "none";
            panelAdministrador.style.display = "block";
            tituloPedidos.textContent = "Administración de pedidos";
            console.log("Administrador conectado");
            cargarPedidos();
                                           } 
        else {
            registro.style.display = "none";
            panelAdministrador.style.display = "block";
            tituloPedidos.textContent = "Mis pedidos";
            cargarPedidos();
            console.log("Cliente conectado");
             }        
                 }                  
    else 
        {
        registro.style.display = "block";
        panelAdministrador.style.display = "none"; 
        console.log("No hay sesión iniciada");   
        clearTimeout(temporizadorInactividad);
        }

                                                       });

botonMostrarContrasena.addEventListener("click", ()=> { 
    document.getElementById("passwordUsuario").type =  
    document.getElementById("passwordUsuario").type === "password" ? "text" : "password";                                                       
                                                      });

botonMostrarContrasenaLogin.addEventListener("click", ()=> {
    document.getElementById("passwordLogin").type =  
    document.getElementById("passwordLogin").type === "password" ? "text" : "password";                                                    
                                                            });

