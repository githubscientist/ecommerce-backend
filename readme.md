E-Commerce Application:

This is a simple e-commerce application that allows users to view products, add products to cart, and checkout. The admin can manage products, users, and orders.

The application is built using the following technologies:

1. Frontend: React, Axios, React-Router-Dom V6, Bootstrap, Redux.

2. Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt, Multer, Nodemailer, Nodemon, Dotenv, Morgan, Cors, cookie-parser.

3. Tools: Postman, VS Code, Git, GitHub, Netlify, Render, Vite.

Steps:

Backend:

1. Create an empty directory and open it in VS Code.
2. Open the terminal and run the following command to create a package.json file:

```
npm init
```

3. create an entry point file (index.js).
4. Configure the package.json file. Add the following code:

```
"scripts": {
    "start": "node index.js"
  }
```

5. Create a readme.md file and add the project description.
6. Create an empty repository in GitHub.Com. Copy the repository URL.
7. Initialize the git repository in the project directory:

```
git init
```

8. Add the remote repository URL:

```
git remote add origin <repository-url>
```

9. Create a .gitignore file and add the following code:

```
node_modules
package-lock.json
DS_Store
.env
```

10. Rename the default branch from master to main:

```
git branch -m main
```

11. Add the changes to the staging area:

```
git add .
```

12. Commit the changes:

```
git commit -m "basic backend application setup"
```

13. Push the changes to the remote repository:

```
git push -u origin main
```

Database Setup:

1. Visit MongoDB.Com and create an account.
2. Create a new project and cluster.
3. Create a new user and password.
4. Open database access if necessary to change the user credentials and privileges.
5. Open network access to allow connections from anywhere by adding the IP address 0.0.0.0/0.
6. Create a new database and a collection.
7. Copy the connecting string from the cluster.
8. Install mongodb compass and connect to the database using the connecting string.

From the backend, connect to the database:

1. Copy the connection string from the cluster.
2. Install mongoose:

```
npm install mongoose
```

3. In the index.js file, add the following code:

```
const mongoose = require('mongoose');

mongoose.connect(connection_string);
```

4. Install dotenv:

```
npm install dotenv
```

5. Create a .env file and add the connection string:

```
MONGODB_URI=connection_string
```

6. Require the dotenv package in the index.js file:

```
require('dotenv').config();
```

7. Change the connection string in index.js inside mongoose.connect() function to

```
process.env.MONGODB_URI
```

8. Add the .env file to the .gitignore file.
9. Create a config.js file under the utils folder and add the following code:

```
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

module.exports = {
    MONGODB_URI
};
```

10. Require the config.js file in the index.js file:

```
const { MONGODB_URI } = require('./utils/config');
```

11. Update the variable process.env.MONGODB_URI to MONGODB_URI in the mongoose.connect() function.

Connect to the server using Express.js:

1. Install express:

```
npm install express
```

2. update the index.js file:

```
const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
```
