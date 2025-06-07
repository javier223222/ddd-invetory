# Game Inventory API Documentation

<div>
    <h2>Overview</h2>
    <p>
        This API provides functionality to manage a user's game inventory, including game purchases, 
        licenses, collections, and game states. It follows a Clean Architecture approach with 
        Domain-Driven Design principles.
    </p>
</div>

<div>
    <h2>Architecture</h2>
    <p>The codebase is organized into the following layers:</p>
    <ul>
        <li><strong>Domain Layer</strong>: Contains the core business models, value objects, and repository interfaces</li>
        <li><strong>Application Layer</strong>: Contains use cases that orchestrate domain objects and provide DTOs for data transfer</li>
        <li><strong>Infrastructure Layer</strong>: Contains implementations of repositories, controllers, and API routes</li>
    </ul>
</div>

<div>
    <h2>Key Domain Models</h2>
    <h3>Game States</h3>
    <p>Games can be in the following states:</p>
    <ul>
        <li><code>NO_INSTALADO</code> - Not installed</li>
        <li><code>INSTALANDO</code> - Installing</li>
        <li><code>INSTALADO</code> - Installed</li>
        <li><code>JUGANDO</code> - Playing</li>
        <li><code>DESINSTALANDO</code> - Uninstalling</li>
    </ul>

<h3>License Types</h3>
<p>Licenses can be of the following types:</p>
<ul>
<li><code>PERSONAL</code> - Personal license</li>
<li><code>TRANSFERIBLE</code> - Transferable license</li>
<li><code>TEMPORAL</code> - Temporary license</li>
<li><code>PERPETUA</code> - Perpetual license</li>
</ul>
</div>

<div>
    <h2>API Endpoints</h2>
    
<h3>Games Inventory Endpoints</h3>
    
<div>
<h4>GET /api/juegos-adquiridos</h4>
<p>Retrieves the list of purchased games for a user.</p>
        
<h5>Query Parameters</h5>
<table>
            <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>idusuario</td>
                <td>string</td>
                <td>Required</td>
                <td>User ID to retrieve games for</td>
            </tr>
            <tr>
                <td>page</td>
                <td>number</td>
                <td>1</td>
                <td>Page number for pagination</td>
            </tr>
            <tr>
                <td>limit</td>
                <td>number</td>
                <td>10</td>
                <td>Number of items per page</td>
            </tr>
            <tr>
                <td>coleccionId</td>
                <td>string</td>
                <td>Optional</td>
                <td>Collection ID to filter games by</td>
            </tr>
            <tr>
                <td>soloVisibles</td>
                <td>boolean</td>
                <td>true</td>
                <td>Filter to show only visible games</td>
            </tr>
        </table>
        
<h5>Response</h5>
        <pre><code>{
  "message": "Games retrieved successfully",
  "data": {
    "juegosAdquiridos": [
      {
        "idJuego": "string",
        "idUsuario": "string",
        "nombre": "string",
        "fechaCompra": "2023-01-01T00:00:00.000Z",
        "estado": "INSTALADO",
        "visible": true,
        "licenciaClave": "string",
        "colecciones": [
          {
            "id": "string",
            "nombre": "string"
          }
        ]
      }
    ],
    "total": 10,
    "totalPages": 1,
    "page": 1
  }
}</code></pre>
    </div>
    
<div>
        <h4>POST /api/juegos-adquiridos</h4>
        <p>Adds a new game to the user's library.</p>
        
        <h5>Request Body</h5>
        <pre><code>{
  "idUsuario": "string",
  "nombre": "string",
  "fechaCompra": "2023-01-01T00:00:00.000Z",
  "estado": "NO_INSTALADO",
  "clave": "string",
  "tipo": "PERSONAL",
  "validez": "2030-01-01T00:00:00.000Z"
}</code></pre>
        
<h5>Response</h5>
        <pre><code>{
  "message": "Juego agregado a la libreria",
  "data": {
    "idJuego": "string",
    "idUsuario": "string",
    "nombre": "string",
    "fechaCompra": "2023-01-01T00:00:00.000Z",
    "estado": "NO_INSTALADO",
    "visible": true,
    "licenciaClave": "string",
    "licencia": {
      "clave": "string",
      "tipo": "PERSONAL",
      "validez": "2030-01-01T00:00:00.000Z"
    }
  }
}</code></pre>
    </div>
<div>
        <h4>PATCH /api/juegos-adquiridos/:id/estado</h4>
        <p>Updates the state of a game.</p>
        
<h5>Path Parameters</h5>
        <table>
            <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>id</td>
                <td>string</td>
                <td>ID of the game to update</td>
            </tr>
</table>
        
<h5>Request Body</h5>
<pre><code>{
  "estado": "INSTALANDO"
}</code></pre>
        
<h5>Response</h5>
        <pre><code>{
  "message": "Estado del juego actualizado",
  "data": {
    "idJuego": "string",
    "idUsuario": "string",
    "nombre": "string",
    "fechaCompra": "2023-01-01T00:00:00.000Z",
    "estado": "INSTALANDO",
    "visible": true,
    "licenciaClave": "string"
  }
}</code></pre>
        
<h5>State Transition Rules</h5>
        <p>The following state transitions are allowed:</p>
        <ul>
            <li>NO_INSTALADO → INSTALANDO</li>
            <li>INSTALANDO → INSTALADO</li>
            <li>INSTALADO → JUGANDO</li>
            <li>INSTALADO → DESINSTALANDO</li>
            <li>DESINSTALANDO → NO_INSTALADO</li>
        </ul>
    </div>
    
