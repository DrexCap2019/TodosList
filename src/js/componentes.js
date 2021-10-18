import { Todo } from '../classes';

import { todoList } from '../index';

/* import '../css/componentes.css';
//import webpackLogo from '../assets/img/webpack-logo.png';

export const saludar = ( nombre ) => {
    
    console.log(' Creando etiqueta h1 ');
    
    const h1 = document.createElement('h1');
    h1.innerText = `Hola, ${ nombre }!!`;
    document.body.append( h1 );

    //img
    console.log(webpackLogo);
    const img = document.createElement('img');
    img.src = webpackLogo;
    document.body.append( img );
   
} */

const divTodoList   = document.querySelector('.todo-list');
const txtInput      = document.querySelector('.new-todo');
const btnBorrar     = document.querySelector('.clear-completed');
const ulFiltors     = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');

export const crearTodoHtml = ( todo ) => {

    const htmlTodo = `
    <li class="${ (todo.completado) ? 'completed' : '' }" data-id="${ todo.id }">
        <div class="view">
            <input class="toggle" type="checkbox" ${ (todo.completado) ? 'checked' : '' }>
            <label>${ todo.tarea }</label>
            <button class="destroy"></button>
        </div>
        <input class="edit" value="Create a TodoMVC template">
    </li> `;

    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append( div.firstElementChild );

    return div.firstElementChild;
}


// Eventos cuando la persona suelta la tecla
txtInput.addEventListener('keyup', ( event ) => {

    if( event.keyCode === 13 && txtInput.value.length > 0 ) {
        console.log( txtInput.value );
        const newTodo = new Todo( txtInput.value );
        todoList.nuevoTodo( newTodo );

        crearTodoHtml( newTodo );
        txtInput.value = '';
    }

});

divTodoList.addEventListener( 'click', ( _event )=> {
    
    const nombreElemento = _event.target.localName; // input, label, botton
    const todoElemento = _event.target.parentElement.parentElement; //li
    const todoId = todoElemento.getAttribute('data-id');

    console.log( todoElemento );

    if( nombreElemento.includes('input') ) {

        todoList.marcarCompletado( todoId );
        todoElemento.classList.toggle('completed');

    } else if ( nombreElemento.includes('button') ) {

        todoList.eliminarTodo( todoId );
        divTodoList.removeChild( todoElemento );
    }
    
    console.log( todoList );
});

btnBorrar.addEventListener('click', () => {
    todoList.eleminarCompletado();

    for ( let i = divTodoList.children.length-1; i>=0; i-- ) {

        const elemento = divTodoList.children[i];

        if ( elemento.classList.contains('completed') ) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltors.addEventListener( 'click', (_event) => {
    
    console.log( _event.target.text );

    const filtro = _event.target.text;
    if ( !filtro ) return;

    anchorFiltros.forEach( elem => elem.classList.remove('selected') );
    _event.target.classList.add('selected');

    for( const elemento of divTodoList.children ) {

        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch( filtro ) {

            case 'Pendientes':
                if( completado ) {
                    elemento.classList.add('hidden');
                }
            break;

            case 'Completados':
                if( !completado ) {
                    elemento.classList.add('hidden');
                }
            break;
        }
    }
});