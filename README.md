# Moto Maintenance - 2 Week Sprint

## Description

Moto Maintenance is an application designed to make vehicle maintenance easier and stress free. Easily keep track of maintenance history, current maintenance levels, and trip history.

## Screenshots

![1](https://user-images.githubusercontent.com/67863663/105553148-889be780-5cca-11eb-99ff-b734aa22a527.png)
![2](https://user-images.githubusercontent.com/67863663/105553146-889be780-5cca-11eb-8e61-93c58d74f8f5.png)

# Set up

## Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

## Create database

Create a new database called `moto_maintenance` and run the queries in `database.sql`.

## Development Setup Instructions

- Run `npm install`
- Create a `.env` file at the root of the project and paste this line into the file:
  ```
  SERVER_SESSION_SECRET=superDuperSecret
  ```
  While you're in your new `.env` file, take the time to replace `superDuperSecret` with some long random string like `25POUbVtx6RKVNWszd9ERB9Bb6` to keep your application secure. Here's a site that can help you: [https://passwordsgenerator.net/](https://passwordsgenerator.net/). If you don't do this step, create a secret with less than eight characters, or leave it as `superDuperSecret`, you will get a warning.
- Start postgres if not running already by using `brew services start postgresql`
- Run `npm run server`
- Run `npm run client`
- Navigate to `localhost:3000`

# Usage

1. Login/Register to gain access to the app.
2. Once logged in `Add a Vehicle`, fill out the form and `Add to Garage`.
3. When you take a trip with the vehicle you can log it by selecting the vehicle in `My Garage`, then selecting `Add a Trip`. Here fill out the form, selecting `Get Current Location` will grab the current devices coordinates for starting/ending locations. On `Add Trip` the app will calculate the distance in miles and maintenance values will be adjusted.
4. When a service is needed select the vehicle from `My Garage`, then select `Service (vehicle name)`. Here you can select `Change Oil` or `Change Tires`. Fill out the form, select `Change Oil/Tires`, and your vehicle is now serviced.

# Built with

- JavaScript
- React
- Redux
- Redux-Saga
- Material-UI
- SweetAlert
- Luxon
- Google's Distance Matrix
- Geolocation
- AWS S3
- Node
- Express
- PostgreSQL
- Axios

# Acknowledgement

Thanks to [Prime Digital Academy](https://primeacademy.io/) in Kansas City! Prime gave me the tools, knowledge and support to complete this application.
