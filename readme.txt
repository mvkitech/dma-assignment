The code in this project was built with Node JS using VS-Code. The code is
NOT connected to a database, and instead stores all of the data during a 
given HttpSession in memory. As long as you have Node JS installed (it was 
built using version 12.5.0) all you need to down is install it into a folder 
of your own choosing and then type in a terminal window: 

		npm install

and the node package manager will download all the project dependencies into 
the "node_modules" modules sub-folder.

Please note that presently there is no User Interface created for the project. 
At this time it is strictly a server side RESTful API service. I would like to 
changing this in the not too distant future. But to release the server code as
soon as possible, I needed to concentrate first on the back end and you will 
only be able to test it with the unit tests supplied in the "tests" folder of 
the project or if you wish, it can also be tested with Postman.

To run the server in release mode, type:

		npm run start

To run the server in development mode, type:

		npm run dev

To run the unit tests, type:

		npm run test
