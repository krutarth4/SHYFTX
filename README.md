# SHYFTX

Frontend

This project was generated with Angular CLI version 18.0.5.
Docker deployment

Here in this you don't need to install libraries locally. the installation of Docker is necessary. Install docker desktop (https://www.docker.com/products/docker-desktop/).

After installing make sure in settings kubernetes is activated

after which get to the frontend folder and execute docker-compose up -d this will deploy the containers. For first time usage it might take a while but further development will be faster.

Also it will show live website hot reload, unless new libraries are added.

to stop execute docker compose down
Requirements

Install node js ~ https://nodejs.org/en/download/package-manager and install npm globally Then install angular cli https://angular.dev/tools/cli/setup-local ~ install the angular cli as is in the docs npm install -g @angular/cli

To start run first npm install to install all the dependency and 'ng serve' to start the website on localhost
Development server

Run ng serve for a dev server. Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.
Code scaffolding

Run ng generate component component-name to generate a new component. You can also use ng generate directive|pipe|service|class|guard|interface|enum|module.
Build

Run ng build to build the project. The build artifacts will be stored in the dist/ directory.
Running unit tests

Run ng test to execute the unit tests via Karma.
Running end-to-end tests

Run ng e2e to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
Further help

To get more help on the Angular CLI use ng help or go check out the Angular CLI Overview and Command Reference page.
