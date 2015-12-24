	{{ ADD('entidad' + VALORES.ID + ' DTVLA.DVM_ENTIDAD_CANONICA_MRIBS.ID%type;', 'DECLARACIONES') }}
  BEGIN

    select ID into entidad{{ VALORES.ID }} where NOMBRE = {{ VALORES.NOMBRE }};

    EXCEPTION NO_DATA_FOUND THEN

      entidad{{ VALORES.ID }} := {{ VALORES.ID }};

  END;
