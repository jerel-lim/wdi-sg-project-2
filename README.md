[How to write readme - Markdown CheatSheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)  
[How to write a good readme for github repo!](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2)

# Roomours

This application is intended to simulate a booking application. In the context of this project, the application is intended to be used by businesses of unique hotels/resorts, to facilitate the reservations of their customers. This application currently only have functionalities of an MVP(minimal viable product).


## Getting Started

Clone the Repo
npm install the modules
Have fun exploring the application.

## How to use
### Summary
This application is catered towards 2 roles: Users and Admins. Admins will be reserved for the business owners, who get to determine the rooms that are available for public to book. For the purpose of this application, the admin key is 'admin', and will be customized for each business owner.

Users are members of the public who are traveling around the world and in search for a unique lodging experience.

The eventual goal of this app is to connect all the business owners to be on the platform, such that users can search among all the businesses and identify other unique spots in the world that they might like to visit/travel/lodge at in future.

### Functionalities

1) Admins are currently able to add rooms, update the availability of the rooms and delete room listings. In each listing, admins determine the number of beds, price per night, and duration of availability.

2) Users are currently able to book rooms that are created and made available by the admins. Upon reservation of the room, users are only able to cancel their reservation, but not update their reservation. Furthermore, users are able to search for all available rooms and their various prices, within a specific date range, upon specifying the number of beds they will require.

## Live Version

This app is deployed on [https://dry-everglades-61064.herokuapp.com/](https://dry-everglades-61064.herokuapp.com/)


## Built With
* Node-js
* Express, EJS
* CSS
* HTML
* mLab(mongoDB Hosting)
* Mongoose
* Bootstrap CSS Framework
* Heroku


## Development
### The Approach
This idea for the app came up as part of achieving an app built with the following features:
* Two Models: Rooms, and Users
* RESTful Routes for both Rooms and Users
* Partitioned Views and Access levels for Admins vs. Users
* Login and Authentication using Passport

### Initial planning
Use Cases
![Use Cases](https://github.com/jerel-lim/wdi-sg-project-2/blob/master/assets/Use%20Cases.jpg)

ERD
![ERD](https://github.com/jerel-lim/wdi-sg-project-2/blob/master/assets/ERD.pdf)

Routes Planning
![routes](https://github.com/jerel-lim/wdi-sg-project-2/blob/master/assets/Routes.PNG)

Wireframe
![wireframe](https://github.com/jerel-lim/wdi-sg-project-2/blob/master/assets/wireframe.pdf)


### Logic for the reservations made by users, and availability of rooms
![reservations](https://github.com/jerel-lim/wdi-sg-project-2/blob/master/assets/User%20Reservations.pdf)

### Public and restricted sites
The application checks for isAdmin status and logged in status, to restrict users from viewing certain pages. isAdmin is determined by a boolean value upon creation of user account, where an admin key(only provided to business owners) is used.
Login status is determined with the use of passport and sessions, and all sites that are not public will be directed to the public log in page.

## Authors

Jerel Lim - jerel-lim

## Acknowledgments
This application is built for programming practice purposes only. Room reservations logic was inspired by Lee Yi Sheng - yisheng90
