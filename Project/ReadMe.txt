Requirements for working on this Project

# INSTALL Python 3.10.0 on your system.
   - Got to Customized Installation
   - Select all the options in the first window, Click Next
   - Select all except the last two options in the second window, Click Next
   - Complete Installation

# INSTALL XAMPP Apache MySql Server on your machine
    - Just follow the default settings


// XAMPP settings ============================

# Create a new database
    - Run the XAMPP
    - Start the Apache and MySQL modules
    - Create a new database named "spitrack"


// Django Based Dependencies =========================

# Install Django
    - pip install django

# Install Django Rest Framework
    - pip install djangorestframework

# Install Django Cors Header for React Connectivity
    - pip install django-cors-headers
    - If the above command does not work use this - "python -m pip install django-cors-headers"

# Install MySQlClient for Django
    - pip install mysqlclient
    - If the above command does not work use this - "pip install --only-binary :all: mysqlclient"

# Install Djoser with JWT Authentication module
    - pip install -U djoser
    - pip install -U djangorestframework_simplejwt
    - Documentation at -> https://djoser.readthedocs.io/en/latest/getting_started.html

# Install Beautiful Soup 4
    - pip install beautifulsoup4

# Install Requests
    - pip install requests

# Install LXML Parser
    - pip install lxml

# Install PyPDF2
    - pip install PyPDF2

# Install docx2txt
    - pip install docx2txt

# Install python-pptx
    - pip install python-pptx

# Install smtplib email
    - pip install secure-smtplib

// Django Commands ==============================

# Make Migrations to your database
    - python manage.py makemigrations
    - python manage.py migrate

# Run Django Server
    - python manage.py runserver


//  React Basics =================================

# Create React App (Only if the project is not created, Here it is already created)
    - npx create-react-app my-app - // Incase of my-app is frontend

# Go inside to your react app directory, here "frontend" and install node modules
    - npm install

# Run React Server
    - npm start


//  React Based Dependencies =================================

# React Router DOM
    - npm install react-router-dom

# Bable Parser
    - npm install --save-dev @babel/parser

// Install Axios for API
    - npm install react-axios

// VS Code Extentions ==================================

# Simple React Snippets
    - Install it from the VS code extensions
    - Go to Settings and Search for "Emmets"
    - On the Emmet: Include languages Place "Item: javascript" and "Value: javascriptreact" and Add it.


// Install Bootstrap 5 using Terminal
    - npm install react-bootstrap bootstrap@5.1.3
    - Place this in index.js "import 'bootstrap/dist/css/bootstrap.min.css';"

//  Firebase =================================

# Execution Policy Configuration for Firebase Login "Go to Admin PowerShell and use the Following Commands"
    - get-ExecutionPolicy
    - set-ExecutionPolicy Unrestricted
    - set to all
    - get-ExecutionPolicy

# Firebase Global Setup in Machine
    - npm install -g firebase-tools "After installing it delete the ps1 file if any error"
    - firebase login
    - firebase init

# Build Folder Generation
    - npm run build

# Deploy React App to Firebase
    - firebase deploy

# Django connection with Firebase Realtime Database
    - pip install pyrebase4

// Django Deployment on Heroku ================================

# Installations Required
    - Install the Heroku CLI into your computer -> https://devcenter.heroku.com/articles/heroku-cli
    - Create An app "project" in your heroku account

# Additional Heroku Commands
    - Consider the heroku app as a git repo, now to connect to the heroku repo use this command -> heroku git:remote -a <yourappname> -> Eg. heroku git:remote -a spitrack-py
    - Note that the above command needs to be executed inside an actual git repository
    - Use the following command to get the all git repository links - git remote -v

# Alternative to Development Server "Python manage.py runserver"
    - pip install gunicorn
    - pip install whitenoise
    - Instead of the manage.py file we will access the wsgi.py file "Note Fist move to the directory on the cli" -> gunicorn wsgi

# Requirements file for Heroku
    - pip freeze > requirements.txt

# Runtime file
    - For the python version configuration

# Procfile
    - Initialize wsgi file on web using heroku
    - Note that it does not have any extension

# Heruko deployment git commands
    - heroku login
    - cd my-project/
    - git init
    - heroku git:remote -a spitrack-py
    - git add .
    - git commit -am "make it better"
    - git push heroku master

# Install Django Heroku
    - pip install django-heroku
    - pip install dj-database-url

# Deployment Issues
    - heroku config:set DISABLE_COLLECTSTATIC=1
    - heroku logs --app <appname>

// Virtual Environment Commands ======================

# Creating a Virtual environment
    - virtualenv <nameofyourchoice>
    - activate virtual environment -> backenv\Scripts\activate
    - deactivate virtual environment -> backenv\Scripts\deactivate
    - Install node -> pip install nodeenv

# Python Virtual Environment
    - py -m venv <project-name>
    - activate virtual environment -> backenv\Scripts\activate
    - deactivate virtual environment -> backenv\Scripts\deactivate
    - Install all packages using requirements.txt file on another virtual environment -> pip install -r requirements.txt