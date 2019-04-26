# Todo API

**To run:** The API requires a mongodb database, node v8 and (not required but helpful) postman.

### Usage

 * You have to authenticate to add todos (you need to create an account)

 * On this account you can create, delete, and update todos

 * You can only see and modify the todos which were created by yourself
 
**Note:** In this repository are only the routes for the todo-api. This project has no GUI. I started one in the _public/_ folder, but it will not be completed.

This is also a part of _The Complete Node.js Developer Course_ by Andrew Mead.

### User Routes:
 * POST /users
   * required: JSON body with email and password
   * returns: x-auth token (as header property). This is required to make requests from now on

 * POST /users/login
   * required: JSON body with email and password
   * returns: newly generated x-auth token
   
 * GET /users/me
   * required: x-auth header with valid token
   * returns: user
   
 * DELETE /users/me/token
   * required: x-auth header with valid token
   * returns: ``200`` with empty body
 
 ### Todo Routes:
 
 * POST /todos
   * required: x-auth header with valid token && JSON body with todo text
   * returns: the new todo
 
 * GET /todos
   * required: x-auth header with valid token
   * returns: all todos which were created by the (x-auth) user
   
 * GET /todos/:id
   * required: x-auth header with valid token, todo id (after /todos/{tokenID})
   * returns: the todo with all properties
   
 * PATCH /todos/:id
   * required: x-auth header with valid token, todo id (after /todos/{tokenID}), JSON Body with the updated propery
   * returns: the updated todo with all properies
   
 * DELETE /todos/:id
   * required: x-auth header with valid token, todo id (after /todos/{tokenID})
   * returns: now deleted todo
