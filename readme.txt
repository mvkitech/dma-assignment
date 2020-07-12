The code in this project was built with NodeJS using VS-Code. The code is
NOT connected to a database, and instead stores all of the data during a 
given HttpSession that it handles in memory. As long as you have NodeJS 
installed (it was built using version 12.5.0) all you need to down is install 
it into a folder of your own choosing and type: 

	"npm install"

Then the node package manager will download all the project dependencies into
the "node_modules" modules sub-folder.

Please note that presently there is no user interface created for the project. 
At this time it is strictly a server side RESTful API component. I do plan on 
changing this in the not too distant future. But to release the server code as
soon as possible, I needed to concentrate first on the back end and you will 
only be able to test it with the included unit tests or test in Postman. 

Finally, I did come across a glitch with my Bank Controller unit testing for 
the five test cases outlined in the assignment. The program works as observed
in Postman and it even works in the unit test cases except for one small hiccup.
I am using "Jest" and "supertest" to conduct my unit testing where I can actually
invoke the various routes to add and retrieve data from the Banking Controller.
But when I attempt to access the "response.body" I get a "Object.<anonymous>" 
condition and trying to access properties in the body only result in undefined
errors. I tried "JSON.parse()" as well as "JSON.stringify()", but those attempts
only resulted in more errors. At the very end of each of the five Controller tests
I put a "console.log(response.body)" call to show APIs are returning the desired
results. But I also commented them out. So you will need to uncomment these log
statements to verify the results. Hopefully I can figure this out soon. 



