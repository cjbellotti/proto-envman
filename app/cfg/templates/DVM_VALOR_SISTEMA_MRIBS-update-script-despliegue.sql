  {{ ADD('valorsistema' + VALORES.ID + ' DTVLA.DVM_VALOR_SISTEMA_MRIBS.ID%type;', 'DECLARACIONES') }}
  select count(1) into V_COUNT from DTVLA.DVM_VALOR_SISTEMA_MRIBS where ID_SISTEMA = {% if EXIST(DECLARACIONES, 'sistema' + VALORES.ID_SISTEMA) %} sistema{{ VALORES.ID_SISTEMA }} {% else %} {{ VALORES.ID_SISTEMA }} {% endif %} and ID_ENTIDAD_CANONICA = {% if EXIST(DECLARACIONES, 'entidad' + VALORES.ID_ENTIDAD_CANONICA) %} entidad{{ VALORES.ID_ENTIDAD_CANONICA}} {% else %} {{ VALORES.ID_ENTIDAD_CANONICA }} {% endif %} and ID_VALOR_CANONICO = {% if EXIST(DECLARACIONES, 'valorcanonico' + VALORES.ID_VALOR_CANONICO) %} valorcanonico{{ VALORES.ID_VALOR_CANONICO }} {% else %} {{ VALORES.ID_VALOR_CANONICO }} {% endif %};   
	counter_upd_tot:=counter_upd_tot+1;
	if V_COUNT > 0 then
    update DVM_VALOR_SISTEMA_MRIBS set (ID_SISTEMA = {% if EXIST(DECLARACIONES, 'sistema' + VALORES.ID_SISTEMA ) %} sistema{{ VALORES.ID_SISTEMA }} {% else %} {{ VALORES.ID_SISTEMA }} {% endif %}, ID_ENTIDAD_CANONICA = {% if EXIST(DECLARACIONES, 'entidad' +  VALORES.ID_ENTIDAD_CANONICA ) %} entidad{{ VALORES.ID_ENTIDAD_CANONICA }} {% else %} {{ VALORES.ID_ENTIDAD_CANONICA }} {% endif %}, ID_VALOR_CANONICO = {% if EXIST(DECLARACIONES, 'valorcanonico' + VALORES.ID_VALOR_CANONICO ) %} valorcanonico{{ VALORES.ID_VALOR_CANONICO }} {% else %} {{ VALORES.ID_VALOR_CANONICO }} {% endif %} and VALOR_SISTEMA = {{ VALORES.VALOR_SISTEMA }};
		counter_upd:=counter_upd+1;
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_upd_tot) || ' actualizado OK' );
	else
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_upd_tot) || ' inexistente.' );
	end if;		

