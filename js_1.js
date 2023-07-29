const fecha= document.querySelector('#fecha');
const lista= document.querySelector('#lista');
const input= document.querySelector('#input');
const botonEnter= document.querySelector('#enter');
const check = "fa-check-circle"
const uncheck = "fa-circle"
const lineThrough = "line-through"
let id
let List 




///creacion de fecha

const FECHA = new Date()
fecha.innerHTML = FECHA.toLocaleDateString('es-DR',{weekday:'long',month:'short',day:'numeric'})



// funcion agregar tarea 
function agregarTarea (tarea,id,realizado,eliminado){

    if(eliminado){return}

    const REALIZADO = realizado ?check :uncheck
    const LINE = realizado ?lineThrough :"" 

    const elemento = `
                        <li id="elemento">
                        <i class="far ${REALIZADO} co" data="realizado" id="${id}"></i>
                        <p class="text ${LINE}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i>
                        </li>
                        `
    lista.insertAdjacentHTML("beforeend",elemento)
}


//Fucion tarea realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector(".text").classList.toggle(lineThrough)
    List[element.id].realizado = List[element.id].realizado ?false :true
}

///Funcion de tarea eliminada

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    List[element.id].eliminado = true
}






botonEnter.addEventListener("click",()=> {
    const tarea = input.value 
    if(tarea) {
        agregarTarea(tarea,id,false,false)
        List.push({
            nombre: tarea,
            id:id,
            realizado:false,
            eliminado:false
        })
    }
    localStorage.setItem('TO_DO_1',JSON.stringify(List))
    input.value=''
    id++
})

document.addEventListener("keyup",function(event){
    if(event.key=="Enter"){
        const tarea = input.value
        if(tarea){
            agregarTarea(tarea,id,false,false)
            List.push({
                nombre: tarea,
                id:id,
                realizado:false,
                eliminado:false
            })
        }
        localStorage.setItem('TO_DO_1',JSON.stringify(List))
        input.value=''
        id++
    }
})

lista.addEventListener("click", function(event){
    const element = event.target
    const elementData = element.attributes.data.value 
    if(elementData==="realizado"){
        tareaRealizada(element)
    }
    else if (elementData==="eliminado"){
        tareaEliminada(element)
    }
    localStorage.setItem('TO_DO_1',JSON.stringify(List))
})

//Local storage get item

let data = localStorage.getItem('TO_DO_1')
if(data){
    List=JSON.parse(data)
    id = List.length
    cargarLista(List)
}else{
    List = []
    id = 0 
}

function cargarLista(DATA) {
    DATA.forEach(function(i){
        agregarTarea(i.nombre,i.id,i.realizado,i.eliminado)
    })
}