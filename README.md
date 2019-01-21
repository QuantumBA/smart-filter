# smart-filter
WIP!

1º Añadir la carpeta SmartFilter al proyecto
2º En el componente/vista a renderizar el filtro, importar con import SmartFilter from ../components/SmartFilter
3º A modo de ejemplo, definir la siguiente lista demo:
const filterTypes = [
  { value: 'name', placeholder: 'Nombre' },
  { value: 'lastName', placeholder: 'Apellido' },
  { value: 'email', placeholder: 'Email' },
]
4º En el estado inicial del componente (state = { }), añadir isFilterTypeDefined: false
5º Definir el siguiente método: 
_setFilterTypeDefinedStatus = (isDefined) => {
  this.setState({ isFilterTypeDefined: isDefined })
}
6º En la función render() del componente, añadir:
Ejemplo con lista de empleados de RA Corporate:
let listDataSource = filterTypes
let searchKey = 'placeholder'
if (this.state.isFilterTypeDefined && employees && employees.byHash) {
  listDataSource = Object.values(employees.byHash)
  searchKey = 'firstName'
}
7º En el return() junto al resto de componentes del render,
<SmartFilter
  listDataSource={listDataSource}
  setFilterTypeDefinedStatus={this._setFilterTypeDefinedStatus}
  isFilterTypeDefined={this.state.isFilterTypeDefined}
  searchKey={searchKey}
/>

MODO DE USO - Hacer focus en el textInput (clicK), se despliega la lista con los tipos de filtros (atributos/propiedades). 
La primera selección define el tipo de filtro (buscar por nombre), luego se renderiza una segunda lista con todos los resultados disponibles,
y un segundo click oculta la lista y añade/genera un CHIP [ tipo de filtro : nombre/valor ]

--TODO--
* Eliminar chips de la lista al presionar el icono X
* Fitrar lista según se va escribiendo (WIP filterList() en index.js)
* Control de errores
* Definir más props para cambiar los estilos (Ahora mismo se permiten algunos props para contenedores y textos, los estilos están definidos en styles.js para todos los módulos
