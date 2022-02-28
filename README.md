## Instalación de dependencias
```
yarn install
```

### Compila y recarga 'hot-reload' para desarrollo
```
yarn serve
```

# Variables de entorno
Estas variables de entorno se encuentran en el archivo `.env.example` del cual se debe de hacer una copia al archivo `.env` y modificar las variables de entorno correspondientes.

```
-- Producción
VUE_APP_PROD=/
VUE_APP_AXIOS_PROD_BASE_URL=

-- Local
VUE_APP_LOCAL=/
VUE_APP_AXIOS_LOCAL_BASE_URL=http://localhost:8000
```

# Convenciones 

## Orden en las propiedades de componentes Vue.
- Dejar un espacio entre cada propiedad.
- Uso de espacios, no tabs.
- A 2 espacios.

```javascript
export default {
  name: 'App',

  mixins: [mixinName],

  components: { },

  props: {
    propName: {
      type: Number,
      default:
    },
  },

  // Ciclos de vida de Vue establecidos en respectivo orden
  beforeEnter(to, from, next) {
    next();
  },

  beforeCreate () {...},

  created () {...},

   mounted () {...},

   // Bien (⌐■_■)
   data() {
     return {
       key: value
     }
   },
  //  Mal (´。＿。｀)
  data: () => ({...}),

  computed: {
    name() {
      return this.data
    }
   },

   watch: {
     data(newValue, oldValue) {...}
   },

   methods: {
     name() {...}
   },
}
```

## Respuestas json
Generalmente las respuestas a los endpoints vienen envueltas de la siguiente manera.

```json
{
  "error":true,
  "data":null,
  "message":"Email o contraseña inválidos",
  "code":401
}
```

## Vuex: módulos
Para el uso de módulos con Vuex se debe de escribir `NombreMódulo` + sufijo `Module`, esto para que se pueda acceder a alguna propiedad del módulo de una manera más clara, y si se requiere entrar de forma directa no exista confusión a qué módulo se está accediendo.

Ejemplo: 
```javascript
this.$store.commit('userModule/setUserToEdit', null)

const authUserRoles = store.getters['userModule/getAuthRoles']
```


## Peticiones usndo `Resource`
El archivo resource es una clase que usa un archivo de nombre `Service` el cual exporta a axios configurado.

Para usar resource se debe de crear una nueva instancia estableciendo el `endpoint` del recurso y su nombre para hacer las peticiones a este recurso.

```javascript
import Resource from '@/api/Resource'

const users = new Resource('/api/users', 'Users')

// 
// Uso del recurso que obtiene una colección basado en el endpoint definido.
// 
users.all()
```