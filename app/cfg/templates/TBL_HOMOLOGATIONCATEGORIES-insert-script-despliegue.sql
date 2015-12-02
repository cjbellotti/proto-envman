	{{ ADD('homologationcategories'  + VALORES.CATEGORYID + ' DTVLA.TBL_HOMOLOGATIONCATEGORIES.CATEGORYID%type;', 'DECLARACIONES') }}
	select count(1) into V_COUNT from DTVLA.TBL_HOMOLOGATIONCATEGORIES where CATEGORYID = {{ VALORES.CATEGORYID }};
	counter_ins_tot:=counter_ins_tot+1;
	if V_COUNT = 0 THEN
		select nvl(max(CATEGORYID),0)+1 into homologationcategories{{ VALORES.CATEGORYID }} from DTVLA.TBL_HOMOLOGATIONCATEGORIES;
		insert into {{ TABLA }} (CATEGORYID, CATEGORYNAME, CANONICALCATEGORYCODE) values  (homologationcategories{{ VALORES.CATEGORYID }} ,{{ VALORES.CATEGORYNAME }}, {{ VALORES.CANONICALCATEGORYCODE }});
		counter_ins:=counter_ins+1;
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_ins_tot) || ' se inserto OK' );
	else
		select CATEGORYID into homologationcategories{{ VALORES.CATEGORYID }} where CATEGORYNAME = {{ VALORES.CATEGORYNAME }};
		DBMS_OUTPUT.PUT_LINE ('Registro: '|| TO_CHAR(counter_ins_tot) || ' ya existe' );
	end if;
