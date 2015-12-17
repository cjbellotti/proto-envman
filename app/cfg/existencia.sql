select {{ campos }}
  from {{ origen }}
  {% if where %}
    where {{ condicion }} 
  {% endif %}
