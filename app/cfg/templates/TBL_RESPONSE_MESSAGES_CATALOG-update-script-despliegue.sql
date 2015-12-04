	select count(1) into V_COUNT from SMSCHANNEL.TBL_RESPONSE_MESSAGES_CATALOG where ID_MESSAGE = {{ ORIGEN.ID_MESSAGE }} and ISO2CODE = {{ ORIGEN.ISO2CODE }};
	counter_upd_tot:=counter_upd_tot+1;
	if V_COUNT > 0 then
		update SMSCHANNEL.TBL_RESPONSE_MESSAGES_CATALOG set (TEXT_MESSAGE = {{ VALORES.TEXT_MESSAGE }}) where ID_MESSAGE = {{ ORIGEN.ID_MESSAGE }} and ISO2CODE = {{ ORIGEN.ISO2CODE }};
		counter_upd:=counter_upd+1;
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_upd_tot) || ' actualizado OK' );
	else
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_upd_tot) || ' inexistente.' );
	end if;		

