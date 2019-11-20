# crossref - This is a demo Application on NodeJs

## The functionality
1. Fetch data from http://api.crossref.org/works/
2. Process fethed data and save them on mongoDb
3. Serve data on the API http://localhost:3005/publications.
    * Support query parameters limit and offset.
    * default port 3005 - (**optional**) set **port** env variable  in .env file
    
    
## Use
### Must Have
 * ```npm install```
 * MongoDB service running - (**optional**) set **mongodb_url** env variable  in .env file

#### Development
  
 * ```npm start```
 * Navigate to http://localhost:3005/publications.
    
#### Test
* ``` npm test```
* Watch the green (hopefully) lights on console.



