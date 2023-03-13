# Titl API
This project was developer with NodeJS, Express and Postgres.

## Installation

1. Clone repository - `$ git clone https://github.com/klefcodes/titl-task.git`
2. Move to the directory - `$ cd titl-task`
3. Create a new file `.env` inside of the `root` directory. if it doesn't exist and copy the contents of `.env.example` into it to be able to run your server on production environment.
4. Install dependencies - `$ yarn install`
5. Migrate database - `$ prisma migrate dev --name init` (optional)
6. Create the invoice directory - `$ mkdir invoices`

## Running the app
Start up the server - Run `npm start` | `npm run dev` for development
Server should be running on `http://localhost:3000` by default.

Happy coding!