<div>
        <h4>PATCH /api/juegos-adquiridos/:id/visibilidad</h4>
        <p>Toggles the visibility of a game in the user's library.</p>
        
<h5>Path Parameters</h5>
        <table>
            <tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Description</th>
            </tr>
            <tr>
                <td>id</td>
                <td>string</td>
                <td>ID of the game to update</td>
            </tr>
        </table>
        
<h5>Request Body</h5>
        <pre><code>{
  "visible": true
}</code></pre>
        
<h5>Response</h5>
        <pre><code>{
  "message": "Juego visible en biblioteca",
  "data": {
    "idJuego": "string",
    "idUsuario": "string",
    "nombre": "string",
    "fechaCompra": "2023-01-01T00:00:00.000Z",
    "estado": "INSTALADO",
    "visible": true,
    "licenciaClave": "string"
  }
}</code></pre>
    </div>
    
<h3>Collections Endpoints</h3>
    
<div>
        <h4>POST /api/colecciones</h4>
        <p>Creates a new collection.</p>
        
<h5>Request Body</h5>
        <pre><code>{
  "nombre": "My Favorite Games",
  "idUsuario": "string"
}</code></pre>
        
<h5>Response</h5>
        <pre><code>{
  "message": "Colección creada exitosamente",
  "data": {
    "id": "col-1234567890-abc123def",
    "nombre": "My Favorite Games",
    "idUsuario": "string"
  }
}</code></pre>
    </div>
    
<div>
<h4>POST /api/colecciones/:idColeccion/juegos</h4>
<p>Adds a game to a collection.</p>
        
<h5>Path Parameters</h5>
<table>
<tr>
                <th>Parameter</th>
                <th>Type</th>
                <th>Description</th>
</tr>
<tr>
                <td>idColeccion</td>
                <td>string</td>
                <td>ID of the collection</td>
</tr>
</table>
        
<h5>Request Body</h5>
        <pre><code>{
  "idJuego": "string"
}</code></pre>
        
        <h5>Response</h5>
        <pre><code>{
  "message": "Juego agregado a la colección exitosamente"
}</code></pre>
    </div>
</div>

<div>
    <h2>Error Handling</h2>
    <p>The API returns appropriate HTTP status codes and error messages:</p>
    
<table>
        <tr>
            <th>Status Code</th>
            <th>Error Type</th>
            <th>Description</th>
        </tr>
        <tr>
            <td>400</td>
            <td>DUPLICATE_LICENSE</td>
            <td>License key has already been activated by this user</td>
        </tr>
        <tr>
            <td>400</td>
            <td>INVALID_STATE_TRANSITION</td>
            <td>Invalid game state transition attempted</td>
        </tr>
        <tr>
            <td>404</td>
            <td>NOT_FOUND</td>
            <td>Requested resource not found</td>
        </tr>
        <tr>
            <td>500</td>
            <td>Server Error</td>
            <td>Generic server error</td>
        </tr>
    </table>
    
<h4>Example Error Response</h4>
    <pre><code>{
  "message": "Esta licencia ya ha sido activada por este usuario",
  "error": "DUPLICATE_LICENSE"
}</code></pre>
</div>

<div>
    <h2>Running the API</h2>
    <h3>Prerequisites</h3>
    <ul>
        <li>Node.js installed</li>
        <li>PostgreSQL database configured</li>
    </ul>
    
    <h3>Environment Setup</h3>
    <p>Create a <code>.env</code> file with your database connection string:</p>
    <pre><code>DATABASE_URL="postgresql://username:password@localhost:5432/library"</code></pre>
    
    <h3>Installation</h3>
    <pre><code># Install dependencies
npm install

# Run Prisma migrations
npx prisma migrate dev

# Start development server
npm run dev</code></pre>
    
    <h3>Available Scripts</h3>
    <table>
        <tr>
            <th>Command</th>
            <th>Description</th>
        </tr>
        <tr>
            <td><code>npm run dev</code></td>
            <td>Runs the server in development mode with hot-reload</td>
        </tr>
        <tr>
            <td><code>npm run build</code></td>
            <td>Builds the project for production</td>
        </tr>
        <tr>
            <td><code>npm start</code></td>
            <td>Runs the built project in production mode</td>
        </tr>
    </table>
</div>

<div>
    <h2>Architecture Diagram</h2>
    <p>This API follows Domain-Driven Design principles with a clean architecture approach:</p>
    <pre>
┌─────────────────────────────────────────────────────────┐
│                    Infrastructure Layer                  │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │ Controllers │  │   Routes    │  │   Repositories   │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                    Application Layer                     │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │  Use Cases  │  │    DTOs     │  │    Services     │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└──────────────────────────┬──────────────────────────────┘
                           │
┌──────────────────────────▼──────────────────────────────┐
│                      Domain Layer                        │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────┐  │
│  │   Entities  │  │Value Objects│  │  Repositories   │  │
│  │             │  │             │  │   Interfaces    │  │
│  └─────────────┘  └─────────────┘  └─────────────────┘  │
└─────────────────────────────────────────────────────────┘
    </pre>
</div>

<footer>
    <p>&copy; 2023 Game Inventory API - Implemented with DDD Architecture</p>
</footer>