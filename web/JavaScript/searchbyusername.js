let users=[];
  let user;

  function getUser(datos) {
    console.log(datos);  
    axios.get(`http://localhost:3000/user/${datos.user_name}`)
    .then(response =>{ 
      let usuario=response.data;
          let name=document.getElementById("user_name");
          name.textContent=`Usuario: ${datos.user_name}`;
          
          //console.log("muestro usuario");
          //console.log(usuario);
          let usertable = document.querySelector("#table-usersu tbody");
          let estado;
          

          if(!usuario.estado_u)
            estado = "Activo";
          else
            estado = "Inactivo";
            usertable.innerHTML="";
          for (const itemUsuario of usuario){
              let fecha_hora=(itemUsuario.fecha_ing_u).replaceAll("T"," Hora: ");
              fecha_hora=fecha_hora.replaceAll(".000Z","");
            let tr = "<tr><td>" + itemUsuario.name_u + "</td> <td>" + estado + "</td> <td>" + fecha_hora + "</td></tr>";
                usertable.innerHTML += tr;
          }

      
    })
    .catch(error => console.log(error))
}

  
  window.onload = function() {
    let form = document.getElementById("form");

    form.addEventListener("submit",function(event){
        event.preventDefault();
        let transactionFormData=new FormData(form);
        });
    let boton = document.getElementById("Buscar");

    boton.addEventListener("click", function(e) {
            e.preventDefault();
          let user_name = document.getElementById("user_name");

          let usuario = { 
              user_name:user_name.value
          }; 
              getUser(usuario);
      });
  }