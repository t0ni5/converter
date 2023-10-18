# Task description

Demo: https://majestic-hotteok-a2a24a.netlify.app


## Tech stack:

Language: TypeScript / JavaScript (ES6+)

Frontend: React.js / Angular / Vue.js

Backend: Nest.js / Express.js

Database: MongoDB/ PostgresQL/MySQL / Firebase

Tools: Redux(Toolkit)/ Jotai , Mongoose, TypeORM any other tool that can help you implement this task

## Basic:
● Use a public github repository.

● Public github repository must have README.MD with information about the test task,
running steps, link to demo.

● Demo should be deployed to one of the following services: DigitalOcean, GCP, AZURE,
AWS, Github actions, Heroku, Netlify.


## Behavioral:

After loading the main page there should be displayed the list of currencies (USD, EUR,
RUB, BYN) with values relative to the US dollar.
As you enter value into one of the fields, the others must be recalculated in real time in
accordance with the entered value. There should be a button “Add currency” to add any
currency from the list.

Optional:
*Application should have a second page/tab with List/ Table of all currencies converted
to 1 USD. We gonna have ability to sort them by ( NAME , VALUE)

## Functional:
● Design the application at your own discretion, but if you have no ideas for layout , take
https://myfin.by/converter as an example. Note that it should be rendered properly on
any device including mobile phones and it should have a user friendly interface.

● It should be possible to add / remove any currency from those presented in the selected
banking API. When you click on the “add currency” button, you need to add a new input
field with the converted value of the selected currency.

● All calculations should proceed on the server side, the frontend app should only be in
charge of rendering data.
Optional:

● *If you implementing second page with list of currencies , application should save its
state on tabs switching ( latest calculations and inputs’ values on first tab should be
saved and avoiding and it shouldn’t make request multiple times on the second tab)

● *Table/ list sortion should be implemented on the server side

● **Create a database and save all the currencies data in it

● **If the records are no more than 2 hours old then take them from DB , otherwise make a
call to the bank API.

## Assessment criteria:

● Layout should be adaptive and fit any screen.

● There shouldn’t be glitches(screen/component “jumps” and ect) when you adding /
removing new currency

● All page elements should be scalable in accordance with the current device screen
width.

● Semantic tags should be used

● Api calls shouldn't throttle your application.

● All data related to API calls to third party services , configurations and ect should be
stored in environment files.

● The application must have a clear file structure (services, dtos, schemas ect should be
placed in separate folders and had clear names)

● All incoming requests should be validated

● All values that used for calculations, checks and ect should be constants

● If you are using TypeScript all variables, components, requests, responses and ect
should be typed.

● The application must be error-tolerant( It shouldn’t crash if something went wrong)

● The application should be informative( In case of error it should show the reason)



# How to run

## Steps

Clone the  repository

```bash
 git clone  https://github.com/t0ni5/converter.git
```

Navigate to the backend folder



```bash
 cd converter/converter-backend
```
 Rename .env-rename into .env

Install dependencies

```bash
 npm i
```

Start the backend server

```bash
 npm start
```

Go to the frontend folder


```bash
 cd converter/converter-frontend
```


 Rename .env-rename to .env


Install dependencies for the frontend

```bash
 npm i
```

Start the frontend server

```bash
 npm start
```

READY!

