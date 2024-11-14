// Función para filtrar productos basados en la búsqueda
function filtrarProductos() {
    const textoBusqueda = document.getElementById('buscar-producto').value.toLowerCase();
    const productos = document.querySelectorAll('#tienda > div');
    let productosEncontrados = false;

    productos.forEach(producto => {
        const nombreProducto = producto.querySelector('h3').textContent.toLowerCase();

        if (nombreProducto.includes(textoBusqueda)) {
            producto.style.display = 'block';
            productosEncontrados = true;
        } else {
            producto.style.display = 'none';
        }
    });

    const mensajeNoProductos = document.getElementById('no-result-message');
    if (!productosEncontrados) {
        mensajeNoProductos.style.display = 'block';
    } else {
        mensajeNoProductos.style.display = 'none';
    }
}
// Función para manejar la búsqueda
function buscarProducto(event) {
    event.preventDefault();
    filtrarProductos();
}

// Cambia la imagen del producto según el color seleccionado
function cambiarColor(productoId, color) {
    const imagenProducto = document.getElementById(`producto-img-${productoId}`);
    
    // Definir las rutas de imagen para cada color y producto
    const imagenes = {
        1: {
            gris: './assets/img/Nike Bailleli Gris.png',
            negro: './assets/img/Nike Bailleli Negro.png',
            verde: './assets/img/Nike Bailleli Verde.png'
        },
        2: {
            verde: './assets/img/Zapato adidas verde.png',
            azul: './assets/img/Zapato adidas azul.png',
            rojo: './assets/img/Zapato adidas rojo.png'
        },
        3: {
            rosado: './assets/img/Zapato puma rosado.png',
            beige: './assets/img/Zapato puma beige.png',
            morado: './assets/img/Zapato puma morado.png'
        },
        4: {
            celeste: './assets/img/Zapato air force celeste.png',
            marron: './assets/img/Zapato air force marron.png',
            negro: './assets/img/Zapato air force negro.png'
        },
        5: {
            negro: './assets/img/Zapato vans negro.png',
            azul: './assets/img/Zapato vans azul.png',
            naranja: './assets/img/Zapato vans naranja.png'
        },
        6: {
            naranja: './assets/img/Zapato puma hombre naranja.png',
            negro: './assets/img/Zapato puma hombre negro.png',
            azul: './assets/img/Zapato puma hombre azul.png'
        },
        7: {
            azul: './assets/img/Zapato niño azul.png',
            negro: './assets/img/Zapato niño negro.png',
            rojo: './assets/img/Zapato niño rojo.png'
        },
        8: {
            amarillo: './assets/img/Zapato niña amarillo.png',
            gris: './assets/img/Zapato niña gris.png',
            rosado: './assets/img/Zapato niña rosado.png'
        },
        9: {
            rojo: './assets/img/Nike niño rojo.png',
            azul: './assets/img/Nike niño azul.png',
            negro: './assets/img/Nike niño negro.png'
        }
    };

    // Verificar si existe una imagen para el color seleccionado y el producto
    if (imagenes[productoId] && imagenes[productoId][color]) {
        imagenProducto.src = imagenes[productoId][color];
    } else {
        console.error(`No se encontró imagen para el producto ${productoId} y color ${color}`);
    }
}

// Obtener los elementos
const iconoUsuario = document.getElementById('icono-usuario');
const ventanaUsuario = document.getElementById('ventana-usuario');
const cerrarVentana = document.getElementById('cerrar-ventana');

// Mostrar la ventana de usuario cuando se hace clic en el icono
iconoUsuario.addEventListener('click', function() {
    ventanaUsuario.style.display = 'flex';  // Muestra la ventana
});

// Cerrar la ventana cuando se hace clic en el botón de cerrar
cerrarVentana.addEventListener('click', function() {
    ventanaUsuario.style.display = 'none';  // Oculta la ventana
});

// Carrito de compras
let carrito = [];

// Función para actualizar la cantidad
function actualizarCantidad(productoId, incremento) {
    const cantidadInput = document.getElementById(`cantidad-${productoId}`);
    let cantidad = parseInt(cantidadInput.value);
    cantidad += incremento;

    if (cantidad >= 1) { // Asegurarse de que no sea menor que 1
        cantidadInput.value = cantidad;
    }
}

// Función para agregar productos al carrito
function agregarAlCarrito(productoId, nombreProducto, precio) {
    const cantidad = parseInt(document.getElementById(`cantidad-${productoId}`).value);

    // Verificar si el producto ya está en el carrito
    const productoExistente = carrito.find(item => item.id === productoId);

    if (productoExistente) {
        productoExistente.cantidad += cantidad;
    } else {
        carrito.push({ id: productoId, nombre: nombreProducto, precio: precio, cantidad: cantidad });
    }

    actualizarCarrito();
}

// Función para actualizar la ventana del carrito
function actualizarCarrito() {
    const carritoProductos = document.getElementById('carrito-productos');
    const totalCarrito = document.getElementById('total-carrito');
    carritoProductos.innerHTML = ''; // Limpiar el contenido del carrito

    let total = 0;
    carrito.forEach(producto => {
        const productoElement = document.createElement('div');
        productoElement.textContent = `${producto.nombre} - Cantidad: ${producto.cantidad} - $${(producto.precio * producto.cantidad).toFixed(2)}`;
        carritoProductos.appendChild(productoElement);
        total += producto.precio * producto.cantidad;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

// Mostrar ventana del carrito
document.getElementById('boton-carrito').addEventListener('click', function() {
    const ventanaCarrito = document.getElementById('ventana-carrito');
    ventanaCarrito.style.display = ventanaCarrito.style.display === 'none' ? 'block' : 'none';
});

// Vaciar el carrito
document.getElementById('vaciar-carrito').addEventListener('click', function() {
    carrito = [];
    actualizarCarrito();
});




