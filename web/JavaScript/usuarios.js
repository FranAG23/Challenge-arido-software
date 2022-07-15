
let buttonregister = document.getElementById('Register');

let buttonusers = document.getElementById('View-users');


//funcion para llenar una tabla con los usuarios en la bd
function LlenarTabla(){
    fetch('http://localhost:3000/users').then((Response)=>Response.json()).then((users)=>{ 

     let usertable = document.querySelector("#table-users tbody");
     let estado;
     usertable.innerHTML="";
     for (const itemUsuario of users) {
        let fecha_hora=(itemUsuario.fecha_ing_u).replaceAll("T"," Hora: ");
              fecha_hora=fecha_hora.replaceAll(".000Z","");
        if(!users.estado_u)
        estado = "Activo";
     else
       estado = "Inactivo";
        let tr = "<tr><td>" + itemUsuario.name_u + "</td> <td>" + estado + "</td> <td>" + fecha_hora + "</td></tr>";
        usertable.innerHTML += tr;
     }
    });
}

function postUser(datos) {
    /*
    console.log("estos son los datos que llegan al post");
    console.log(datos); 
    
    fetch('http://localhost:3000/users/insert',{
        method : 'Post',
        body: datos
    })
*/

    axios.post('http://localhost:3000/users/insert', datos)
    .then(response => {
        

        if (response.status === 200) {
            alert("Usuario creado con Exito");
        } else {
            alert("Usuario no creado");
        }
    });
}

window.onload = function() {
    let form = document.getElementById("form-register");

    form.addEventListener("submit",function(event){
        event.preventDefault();
        let transactionFormData=new FormData(form);
        });

    buttonregister.addEventListener("click", (e)=>{
        e.preventDefault();
        let user_name = document.getElementById("user_name");
        let password = document.getElementById("password");
        let sgroupname = document.getElementById("sgroup_name");
        let grupo = sgroupname.value;
        let access_level;

        let fecha = new Date().toLocaleDateString();
        let hora = new Date().toLocaleTimeString();
        fecha=fecha.split("/");
        if(grupo==="Solo Lectura"){
            access_level=0;
        }else{
            if(grupo==="Solo Escritura"){
                access_level=1;
            }else{
                if(grupo==="Administrador"){
                    access_level=2;
                }else{
                    access_level=3;
                }
            }   
        }

        let fecha_created = `${fecha[2]}-${fecha[1]}-${fecha[0]} ${hora}`;
        let user ={
            name_u:user_name.value,
            password:password.value,
            fecha_ing_u:fecha_created,
            estado:1,
            name_g:sgroupname.value,
            id_l:access_level
        };
        postUser(user)
        //LlenarTabla(user)
    });

    buttonusers.addEventListener('click', function(e){
        e.preventDefault();
       LlenarTabla();
        });
}
