document.addEventListener('DOMContentLoaded', ()=>{
    
    //Función para mostrar la alerta de "algo salio mal" en el caso de ingresar una ID que no existe
    function AlertaError(){
        let MensajeDeError=document.getElementById("alert-error")
        MensajeDeError.classList.add("show");

        setTimeout(() => {
            MensajeDeError.classList.remove("show");
        }, 5000);
    };

    //Función para mostrar los datos solicitados en el panel lateral
    function MostrarDatosPizarra(data, mensaje=""){ 
        let PizarraDatos=document.getElementById("results");
        PizarraDatos.innerHTML="";

        if (!Array.isArray(data)) {
            data = [data];
        }

        if (data.length===0){
            AlertaError()

        } else {
            data.forEach(usuario => {
                PizarraDatos.innerHTML += `
                    <li>ID: ${usuario.id}, Nombre: ${usuario.name}, Apellido: ${usuario.lastname}</li>
                `;
            });

            if(mensaje){
                PizarraDatos.innerHTML+= `<li class="mensaje">${mensaje}</li>`;
            }
        }
    };


    //---Comienzo de lógica para la solicitud GET---
    function obtenerDatosUser() { //Función para realizar la solicitud GET

        let endpoint = "users";  
        let id = inputGet1Id.value;

        let MockAPI=`https://654fd8ff358230d8f0cdc1a2.mockapi.io/${endpoint}`;

        if (id){
            MockAPI+= `/${id}`;
        }

        fetch(MockAPI)
        .then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                throw new Error('Usuario no encontrado');
            }
        })
        .then((data) => {
            MostrarDatosPizarra(data);
            })
            .catch(() => 
                AlertaError());
    };

let BotonAgregar=document.getElementById("btnGet1");
BotonAgregar.addEventListener("click", ()=>{
    obtenerDatosUser()
});
//---Fin de lógica de la solicitud GET---



//---Comienzo de lógica para la solicitud POST---
let InputNombre=document.getElementById("inputPostNombre");
let InputApellido=document.getElementById("inputPostApellido");
let BotonNuevosDatos=document.getElementById("btnPost");

//Función para habilitar el boton de la solicitud POST solo si los campos cuentan con datos
function HabilitarBoton(){
    BotonNuevosDatos.disabled= !(InputNombre.value.trim() && InputApellido.value.trim())
};

InputNombre.addEventListener("input", HabilitarBoton); //Llamar a la funcion de "HabilitarBoton" para el input de Nombre
InputApellido.addEventListener("input", HabilitarBoton); //Llamar a la funcion de "HabilitarBoton" para el input de Apellido

//Función para realizar la solicitud POST y agregar nuevos datos de usuario
function CrearNuevoUser() {
    let endpoint = "users";  
    let MockAPI=`https://654fd8ff358230d8f0cdc1a2.mockapi.io/${endpoint}`;

    let DatosNuevoUser= {
        name: InputNombre.value.trim(),
        lastname: InputApellido.value.trim()
    };

    BotonNuevosDatos.disabled=!(DatosNuevoUser.name && DatosNuevoUser.lastname);

    fetch(MockAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosNuevoUser)
    })
        .then(res => res.json())
        .then(data => {
            MostrarDatosPizarra(data, "Los datos del nuevo usuario se agregaron correctamente")
        })

        .catch(error => console.error('Error:', error));
};

BotonNuevosDatos.addEventListener("click", ()=>{
    CrearNuevoUser()
}) 
//---Fin de lógica para la solicitud POST---



//---Comienzo de lógica para la solicitud PUT---
let InputIDPut=document.getElementById("inputPutId");
let BotonPut=document.getElementById("btnPut");
let InputPutNombre=document.getElementById("inputPutNombre");
let InputPutApellido=document.getElementById("inputPutApellido");
let ModalPut=document.getElementById("dataModal");
let BotonGuardarModal = document.getElementById("btnSendChanges");
let BotonCancelarModal = document.getElementById("btnCancelar");

//Función para habilitar el boton de "modificar" datos al tener datos ingresados
function HabilitarBotonModificar(){ 
    BotonPut.disabled= !(InputIDPut.value.trim())
};

InputIDPut.addEventListener("input", HabilitarBotonModificar); //Llamar a la función

//Función para habilitar el boton de "guardar" del modal, cuando todos los campos tienen datos
function HabilitarBotonGuardarPUT(){
    BotonGuardarModal.disabled= !(InputPutNombre.value.trim() && InputPutApellido.value.trim());
};

InputPutNombre.addEventListener("input", HabilitarBotonGuardarPUT); //Llamar a la función para el campo de nombre
InputPutApellido.addEventListener("input", HabilitarBotonGuardarPUT);//Llamar a la función para el campo de apellido

//Evento para abrir el modal al hacer click en el boton de "modificar"
BotonPut.addEventListener("click", ()=>{
    ModalPut.classList.add('show');
    ModalPut.style.display = 'block';
    
});

//Evento para cerrar el modal al hacer click en "cancelar"
BotonCancelarModal.addEventListener("click", () => {
    ModalPut.style.display = 'none';
    ModalPut.classList.remove('show');
    
    inputPutNombre.value = '';
    inputPutApellido.value = '';
})

//Función para realizar la solicitud put y modificar los datos
function ModificarDatosUser(){
    let endpoint = "users";
    let id = InputIDPut.value.trim();  
    let MockAPI=`https://654fd8ff358230d8f0cdc1a2.mockapi.io/${endpoint}/${id}`;

    let DatosModificar= {
        name: InputPutNombre.value.trim(),
        lastname: InputPutApellido.value.trim()
    };

    fetch(MockAPI, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DatosModificar)
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Usuario no encontrado');
        }
    })
        .then((data) => {
            MostrarDatosPizarra(data, "Los datos del usuario han sido modificados correctamente");
            ModalPut.style.display = 'none';
            ModalPut.classList.remove('show');

            InputPutNombre.value = '';
            InputPutApellido.value = '';
        })

        .catch(() =>{
            AlertaError();
        });
}

BotonGuardarModal.addEventListener("click", ModificarDatosUser);
//---Fin de lógica para la solicitud PUT---



//---Comienzo de lógica para la solicitud DELETE ---
let BotonBorrar=document.getElementById("btnDelete");
let InputDelete=document.getElementById("inputDelete"); 

//Función para habilitar el boton de borrar solo si hay una ID
function HabilitarBotonBorrar(){ 
    let IDDelete = InputDelete.value.trim(); 
    BotonBorrar.disabled= !(IDDelete.length > 0);
};

InputDelete.addEventListener("input", HabilitarBotonBorrar); 

//Función para realizar la solicitud DELETE y borrar un usuario por su ID
function BorrarDatosUser(){
    let endpoint = "users";
    let id = InputDelete.value.trim();  
    let MockAPI=`https://654fd8ff358230d8f0cdc1a2.mockapi.io/${endpoint}/${id}`;

    fetch(MockAPI, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },

    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error('Usuario no encontrado');
        }
    })
        .then((data) => {
            MostrarDatosPizarra(data, "Se han eliminado los datos del usuario correctamente");
        })
        
        .catch(() =>{
            AlertaError();
        });
}

BotonBorrar.addEventListener("click", BorrarDatosUser)
//---Fin de lógica para la solicitud DELETE ---

}); //Final Evento DOM

