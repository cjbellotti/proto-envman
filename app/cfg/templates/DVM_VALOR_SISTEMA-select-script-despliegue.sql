	{{ ADD('valorsistema' + VALORES.ID + ' DTVLA.DVM_VALOR_SISTEMA.ID%type;', 'DECLARACIONES') }}
  BEGIN

    select ID into valorsistema{{ VALORES.ID }} where ID_SISTEMA = {% if EXIST(DECLARACIONES, 'sistema' + VALORES.ID_SISTEMA) %} sistema{{ VALORES.ID_SISTEMA }} {% else %} {{ VALORES.ID_SISTEMA }} {% endif %} and ID_ENTIDAD_CANONICA = {% if EXIST(DECLARACIONES, 'entidad' + VALORES.ID_ENTIDAD_CANONICA) %} entidad{{ VALORES.ID_ENTIDAD_CANONICA }} {% else %} {{ VALORES.ID_ENTIDAD_CANONICA }} {% endif %} and ID_VALOR_CANONICO  = {% if EXIST(DECLARACIONES, 'valorcanonico' + VALORES.ID_VALOR_CANONICO) %} valorcanonico{{ VALORES.ID_VALOR_CANONICO }} {% else %} {{ VALORES.ID_VALOR_CANONICO }} {% endif %} and VALOR_SISTEMA = {{ VALORES.VALOR_SISTEMA }};

    EXCEPTION NO_DATA_FOUND THEN

      valorsistema{{ VALORES.ID }} := {{ VALORES.ID }};

  END;
