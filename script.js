// Agrega eventos de funcionalidad a los submenues del nav .food Preset
  document.addEventListener('DOMContentLoaded', function () {
    const submenuToggle = document.querySelector('.has-submenu > a');
    const submenu = document.querySelector('.has-submenu .submenu');
    const arrow = submenuToggle.querySelector('.arrow');

    submenuToggle.addEventListener('click', function (e) {
      e.preventDefault(); // Previene que el enlace navegue
      submenu.classList.toggle('show');
      arrow.classList.toggle('rotated');
    });

    document.addEventListener('click', function (e) {
      const isClickInside = submenu.contains(e.target) || submenuToggle.contains(e.target);
      if (!isClickInside) {
        submenu.classList.remove('show');
        arrow.classList.remove('rotated');
      }
    });
  });


  // EFECTOS DE REDES SOCIALES (corregido)
  const list = document.querySelectorAll('.sci li');
  const bg = document.querySelector('.socialMedia');

  list.forEach(li => {
    li.addEventListener('mouseenter', function () {
      const color = li.getAttribute('data-color');
      bg.style.backgroundColor = color;
    });
    li.addEventListener('mouseleave', function () {
      bg.style.backgroundColor = 'transparent'; // o color original
    });
  });

   // Marcar como favorito (corazón)
  document.querySelectorAll('.favorite').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      btn.textContent = btn.classList.contains('active') ? '❤️' : '♡';
    });
  });

  // EVENTOS Y FUNCIONALIDAD DEL CARRITO DE COMPRAS DE LA SECCION DESAYUNO
// Funcionalidad de Añadir al Carrito (la nueva sección)
document.querySelectorAll('.add-to-cart', '.card-btn-postres').forEach(button => {
  button.addEventListener('click', function() {
    const menuItem = this.closest('.menu-item'); // Obtener el padre .menu-item
    const cartBadge = document.querySelector('.cart-badge-global'); // Obtener el elemento del distintivo del carrito

    // 1. Mostrar alerta personalizada
    const alertMessage = document.createElement('div');
    alertMessage.classList.add('custom-alert');
    alertMessage.textContent = 'Producto Agregado Exitosamente..!!! 😊';
    menuItem.appendChild(alertMessage); // Añadir al elemento de menú específico

    // Forzar un reflow para asegurar que la transición funcione
    void alertMessage.offsetWidth;
    alertMessage.classList.add('show');

    // Ocultar la alerta después de unos segundos
    setTimeout(() => {
      alertMessage.classList.remove('show');
      alertMessage.addEventListener('transitionend', () => {
        alertMessage.remove(); // Eliminar del DOM después de la transición
      }, { once: true });
    }, 2000); // 2 segundos

    // 2. Incrementar el distintivo del carrito
    if (cartBadge) {
      let currentCount = parseInt(cartBadge.textContent);
      if (isNaN(currentCount)) {
        currentCount = 0; // Inicializar si no es un número
      }
      cartBadge.textContent = currentCount + 1;
    }
  });
});


// SECCION DE ALMUERZOS

