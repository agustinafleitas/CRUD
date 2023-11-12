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

    //Comienzo de solicitud GET
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


//Comienzo de solicitud POST
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

}); //Final Evento DOM

