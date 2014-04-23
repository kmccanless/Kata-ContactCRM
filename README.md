Kata-ContactCRM
===============

REST service for managing contacts.  Written for kata.

GET /contacts
GET /contact/email/:email
POST /contact/contact/add  (assumes JSON body)
POST /contact/remove/email/:email
POST /contact/update/email/:email (assumes JSON body)


usage:  node server
runs on port 8080