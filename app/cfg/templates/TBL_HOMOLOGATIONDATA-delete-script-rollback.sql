	select count(1) into V_COUNT from DTVLA.TBL_HOMOLOGATIONDATA where COUNTRYID = {{ VALORES.COUNTRYID }} and CANONICALCODE = {{ VALORES.CANONICALCODE }};
	counter_del_tot:=counter_del_tot+1;
	if V_COUNT > 0 then
		delete from DTVLA.TBL_HOMOLOGATIONDATA where COUNTRYID = {{ VALORES.COUNTRYID }} and CANONICALCODE = {{ VALORES.CANONICALCODE }};
		counter_del:=counter_del+1;
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_del_tot) || ' se eliminó OK' );
	else
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_del_tot) || ' no existe.' );
	end if;
