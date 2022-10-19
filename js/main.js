let articulo = document.getElementById('stock');
const listaProductos = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const finalizarCompraBtn = document.querySelector('#finalizar-compra');
const btnFiltrar = document.querySelector('#btnFiltrar');
const btnClear = document.querySelector('#btnClear')
const chkbox = document.querySelectorAll('#cbox');
let articuloZapa = document.querySelectorAll('#zapa');
let articuloReme = document.querySelectorAll('#reme');
let articuloAcc = document.querySelectorAll('#acc');
let totalCompra = document.getElementById('totalCompra');
let precioCompra = 0;


const productos = [
    { id: "aj9", Tipo: "Zapatilla", Nombre: "Jordan 9", precio: 110, imagen: "../images/zapatillas/aj9.jpg" },
    { id: "aj10", Tipo: "Zapatilla", Nombre: "Jordan 10", precio: 115, imagen: "../images/zapatillas/aj10.jpg" },
    { id: "aj11", Tipo: "Zapatilla", Nombre: "Jordan 11", precio: 120, imagen: "../images/zapatillas/aj11.jpg" },
    { id: "aj12", Tipo: "Zapatilla", Nombre: "Jordan 12", precio: 125, imagen: "../images/zapatillas/aj12.jpg" },
    { id: "aj13", Tipo: "Zapatilla", Nombre: "Jordan 13", precio: 130, imagen: "../images/zapatillas/aj13.jpg" },
    { id: "aj14", Tipo: "Zapatilla", Nombre: "Jordan 14", precio: 135, imagen: "../images/zapatillas/aj14.jpg" },
    { id: "r1", Tipo: "Remera", Nombre: "Remera Roja", precio: 80, imagen: "../images/remeras/r1.jpg" },
    { id: "r2", Tipo: "Remera", Nombre: "Remera Amarilla", precio: 82, imagen: "../images/remeras/r2.jpg" },
    { id: "r3", Tipo: "Remera", Nombre: "Remera Azul", precio: 88, imagen: "../images/remeras/r3.jpg" },
    { id: "acc1", Tipo: "Accesorio", Nombre: "Media", precio: 20, imagen: "../images/accesorios/media.jpg" },
    { id: "acc2", Tipo: "Accesorio", Nombre: "Gorra", precio: 50, imagen: "../images/accesorios/gorra.jpg" },
    { id: "acc3", Tipo: "Accesorio", Nombre: "Vincha", precio: 40, imagen: "../images/accesorios/vincha.jpg" },

];


//atento a cuando se presiona agregar carrito
articulo.addEventListener('click', (e) => {

    e.preventDefault();

    localStorage.setItem('productos', JSON.stringify(productos));

    if (e.target.classList.contains("agregar-carrito")) {
        let desdeLS = JSON.parse(localStorage.getItem("productos"))


        let finded = desdeLS.find(el => {
            if (el.id === e.target.id) {
                precioCompra = precioCompra + el.precio;

                insertarCarrito(el);
                Swal.fire(
                    'Gracias!',
                    'Agregaste al carrito!',
                    'success'
                )
            };
        });
    }
    totalCompra.innerText= "El Total de su compra es: $ "+ precioCompra;
    
});

//eliminar curso en el carrito
carrito.addEventListener('click', eliminarProducto);

//vaciar carrito de compras
vaciarCarritoBtn.addEventListener('click', vaciarcarrito);

//terminar compra
finalizarCompraBtn.addEventListener('click', finalizarcompra);

//boton Borrar Filtros
btnClear.addEventListener('click', () => {
    window.location.reload()

})


btnFiltrar.addEventListener("click", () => {

    if (cbox1.checked) {
        let count = 0;
        for (item of articuloReme) {
            if (count >= 0) {
                item.remove();
            }
            count += 1;
        }
        for (item of articuloAcc) {
            if (count >= 0) {
                item.remove();
            }
            count += 1;
        }
    }

    if (cbox2.checked) {
        let count = 0;
        for (item of articuloZapa) {
            if (count >= 0) {
                item.remove();
            }
            count += 1;
        }
        for (item of articuloAcc) {
            if (count >= 0) {
                item.remove();
            }
            count += 1;
        }
    }

    if (cbox3.checked) {
        let count = 0;
        for (item of articuloZapa) {
            if (count >= 0) {
                item.remove();
            }
            count += 1;
        }
        for (item of articuloReme) {
            if (count >= 0) {
                item.remove();
            }
            count += 1;
        }
    }

});


// insertar Producto en el carrito
function insertarCarrito(producto) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td><img src="${producto.imagen}" width="100"></td>
        <td>${producto.Nombre}</td>
        <td>${producto.precio}</td>
        <td><a href="#" class="borrar-producto" data-id="${producto.id}" data-precio= "${producto.precio}">X</a></td>
    `;
    listaProductos.appendChild(row);

}

//eliminar Producto del carrito
function eliminarProducto(e) {

    e.preventDefault();
    let producto, productoId, productoPrecio;

    if (e.target.classList.contains('borrar-producto')) {
        e.target.parentElement.parentElement.remove();
        console.log(e.target.parentElement.parentElement);
        
    }
    producto = e.target.parentElement.parentElement;
    productoId = producto.querySelector('a').getAttribute('data-id');
    productoPrecio = producto.querySelector('a').getAttribute('data-precio');
    precioCompra=precioCompra-productoPrecio;
    totalCompra.innerText= "El Total de su compra es: $ "+ precioCompra;
}

//vaciar Carrito
function vaciarcarrito() {

    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    }
    precioCompra = 0;
}

//finalizar compra
function finalizarcompra() {
    if (precioCompra === 0) {
        Swal.fire('Ud no tiene productos en el carrito')
    } else {
        Swal.fire(
            'Gracias!',
            'El total de su compra es: $ ' + precioCompra,
            'success'
        )
    }
    vaciarcarrito();
}


// Obtendo una API de cotizacion del dolar

fetch('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
    .then((respuesta) => respuesta.json())
    .then((info) => {
        // Construyo mi tabla

        nomb1.innerText = info[0].casa.nombre;
        nomb2.innerText = info[1].casa.nombre;

        cot1.innerText = info[0].casa.compra;
        cot2.innerText = info[1].casa.compra;

        cotVent1.innerText = info[0].casa.venta;
        cotVent2.innerText = info[1].casa.venta;


    });


/**************************************************************************************************************************** */

