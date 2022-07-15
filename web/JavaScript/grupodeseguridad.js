let grupos=[];

function getSecurity_group_by_user(datos){
    axios.get(`http://localhost:3000/user_group/${datos.user_name}`)
    .then(response=>{

            grupos=response.data;
        //let table = document.getElementById("tbody");
            let username=document.getElementById("user_name");
            username.textContent=`Usuario: ${datos.user_name}`;
            let table = document.querySelector("#table-users tbody");
            //console.log(grupos);
            //console.log(datos);
            table.innerHTML="";
            for (const itemUsuario of grupos){
               
                let tr = "<tr><td>" + datos.user_name + "</td> <td>" + itemUsuario.get_namegroup_by_user_name + "</td></tr>";
                    table.innerHTML += tr;
              }
    }).catch(error => console.log(error))
}

function eventbutton(){
    let button = document.getElementById("Registeru");
    button.addEventListener("click", ()=> {
        let user_name = document.getElementById("user_name");
        let user ={
            user_name:user_name.value
        };
        //console.log(user);
        getSecurity_group_by_user(user);
    })
}

window.onload = function(){
let form=document.getElementById("form-register");
form.addEventListener("submit",function(e){
    e.preventDefault();
    let transactionFormData=new FormData(form);
});
    eventbutton();
}