	select count(1) into V_COUNT from SMSCHANNEL.TBL_RESPONSE_MESSAGES_CATALOG where ID_MESSAGE = {{ VALORES.ID_MESSAGE }} and ISO2CODE = {{ VALORES.ISO2CODE }};
	counter_ins_tot:=counter_ins_tot+1;
	if V_COUNT = 0 THEN
		insert into {{ TABLA }} (ID_MESSAGE, TEXT_MESSAGE, ISO2CODE) values ({{ VALORES.ID_MESSAGE }}, {{ VALORES.TEXT_MESSAGE }}, {{ VALORES.ISO2CODE }});
		counter_ins:=counter_ins+1;
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_ins_tot) || ' se inserto OK' );
	else
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_ins_tot) || ' ya existe' );
	end if;		
