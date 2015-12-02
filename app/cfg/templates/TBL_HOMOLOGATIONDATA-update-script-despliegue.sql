	select count(1) into V_COUNT from DTVLA.TBL_HOMOLOGATIONDATA where COUNTRYID  = {{ ORIGEN.COUNTRYID }} and CANONICALCODE = {{ ORIGEN.CANONICALCODE }};
	counter_upd_tot:=counter_upd_tot+1;
	if V_COUNT > 0 then
		update DTVLA.TBL_HOMOLOGATIONDATA set (HOMOLOGATEDCONCEPT = {{ VALORES.HOMOLOGATEDCONCEPT }},
                                           TARGETSYSTEMCODE = {{ VALORES.TARGETSYSTEMCODE }},
                                           CATEGORYID = {% if EXIST(DECLARACIONES, 'homologationcategories' + VALORES.CATEGORYID) %} homologationcategories{{ VALORES.CATEGORYID }} {% else %} {{ VALORES.CATEGORYID }} {% endif %},
                                           HOMOLOGATEDCODE = {{ VALORES.HOMOLOGATEDCODE }})
                                        where COUNTRYID = {{ ORIGEN.COUNTRYID }} and CANONICALCODE = {{ ORIGEN.CANONICALCODE }};
		counter_upd:=counter_upd+1;
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_upd_tot) || ' actualizado OK' );
	else
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_upd_tot) || ' inexistente.' );
	end if;		

