# PARTH-DHAMIJA-IS24-full-stack-competition-req97073
This is the Web Application for Managing Products being developed by the IMB submitted for the competition for IS-24 Full Stack Developer Position. This is a basic CRUD application that allows users to create, read, update, and delete records from data being stored locally on the computer.


## Installation instructions
To install the application, follow these steps:

Clone the repository to your local machine. {Please note that the node_modules have been installed already on the client and api side for the project}

To start the application, Navigate to the 'docker' directory of the project in your terminal.

Run 'docker-compose up -d' to start the application.

Run 'docker-compose down' to end the application.

## Usage

![Screenshot 2023-03-31 103826](https://user-images.githubusercontent.com/68792513/229194517-7a21a71f-3d3b-4cfa-b749-ed54b395b7f1.png)

![Screenshot 2023-03-31 105743](https://user-images.githubusercontent.com/68792513/229195551-aaafc511-83ed-44fe-a910-7279034b2809.png)

![Screenshot 2023-03-31 105759](https://user-images.githubusercontent.com/68792513/229195570-1bccb682-b1e9-4a48-acab-4b5725b433a8.png)

![Screenshot 2023-03-31 105939](https://user-images.githubusercontent.com/68792513/229195614-8c256c93-03d0-4c69-925d-25158f46130c.png)

The application runs the front-end using React and Node.js. Front end is running on the port 8080.
There are following features available in the application - 

1. Home Page - Displays all the records available in the data source.
    - Two search filters to search for records based on the "Developer" or "SCRUM Master" fields.
    - A label that displays the number of records that match the search criteria.
    - A table of records with a fixed header for easy scrolling.
    - An EDIT and DELETE button for each row to edit or delete records.

2. Add Product Page - This page allows users to add a new product to the data source.
    - A form for users to enter the details of the new product.
    - Basic form validation to ensure that all required fields are completed.
    - A prompt to confirm if the user wants to save the new product before leaving the page.

3. Edit Page - Displays the details of a selected record from the Home Page and allows users to make changes.
    - A form pre-populated with the details of the selected record.
    - Basic form validation to ensure that all required fields are completed.
    - A prompt to confirm if the user wants to save the changes before leaving the page.

The backend of the application runs on the port 3000, and the Swagger Documentation is available at http://localhost:3000/api/api-docs/

![Screenshot 2023-03-31 104856](https://user-images.githubusercontent.com/68792513/229194555-406377c8-aebb-4be6-8584-5246f151b6bc.png)

## Contact
If you have any questions or concerns about this project, please contact me using the email address - parthdhamija101998@gmail.com or Phone - +1(604)-367-6076
