## EXERCISE 0
#### Who is the character of id 5 in the Rick and Morty API?
"name": "Jerry Smith"

#### How I did?
I Created a GET request on insomnia with this link: https://rickandmortyapi.com/api/character/5. 

----------------------------------

Download and extract the ***epfbook.zip*** file into a known directory in the device. 

Open the epfbook directory and then run the command prompt within this directory.

Use **npm install** to install appropriate packages which are indexed in the ***package.json*** file. 

Once the isntallation is complete, run the local server using the ***npm run dev***. This should run the application in the ***port 3000***

When the server is ready, login to the application using: **http://localhost:3000/**

Once opened the browser will request the ***Username*** and ***Password***. Enter ***admin*** for both these fields and you are in the home page of the application.

Use the links to navigate to the appropriate pages. Each page consist a home link to come back to the home page, except the http://localhost:3000/students page. I have added a nice background and a boarder to the ***http://localhost:3000/students*** page. You can enter the create student page throught the students page by the link provided below the student names.

***http://localhost:3000/students/1*** Use this link to access the details of the student in the 2nd position of the csv file. I have a small issue in the updating part, I was not able to get it to work, I tried several methods but unfortunately was not able to get through it. I humbly request you to have a look at the code of app.js, csvModule.js and student_details.ejs file to see what I have tried.

Also I have seperated all the CSV related coding in one module as requested on the TP.

In the hashPassword.js, I have removed the first line: ***#!/usr/bin/env*** node as I was running the application on windows.
