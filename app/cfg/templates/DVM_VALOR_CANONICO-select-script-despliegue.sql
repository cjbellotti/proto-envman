	{{ ADD('valorcanonico' + VALORES.ID + ' DTVLA.DVM_VALOR_CANONICO.ID%type;', 'DECLARACIONES') }}
  BEGIN

    select ID into valorcanonico{{ VALORES.ID }} where ID_ENTIDAD_CANONICA = {% if EXIST(DECLARACIONES, 'entidad' + VALORES.ID_ENTIDAD_CANONICA) %} entidad{{ VALORES.ID_ENTIDAD_CANONICA }} {% else %} {{ VALORES.ID_ENTIDAD_CANONICA }} {% endif %} AND VALOR_CANONICO  = {{ VALORES.VALOR_CANONICO }};

    EXCEPTION NO_DATA_FOUND THEN

      valorcanonico{{ VALORES.ID }} := {{ VALORES.ID }};

  END;
