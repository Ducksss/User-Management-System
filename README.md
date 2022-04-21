# User-Management-System
For ESDE and ESDE

# Installation:
To run this project, make sure to download and run the SQL, followed by cloning this repository. Be sure to input your information in a .ENV file as well as the database.

Create a .env file under the <code>backend</code> folder details as follows:<br>
See .env.example (Fill in your own KEYS & Credentials)

Create a .env file under the <code>frontend</code> folder details as follows:<br>
Add REACT_APP_STRIPE_PUBLISHABLE_KEY=<Your Stripe publishable key>
  
Restore the database using "data_dump.sql" file provided in this repo to complete the database setup.

### Stripe Introduction & Installation guide:
Refer to "Stripe Subscription.docx" (Find under MS TEAM > General > Class Materials > PET Projects)
<br><br>
### Starting the Servers :

1. To start backend server:
```   
$ cd backend
$ npm i
$ npm run start
```
2. to start frontend server:
```
$ cd frontend
$ npm i
$ npm run start
```