document.addEventListener('DOMContentLoaded', () => {
  // Selector GLOBAL para el contador del carrito en la cabecera
  const globalCartBadge = document.querySelector('.login-search-icons .cart-badge-global');

  
  
  // Función para mostrar la alerta personalizada centrada en la TARJETA
/*   function showProductAddedAlert(cardElement, message) {
    let alertElement = cardElement.querySelector('.product-added-alert');
    if (!alertElement) {
      alertElement = document.createElement('div');
      alertElement.className = 'product-added-alert';
      cardElement.appendChild(alertElement);
    }
    alertElement.textContent = message;
    alertElement.classList.add('show-alert');

    // Desaparecer la alerta después de un tiempo
    setTimeout(() => {
      alertElement.classList.remove('show-alert');
    }, 2000); // La alerta durará 2 segundos
  } */

  // Itera sobre CADA contenedor '.actions' en tu página
  document.querySelectorAll('.actions').forEach(actionsContainer => {
    const minusBtn = actionsContainer.querySelector('.qty-btn.btn-minus');
    const plusBtn = actionsContainer.querySelector('.qty-btn.btn-plus');
    const quantitySpan = actionsContainer.querySelector('.quantity');
    const cartButton = actionsContainer.querySelector('.cart-btn'); 
    const cartBadgeLocal = actionsContainer.querySelector('.cart-badge'); // Badge LOCAL de la tarjeta
    const currentCard = actionsContainer.closest('.card'); // Referencia a la tarjeta actual

    // Función para mostrar la alerta interna de +/- (ya existía)
/*     function showActionAlert(message, type) {
      let alertElement = actionsContainer.querySelector('.custom-action-alert');
      if (!alertElement) {
        alertElement = document.createElement('div');
        alertElement.className = 'custom-action-alert';
        actionsContainer.appendChild(alertElement);
      }
      alertElement.className = 'custom-action-alert'; 
      alertElement.textContent = message;
      alertElement.classList.add(`alert-${type}`);
      alertElement.classList.add('show-alert');
      setTimeout(() => {
        alertElement.classList.remove('show-alert');
      }, 1500);
    } */

    // Evento para el botón de decrementar (-)
    if (minusBtn && quantitySpan && cartBadgeLocal) { 
      minusBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantitySpan.textContent);
        if (currentQuantity > 0) {
          currentQuantity--;
          quantitySpan.textContent = currentQuantity;
          cartBadgeLocal.textContent = currentQuantity; // Reflejar en cart-badge local
          showActionAlert('Cantidad Reducida', 'removed');
        }
      });
    }

    // Evento para el botón de incrementar (+)
    if (plusBtn && quantitySpan && cartBadgeLocal) { 
      plusBtn.addEventListener('click', () => {
        let currentQuantity = parseInt(quantitySpan.textContent);
        currentQuantity++;
        quantitySpan.textContent = currentQuantity;
        cartBadgeLocal.textContent = currentQuantity; // Reflejar en cart-badge local
        showActionAlert('Cantidad Aumentada', 'added');
      });
    }

    // Evento para el botón del carrito (🛒)
    if (cartButton && quantitySpan && cartBadgeLocal && globalCartBadge && currentCard) {
      cartButton.addEventListener('click', () => {
        const productQuantityToAdd = parseInt(quantitySpan.textContent);
        let currentGlobalCartCount = parseInt(globalCartBadge.textContent);

        if (productQuantityToAdd > 0) {
          // Lógica para el carrito global
          if (currentGlobalCartCount === 0) {
            globalCartBadge.textContent = productQuantityToAdd;
          } else {
            globalCartBadge.textContent = currentGlobalCartCount + productQuantityToAdd;
          }

          // Mostrar alerta personalizada sobre la tarjeta
          showProductAddedAlert(currentCard, '¡Producto(s) añadido(s) al carrito!');

          // Resetear la cantidad de la tarjeta actual y su badge local a 0
          quantitySpan.textContent = 0;
          cartBadgeLocal.textContent = 0;

        } else {
          showProductAddedAlert(currentCard, 'Selecciona una cantidad > 0');
        }
      });
    }
  });

  // Si tienes el botón "Ordene" fuera del .actions, su listener iría aquí afuera también.
  document.querySelectorAll('.order-btn').forEach(orderBtn => {
  orderBtn.addEventListener('click', () => {
  console.log('Botón "Ordene" clickeado!');
  // Lógica específica para ordenar
  });
});

  // Si tienes el corazón fuera del .actions, su listener iría aquí afuera también.
  // document.querySelectorAll('.heart-btn').forEach(heartBtn => {
  //   heartBtn.addEventListener('click', () => {
  //     console.log('Botón "Corazón" clickeado!');
  //     // Lógica para favoritos
  //   });
  // });

});



// Corazón activo
document.querySelectorAll('.heart-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    btn.classList.toggle('active');
    btn.textContent = btn.classList.contains('active') ? '❤️' : '♡';
  });
});

// Pestañas
const tabs = document.querySelectorAll('.tab');
const panes = document.querySelectorAll('.tab-pane');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    // Desactivar todo
    tabs.forEach(t => t.classList.remove('active'));
    panes.forEach(p => p.classList.remove('active'));

    // Activar actual
    tab.classList.add('active');
    const targetPane = document.getElementById(tab.dataset.tab);
    targetPane.classList.add('active');
  });
});


