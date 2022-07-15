
------INICIALIZACION DE LAS TABLAS

CREATE TABLE User_Base
(	
	ID_U SERIAL NOT NULL PRIMARY KEY, 
	Name_U CHAR(20) NOT NULL UNIQUE,
	Password_U VARCHAR(30) NOT NULL,
	Estado_U INT NOT NULL,
	Fecha_ing_U TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE Access_Level
(
	ID_L INT NOT NULL PRIMARY KEY,
	Name_L VARCHAR(150) NOT NULL
);

CREATE TABLE Security_Groups
(
	ID_G INT NOT NULL PRIMARY KEY,
	Name_G VARCHAR(150) NOT NULL,
	Descripcion_G VARCHAR(300) NOT NULL
);

CREATE TABLE User_Security
(
	ID_U SERIAL NOT NULL,
	ID_L INT NOT NULL,
	ID_G INT NOT NULL,
	
	FOREIGN KEY (ID_U) REFERENCES User_Base(ID_U),
	FOREIGN KEY (ID_L) REFERENCES Access_Level(ID_L),
	FOREIGN KEY (ID_G) REFERENCES Security_Groups(ID_G)
);

------INICIALIZACION DE LOS NIVELES DE ACCESO Y GRUPOS DE SEGURIDAD

INSERT INTO public.security_groups(id_g, name_g, descripcion_g)
	VALUES ('1','Solo Lectura','Permiso de solo lectura.'),('2','Solo Escritura','Permiso de solo escritura.'),('3','Administrador','Permisos de Administrador.'),('4','Root','Total acceso.');

INSERT INTO public.access_level(id_l, name_l)
	VALUES ('1','Read'),('2','Write'),('3','Administrator'),('4','Owner');

------PROCEDURE PARA INSERTAR NUEVOS USUARIOS

create or replace procedure public.insert_usuario
(_name_u IN VARCHAR(20),
 _password_u IN VARCHAR(30),
 _fecha_ing_u IN TIMESTAMP WITHOUT TIME ZONE,
 _estado_u IN INT,
 _name_g IN VARCHAR(150),
 _id_l IN INT)
language 'plpgsql'
as $BODY$
declare id_us INT;
declare id_gr INT;
begin
    insert into user_base(name_u,password_u,fecha_ing_u,estado_u)
    values(_name_u,_password_u,_fecha_ing_u,_estado_u);
	select currval(pg_get_serial_sequence('user_base','id_u')) into id_us;
 
  select id_g into id_gr
  from security_groups
  where name_g = _name_g;
  
  
    insert into user_security (id_g,id_u,id_l)
    values(id_gr,id_us,_id_l);
end; $BODY$;


------FUNCTION PARA RECUPERAR EL NOMBRE DEL GRUPO DE SEGURIDAD

create or replace function get_namegroup_by_user_name(_name_u varchar) returns varchar as
$$
declare id_us INT;
declare name_group varchar;
begin
	id_us := (select id_u from user_base where name_u = _name_u);
	name_group:= (select security_groups.name_g from security_groups, user_security 
				where user_security.id_u = id_us and user_security.id_g = security_groups.id_g);
	return name_group;
end;
$$ language plpgsql;


------INSERCIONES DE EJEMPLO

call public.insert_usuario('franco','hola123','2022-06-20 00:00:00','0','Administrador','3');
call public.insert_usuario('gonzalo','contra123','2022-06-20 14:00:00','0','Administrador','3');
call public.insert_usuario('juan','12345','2022-06-20 19:20:00','1','Solo Lectura','1');
call public.insert_usuario('milagros','aiuhdi','2022-06-20 19:45:00','1','Solo Escritura','2');
call public.insert_usuario('nicolas','adwww','2022-06-20 08:20:00','1','Root','4');
call public.insert_usuario('alberto','ejemplo','2022-06-20 23:20:00','1','Solo Lectura','1');


