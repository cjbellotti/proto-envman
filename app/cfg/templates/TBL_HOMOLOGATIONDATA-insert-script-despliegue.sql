	select count(1) into V_COUNT from DTVLA.TBL_HOMOLOGATIONDATA where COUNTRYID = {{ VALORES.COUNTRYID }} and CANONICALCODE = {{ VALORES.CANONICALCODE }};
	counter_ins_tot:=counter_ins_tot+1;
	if V_COUNT = 0 then
		insert into DTVLA.TBL_HOMOLOGATIONDATA (COUNTRYID, 
                                            CANONICALCODE,
                                            HOMOLOGATEDCONCEPT,
                                            TARGETSYSTEMCODE,
                                            CATEGORYID,
                                            HOMOLOGATEDCODE) 
                                          values 
                                           ({{ VALORES.COUNTRYID }},
                                            {{ VALORES.CANONICALCODE }},
                                            {{ VALORES.HOMOLOGATEDCONCEPT }},
                                            {{ VALORES.TARGETSYSTEMCODE }},
																						{% if EXIST(DECLARACIONES, 'homologationcategories' + VALORES.CATEGORYID) %} homologationcategories{{ VALORES.CATEGORYID }} {% else %} {{ VALORES.CATEGORYID }} {% endif %},
                                            {{ VALORES.HOMOLOGATEDCODE }});
		counter_ins:=counter_ins+1;
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_ins_tot) || ' se inserto OK' );
	else
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_ins_tot) || ' ya existe' );
	end if;			
