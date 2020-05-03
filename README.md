# Distance-Matrix
The backend task is also a straightforward task, but our team has realized that we have missed a few crucial points out of the requirements from our standard test, so PLEASE PAY ATTENTION TO THE ADDITIONAL TASKS.
FinityOne has an application that needs to be able to make appropriate predictions for trips, and the first step in making predictions is to acquire data.

The same task remains with the ones listed on the site. Make a API node.js express server that does the following:
- GET request that returns 'Hello World'
- POST request that takes in a trip origin and a trip destination and returns the number of miles between the 2 locations

2 There are 2 files here. Contacts are all clients (fake) in the system. trip_data is the data about the trips that each contact (identified by the contact_id). Here are the tasks with these:
- In the same express server, add a GET request to return a list of people with the first name, last name, and email address of those contacts that have been on a trip with more than $25,000 expense amount. (assume files are MySQL database tables)
- In the same express server, add a GET request to return a list of distances between the origin and destinations within the trip_data using the API developed earlier. You do not need to store the values, just calculate them on the fly based on the longitude and latitude values.
- Write a Python script that takes both files and merges the data to produce a new CSV file with all trip data merged for each contact by the contact_id as the key for the merge.
