# Reserve your beach seat

This project was created to demonstrate a beach seat reservation system. The application was written in TypeScript with Angular 8. All the reservations are stored in the cloud database (MongoDB). For communications between database and application, I created REST API (Node.js with Express and Mongoose). For the graphic layer, I used Angular Material (data pickers and pagination) and Bootstrap (nav and grid layout).

![seach-and-beach-screenshot](https://i.imgur.com/muDmxno.jpg)

## How it works

There are two ways - you can make a reservation without login or create an account and then, reserve your seat. All the reservations are stored in the cloud database (through MongoDB). You can easily display your reservations in user panel (when logged).  

## Getting started

Make sure you have the Angular CLI installed globally. I use NPM to manage the dependencies, so we strongly recommend you to use it. Run npm install to resolve all dependencies (might take a minute).

Run ng serve for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

Live demo: https://michalzmu.github.io/seat-and-beach-reservation/
API GIT: https://github.com/MichalZmu/seat-and-beach-reservation-api

Test account: 
email: test@test.pl
password: test
