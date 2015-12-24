	{{ ADD('sistema' + VALORES.ID + ' DTVLA.DVM_SISTEMA_MRIBS.ID%type;', 'DECLARACIONES') }}
  BEGIN

    select ID into sistema{{ VALORES.ID }} where NOMBRE = {{ VALORES.NOMBRE }} AND PAIS = {{ VALORES.PAIS }};

    EXCEPTION NO_DATA_FOUND THEN

      sistema{{ VALORES.ID }} := {{ VALORES.ID }};

  END;
