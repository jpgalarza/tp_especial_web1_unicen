document.addEventListener('DOMContentLoaded', () => {
  const dataForm = document.getElementById('data-form');
  const titleInput = document.getElementById('recipe-title');
  const levelSelect = document.getElementById('recipe-level');
  const timeInput = document.getElementById('recipe-time');
  const imgUrlInput = document.getElementById('img-url');
  const tableBody = document.getElementById('table-body');
  const addItemBtn = document.getElementById('add-item-btn');
  const updateItemBtn = document.getElementById('update-item-btn');
  const statusMessage = document.getElementById('status-message');

  // Modal de confirmación
  const confirmationModal = document.getElementById('confirmation-modal');
  const confirmDeleteBtn = confirmationModal.querySelector('.modal-buttons .btn-danger');
  const cancelDeleteBtn = confirmationModal.querySelector('.modal-buttons .btn-cancel');
  
  // Para almacenar el ID del elemento a eliminar
  let itemToDeleteId = null;
  
  // Para almacenar el ID del elemento que se está editando
  let editingItemId = null;

  // Función para mostrar mensajes de estado (error/éxito)
  function showMessage(element, message, type = 'error') {
    element.textContent = message;
    element.classList.remove('hidden', 'error', 'success');
    element.classList.add(type); // Añadir la clase de tipo
    setTimeout(() => {
      element.classList.add('hidden');
    }, 5000); // Ocultar mensaje después de 5 segundos
  }

  function setEditingItem( id ) {
    itemToDeleteId = null;
    editingItemId = id;
    addItemBtn.style.display = 'none';
    updateItemBtn.style.display = 'inline-block';
  }

  function resetEditingItem() {
    editingItemId = null;
    addItemBtn.style.display = 'inline-block';
    updateItemBtn.style.display = 'none';
  }

  // Función para renderizar la tabla con los datos
  function renderTable(data = recipes) { //TODO: MODIFICADO PARA PRESCINDIR DE LOAD
    tableBody.innerHTML = ''; // Limpiar tabla
    if (data.length === 0) {
      const row = document.createElement( 'tr' ) ;
      const empty = document.createElement( 'td' ) ;
      empty.setAttribute( 'colspan' , 6 ) ;
      empty.classList.add( 'empty' ) ;
      empty.textContent = 'No hay recetas para mostrar.' ;
      row.appendChild( empty ) ;
      tableBody.appendChild( row ) ;
      return;
    }

    data.forEach( ( item , index ) => {
      const row = document.createElement('tr') ;
      item.id = index + 1 ;
      [ 'id', 'title', 'level', 'time', 'imgUrl'].forEach( attr => {
        const td = document.createElement('td') ;
        if(attr === 'imgUrl') {
          const img = document.createElement('img');
          img.setAttribute('src', item[attr]);

          const figure = document.createElement('figure');
          figure.appendChild(img);

          td.appendChild(figure);

          row.appendChild( td ) ;
           
        }else {
          td.textContent = attr === 'time'? item[attr]+' min.' : item[attr];
          row.appendChild( td ) ;
        }
      } ) ;

      const actions = document.createElement('td') ;
      actions.classList.add( 'table-actions' ) ;
      const edit = document.createElement('button') ;
      edit.classList.add('button', 'btn-success') ;
      edit.textContent = window.innerWidth >= 576? 'Editar' : 'Edit';
      edit.addEventListener( 'click' , (e) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        if(editingItemId) {
          return showMessage( statusMessage,
            'Antes, termine de actualizar la receta', 'error' );
        }
        setEditingItem( item.id ) ;
        //Precargar en formulario receta a editar
        titleInput.value = item.title;
        levelSelect.value = item.level;
        timeInput.value = item.time;
        imgUrlInput.value = item.imgUrl;
      } ) ;
      actions.appendChild( edit ) ;

      const del = document.createElement('button') ;
      del.classList.add('button', 'btn-danger' ) ;
      del.textContent = window.innerWidth >= 576? 'Eliminar' :'Elim' ;
      del.addEventListener( 'click' , (e) => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        
        if(editingItemId) {
          return showMessage( statusMessage,
            'Antes, termine de actualizar la receta', 'error' );
        }

        itemToDeleteId = item.id;
        /* resetEditingItem();
        dataForm.reset(); */ //TODO: NO ES NECESARIO PORQUE ANTES SE CONTROLA QUE NO HAYA EDICION EN CURSO
        confirmationModal.style.display = 'flex'; // Muestra el modal
      } ) ;
      actions.appendChild( del ) ;
      row.appendChild( actions ) ;
      tableBody.appendChild(row);
    });
  }

  // Función para cargar datos al DOM desde el arreglo de items. //TODO: PARAMETRO POR DEFAULT EN RENDER
  /* function loadData() {
    renderTable( items ) ;
  } */

  // Manejar el envío del formulario (Agregar/Actualizar)
  dataForm.addEventListener( 'submit', (event) => {
    event.preventDefault() ;
    const title = titleInput.value.trim();
    const time = parseInt(timeInput.value);
    const level = levelSelect.value;
    const imgUrl = imgUrlInput.value.trim();

    if(!title || isNaN(time) || !imgUrl || !level) {
      showMessage( statusMessage,
        'Por favor, completa todos los campos con datos válidos', 'error' ) ;
      return;
    }

    const itemData = { title, level, time, imgUrl } ;

    if( editingItemId ) {
      recipes[editingItemId-1] = itemData ;
      showMessage( statusMessage,
        'Receta actualizada con éxito.', 'success' ) ;
    } else {
      recipes.push( itemData ) ;
      showMessage( statusMessage, 'Receta agregada con éxito.', 'success' ) ;
    }
    resetEditingItem() ;
    dataForm.reset() ;
    localStorage.setItem('recipes', JSON.stringify(recipes));
    renderTable() ; // Recargar datos después de la operación
  } ) ;

  dataForm.addEventListener( 'reset' , resetEditingItem ) ;

  // Lógica del modal de confirmación
  confirmDeleteBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'none'; // Oculta el modal

    if(itemToDeleteId) {
      recipes.splice( itemToDeleteId - 1 , 1 ) ; // Elimina el elemento de items
      showMessage( statusMessage,
        'Receta eliminada con éxito.', 'success' ) ;
      localStorage.setItem('recipes', JSON.stringify(recipes));
      renderTable() ; // Recargar datos después de eliminar
      itemToDeleteId = null; // Limpiar el ID después de la operación
    }
  } ) ;

  cancelDeleteBtn.addEventListener('click', () => {
    confirmationModal.style.display = 'none'; // Oculta el modal
    itemToDeleteId = null; // Limpiar el ID
  } ) ;

  // Cargar los datos iniciales al cargar la página
  renderTable() ;


//Ajuste de texto de Botones en versión mobile
  window.addEventListener("resize", () => {
    const editButtons= document.querySelectorAll('.table-actions .btn-success');
    const deleteButtons = document.querySelectorAll('.table-actions .btn-danger');
    const width = window.innerWidth;

    if (editButtons[0]) {
      editButtons.forEach((btn, key) => {
        btn.textContent = width >= 576? "Editar" : "Edit";
        deleteButtons[key].textContent = width >= 576? "Eliminar" : "Elim";
      } 
      )
    }
  })
} ) ;



