# Project-2
https://kantata1.herokuapp.com/home

Xander - Front end - Island Time 6AM GitHub: aaronjled
Elijah - Back end - Mountain Time 10AM
Steven - Back end - Eastern time 12pm GitHub: stevencueto
Aaron - Front end - Pacific Time 9am Github: ahfullstack

Name: Kantata
Mission Statement/Brand Statement: A fun and free app for EVERYONE to share and listen to music. Collab with others, or work alone, Kantata has the right tempo for everyone!

Music App:
Music upload, Instrument Trade/Sell, and Music Collab site

Project plan and projected deadlines
- Monday - Framework and MVP 50%
- Tuesday - MVP completion
- Wednesday - Stretch Goals and Features plans
- Thursday - Features and Stretch Goals 50%
- Friday - All Features and Strech Goals complete
- Saturday/Sunday - further strech or features if needed

Features to add:
Profile Photos
Admin and User accounts
Like button
Share Button
Google Login
Forum posts

Models:
Users username, password, email, dipslayname?, profilephoto.
Instruments: Name, Type, Price
Hobbies: List
Music: mp3?, likes, comments, share,
comments text, user, musicor isntruments , number  

## 
API's:
https://stackoverflow.com/questions/64693817/is-there-is-any-way-to-check-that-a-song-is-copyrighted-in-yt-music-by-someone-u
https://developers.google.com/youtube/v3

                                Hi 👋, We are Kantata

                                
Kantata is an app for EVERYONE to buy and sell instruments anywhere in the world. Kantata has the right tempo for everyone! We approached this app with the intention of creating something that has not been accomplished. While developing the idea we realized our goal was going to take more time than allotted for this assignment. We ran into challenges creating our roadmap in a short one-week period. Upon our decision to move forward with an application we can be proud of and accomplish the mvp goals of the assignment we focused on building out one main feature of our application and plan to continue working on our bigger goals for Kantata in the the future. With Kantata you can bull and sell instruments from an awesome community of artists and musicians around the world. Our future goals are to integrate a music sharing service and create an environment to promote a virtual jam session platform where you can meet with like minded individuals to create and share music.

- Visit our application [Kantata](https://kantata1.herokuapp.com/home)

- 📫 How to reach us **Kantata.app@gmail.com**

- Instructions: Try our app by clicking the link above ^ **Welcome to Kantata. Click SIGN UP and create your account - Once you are signed up you can explore instruments for sale, post instruments to sell and edit your profile.**

- Kantata Team **Team of contributors: Steven Cueto De Aza | John Elijah Hurn | Aaron Hubbard | Aaron Ledbetter**

Connect with me:

Languages and Tools:
 <a href="https://www.w3schools.com/css/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original-wordmark.svg" alt="css3" width="40" height="40"/> </a> <a href="https://expressjs.com" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/express/express-original-wordmark.svg" alt="express" width="40" height="40"/> </a> <a href="https://www.figma.com/" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/figma/figma-icon.svg" alt="figma" width="40" height="40"/> </a> <a href="https://www.w3.org/html/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original-wordmark.svg" alt="html5" width="40" height="40"/> </a> <a href="https://www.adobe.com/in/products/illustrator.html" target="_blank" rel="noreferrer"> <img src="https://www.vectorlogo.zone/logos/adobe_illustrator/adobe_illustrator-icon.svg" alt="illustrator" width="40" height="40"/> </a> <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="javascript" width="40" height="40"/> </a> <a href="https://www.mongodb.com/" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/mongodb/mongodb-original-wordmark.svg" alt="mongodb" width="40" height="40"/> </a> <a href="https://nodejs.org" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original-wordmark.svg" alt="nodejs" width="40" height="40"/> </a> <a href="https://www.photoshop.com/en" target="_blank" rel="noreferrer"> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/photoshop/photoshop-line.svg" alt="photoshop" width="40" height="40"/> </a> </p>

Mongoose is our DBs, Sessions to store the user’s information, Store to keep the cookies, Flash to display messages.


We used Passport for user authentification, specifically the Local Strategy, we had plans to use more strategies like Google or Facebook, passport stores the user into session, the way it works is taking the users input, comparing the credentials, verifying the credentials, and goes into serializing the user storing it into a cookie.

According to the FilePond Documentation: “FilePond is a JavaScript library that brings silky smooth drag n' drop file uploading. These docs they will help install, setup, modify and extend FilePond.” The way we used it is to upload the files with previews, and then it would create the path so we can use it throughout the app. We take the image and then verify the type, then check if we take that image file we’re going to pass it to a function and parse the data, and then we take it to our model and store it.

Notes:
We accomplished most of our goals that we started with, but unfortunately had to sideline the music-sharing and music-collaboration sections of the app until after project due date. This was to ensure we had a functioning app Monday for the presentation. 

We would also like to add a profile-picture feature so users can personailze their profile pages in the future.

Google login was and is a feature we hope to add as well

The obvious next step for the app would be implementing a function to actually buy/sell the instruments listed on the site. As of now it is effectivly a newspaper for users to see listings and directly contact the user selling to inquire about actually purchasing.