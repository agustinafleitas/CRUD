document.addEventListener('DOMContentLoaded', ()=>{
    
    function MostrarDatosPizarra(data){ //Función para mostrar los datos solicitados en el panel lateral
        let PizarraDatos=document.getElementById("results");
        PizarraDatos.innerHTML="";

        if (!Array.isArray(data)) {
            data = [data];
        }

        if (data.length===0){
            PizarraDatos.innerHTML="El Usuario no existe o no ha sido encontrado";
        } else {
            data.forEach(usuario => {
                PizarraDatos.innerHTML += `
                    <li>ID: ${usuario.id}, Nombre: ${usuario.name}, Apellido: ${usuario.lastname}</li>
                `;
            });
        }
    };

    //Comienzo de lógica para la solicitud GET
    function obtenerDatosUser() {

        let endpoint = "users";  
        let id = inputGet1Id.value;

        let MockAPI=`https://654fd8ff358230d8f0cdc1a2.mockapi.io/${endpoint}`;

        if (id){
            MockAPI+= `/${id}`;
        }

        fetch(MockAPI)
            .then(res => res.json())
            .then(data => {
                MostrarDatosPizarra(data)
            })
            .catch(error => console.error('Error:', error));
    };

let BotonAgregar=document.getElementById("btnGet1");
BotonAgregar.addEventListener("click", ()=>{
    obtenerDatosUser()
});
//Fin de lógica de la solicitud GET


//Comienzo de lógica para la solicitud POST
let InputNombre=document.getElementById("inputPostNombre");
let InputApellido=document.getElementById("inputPostApellido");
let BotonNuevosDatos=document.getElementById("btnPost");

function HabilitarBoton(){
    BotonNuevosDatos.disabled= !(InputNombre.value.trim() && InputApellido.value.trim())
};

InputNombre.addEventListener("input", HabilitarBoton);
InputApellido.addEventListener("input", HabilitarBoton);

function CrearNuevoUser(NuevoUsuario) {
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
            MostrarDatosPizarra(data)
        })
        .catch(error => console.error('Error:', error));
};

BotonNuevosDatos.addEventListener("click", ()=>{
    CrearNuevoUser()
}) 
//Fin de lógica para la solicitud POST

//Comienzo de lógica para la solicitud PUT
let InputIDPut=document.getElementById("inputPutId");
let BotonPut=document.getElementById("btnPut");
let InputPutNombre=document.getElementById("inputPutNombre");
let InputPutApellido=document.getElementById("inputPutApellido");
let ModalPut=document.getElementById("dataModal");
let BotonGuardarModal = document.getElementById("btnSendChanges");

function HabilitarBotonModificar(){ //Función para habilitar el boton de modificar datos al tener datos ingresados
    BotonPut.disabled= !(InputIDPut.value.trim())
};

InputIDPut.addEventListener("input", HabilitarBotonModificar); 

function HabilitarBotonGuardarPUT(){
    BotonGuardarModal.disabled= !(InputPutNombre.value.trim() && InputPutApellido.value.trim());
};

InputPutNombre.addEventListener("input", HabilitarBotonGuardarPUT);
InputPutApellido.addEventListener("input", HabilitarBotonGuardarPUT);

//Evento para abrir el modal al hacer click en el boton de "modificar"
BotonPut.addEventListener("click", ()=>{
    ModalPut.classList.add('show');
    ModalPut.style.display = 'block';
    
});

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
        .then(res => res.json())
        .then(data => {
            MostrarDatosPizarra(data)
            ModalPut.style.display = 'none';
            ModalPut.classList.remove('show');
        })
        .catch(error => console.error('Error:', error));
}

BotonGuardarModal.addEventListener("click", ModificarDatosUser);

}); //Final Evento DOM