document.addEventListener('DOMContentLoaded', () => {
  const menuContainer = document.querySelector('.menu-container');
  let cartBadge = document.querySelector('.cart-badge'); // Asumiendo que ya tienes un elemento con esta clase en tu HTML, por ejemplo: <span class="cart-badge">0</span>

  // Crear el elemento de alerta si no existe
  let customAlert = document.getElementById('custom-alert');
  if (!customAlert) {
    customAlert = document.createElement('div');
    customAlert.id = 'custom-alert';
    customAlert.className = 'custom-alert';
    document.body.appendChild(customAlert);
  }

  menuContainer.addEventListener('click', (event) => {
    // Manejo de botones de cantidad
    if (event.target.classList.contains('qty-btn')) {
      const button = event.target;
      const card = button.closest('.card');
      const quantitySpan = card.querySelector('.quantity');
      let currentQuantity = parseInt(quantitySpan.textContent);

      if (button.textContent === '+') {
        currentQuantity++;
      } else if (button.textContent === '-' && currentQuantity > 0) {
        currentQuantity--;
      }
      quantitySpan.textContent = currentQuantity;
    }

    // Manejo del botón de añadir al carrito
    if (event.target.classList.contains('cart')) {
      const button = event.target;
      const card = button.closest('.card');
      const quantitySpan = card.querySelector('.quantity');
      const productQuantity = parseInt(quantitySpan.textContent);

      if (productQuantity > 0) {
        // Actualizar el contador del carrito (si existe)
        if (cartBadge) {
          let currentCartCount = parseInt(cartBadge.textContent || 0);
          cartBadge.textContent = currentCartCount + productQuantity;
        } else {
          console.warn("Element with class 'cart-badge' not found. Cart count not updated.");
        }

        // Mostrar la alerta personalizada
        customAlert.textContent = 'Producto Agregado';
        customAlert.classList.add('show');

        // Ocultar la alerta después de 3 segundos
        setTimeout(() => {
          customAlert.classList.remove('show');
        }, 3000);

        // Resetear la cantidad a 0 después de agregar al carrito
        quantitySpan.textContent = 0;

      } else {
        // Opcional: mostrar un mensaje si la cantidad es 0
        customAlert.textContent = 'Por favor, selecciona una cantidad mayor a 0.';
        customAlert.classList.add('show');
        setTimeout(() => {
          customAlert.classList.remove('show');
        }, 3000);
      }
    }
  });
});

//


// EFECTOS DE LA TERCER SECCION BEBIDAS NATURALES
// Cantidad +/-
document.querySelectorAll('.row').forEach(row => {
  row.querySelectorAll('.column').forEach(col => {
    const minus = col.querySelector('.minus');
    const plus = col.querySelector('.plus');
    const input = col.querySelector('.quantity');

    if (minus && plus && input) {
      minus.addEventListener('click', () => {
        let val = parseInt(input.value);
        if (val > 0) input.value = val - 1;
      });

      plus.addEventListener('click', () => {
        let val = parseInt(input.value);
        input.value = val + 1;
      });
    }

    // Corazón
    const heart = col.querySelector('.heart');
    if (heart) {
      heart.addEventListener('click', () => {
        heart.classList.toggle('active');
      });
    }

    // Estrellas
    const stars = col.querySelectorAll('.star');
    if (stars) {
      stars.forEach(star => {
        star.addEventListener('click', () => {
          const index = parseInt(star.dataset.index);
          stars.forEach((s, i) => {
            if (i < index) s.classList.add('filled');
            else s.classList.remove('filled');
          });
        });
      });
    }
  });
});

// ********************************************************************************************************
// COMIENZA LA AIMACION PARA LA SECION DE POSTRES SALUDABLES
// ********************************************************************************************************
    // Animación de aparición al hacer scroll
    const cards = document.querySelectorAll('.card-postres');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    cards.forEach(card => observer.observe(card));

    // Mostrar alert flotante al pasar sobre el carrito
    document.querySelectorAll('.card-btn-postres').forEach((btn) => {
      btn.addEventListener('mouseenter', () => {
        const alert = btn.nextElementSibling;
        alert.classList.add('show');
        setTimeout(() => {
          alert.classList.remove('show');
        }, 3000);
      });
    });






