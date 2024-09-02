const express = require('express');

const locationController = require('../Controller/location.js');
const restaurantController = require('../Controller/restaurant.js');
const mealtypeController = require('../Controller/mealtype.js');
const userController = require('../Controller/user.js');
const menuController = require('../Controller/menu.js')


const route = express.Router();

//App page GET and POST API's
route.get('/location', locationController.getLocation);
route.get('/restaurant', restaurantController.getRestaurant);
route.get('/mealtype', mealtypeController.getMealtype);
route.post('/signup', userController.postSignUp);
route.post('/login', userController.postlogin);
route.get('/restaurants/:id', restaurantController.getRestaurantById);
route.get('/rest/:locId', restaurantController.getRestaurantByLocationId);
route.get('/menu/:resId', menuController.getMenuByRestaurantId);

route.get('/meal/:mealId', mealtypeController.getMealtypeById); // Filter - Get Mealtype by Id API

//Filter

route.post('/filter', restaurantController.filteredRestaurant);

module.exports = route;