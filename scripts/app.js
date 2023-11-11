document.addEventListener('DOMContentLoaded', ()=>{
    let BotonAgregar=document.getElementById("btnGet1");

    function MostrarDatosPizarra(data){
        let PizarraDatos=document.getElementById("results");
        PizarraDatos.innerHTML="";

        if (!Array.isArray(data)) {
            data = [data];
        }

        if (data.lenght===0){
            PizarraDatos.innerHTML="El Usuario no existe o no ha sido encontrado";
        } else {
            data.forEach(usuario => {
                PizarraDatos.innerHTML += `
                    <li>ID: ${usuario.id}, Nombre: ${usuario.name}, Apellido: ${usuario.lastname}</li>
                `;
            });
        }
    }

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

BotonAgregar.addEventListener("click", ()=>{
    obtenerDatosUser()
})


//Comienzo de solicitud POST
let NuevoUsuario= {
    name: "Nombre",
    lastname:"Apellido"
};

function CrearNuevoUser(NuevoUsuario) {
    fetch(`https://654fd8ff358230d8f0cdc1a2.mockapi.io`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(NuevoUsuario)
    })
        .then(res => res.json())
        .then(data => {
            console.log('Usuario agregado:', data);
        })
        .catch(error => console.error('Error:', error));
};



}); //Final Evento DOM

