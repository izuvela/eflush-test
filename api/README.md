# eFlush REST API


## Database

Docker is used to run a PostgreSQL:v15 database.

To compose and start a database, navigate to the src/db/entrypoint folder and run ` docker-compose up -d `.

This will also create an eflush_app schema and a system user - the application connects to the database using those credentials.

Database port, root user and root password are defined in the docker-compose.yml file. Those are used to manually connect to the database (e.g. DataGrip).

NOTE: folders must not have `/` in their name otherwise it will cause an error

## Project scripts

1.  `yarn install` - to install project dependencies

2.  `yarn watch` - to start typescript compiler. Transpiled javascript code gets stored in the /dist folder which is automatically created.

3.  `yarn start` - to start the project in the development mode. This mode uses nodemon to watch for changes and restart the server.

4.  `yarn start-prod` - to start the project in the production mode. This mode starts the project using node.

- Note: Both start scripts run the dist/index.js file. That means that the typescript compiler needs to be running since that's how that file gets created.

- Note 2: In order to run project, environment variables need to be defined. Use `.env` file to define them (not yet).

  
## Migrations

In development, update existing db migrations (src/db/migrations) to make changes to the database.

Once dev migrations are updated, to apply them, do the following:

1. Run `docker stop eflush-db` to stop the database container (if it's running)

2. Run `docker rm eflush-db` to delete the container

3. Navigate to the src/db/entrypoint folder and just run `docker-compose up -d` to initialize a fresh database.

4. Run the project, migrations will be applied automatically

Use `npx typeorm migration:create src/db/migrations/prod/<descriptive-migration-name>` to create a new (production) migration (if we ever get to this point)

  

## Project structure

API consists of five basic layers:

1. db layer 
	* used to compose a database, provide a connection object for the created database and run the migrations. 
	* The `docker-compose.yml` file contains instructions for creating a database container. It also contains a command to copy the `postgresql` folder into the containers `docker-entrypoint-initdb.d` directory. Sql scripts in the 'postgresql' folder get executed because after the docker entrypoint composes a container it will run any `*.sql` files and run any executable `*.sh` scripts found in the`docker-entrypoint-initdb.d` directory of a container to do further initialization before starting the service. 
	* `data-source.ts` file contains and object with all the metadata needed for a database connection
	* `migrations` directory contains one set of migrations, DDL-s (Data Definition Language) and inserts. The `...-ddl.ts` file contains sql scripts for creating the database structure (tables, keys, constraints, etc.) . The `...-populate-tables.ts` file contains test data sql inserts, aka. populates tables with some mock data

2. dao layer
	* The Data Access Object (DAO) pattern is a structural pattern that allows us to isolate the application/business layer from the persistence layer. More specifically, it contains a bunch of repository objects wrapped around entities. Those object provide mechanisms for storage, retrieval, search, update and delete operations on entities (tables in the database). Repositories are created by TypeORM and already come with predefined methods for the mentioned mechanisms. Repositories can also be extended, aka. custom methods can be defined (sql can directly be used in them). 

3. service layer
	* Facilitates communication between the controller and the db (persistance) layer. Additionally, all of the main business logic is stored in the service layer.

4. controller layer
	* Responsible for processing incoming REST API requests. It will do the basic request data validation (make sure that the request body contains the necessary data), pass the request to the right service method and return the response.

6. (0) model layer - special
	* Contains all entities, constants, request and response objects that the application needs. Entities correspond to the actual database tables and are their representation in the memory. Constants are enums and other global variables. Request objects define data the the individual route needs to receive in the http request, while the response objects define what will be returned by that route as an answer for the successfully processed request.
  

Note: Each layer can ONLY communicate with layers below it. For example, service layer only knows about db and dao layers and should only use those. Model layer is special because every layer uses it. It keeps all the other layers in sync.

## Running the application

1. Compose and start a database as described above
2. Run `yarn install` to install all of the projects dependencies
	* before running `yarn install` run this command: `npm i -g node-pre-gyp tsc nodemon`
3. Start the TypeScript compiler in a terminal using the `yarn watch` script
4. Start the application in another terminal window using the `yarn start` script
