# Generative

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 18.2.4.

## The Goal:

To explore development in Angular while using Typescript to create art.

## Structure

each image generation technique will encompass its own page and component within the application, and each of these individual modules will include:

### page features

1. a UX that allows the user to modify some parameters
2. a button that starts a small animation, which wobbles the parameters in a way that perhaps also has a magnitude control? essentially I just described LFO functionality
3. a canvas that adjusts in size with the browser
4. a pulldown on the page that provides a short explanation of the math behind each image and the parameters over which the client has control

### pieces Id like to include:

1. fractal tree
2. rose generator
3. cardioid

### Future Features

1. a color interface, that converts the color spectrum to some sort of different application

# Fractal Tree

the fractal tree imagery is classic, and a good example of a recursive drawing function.

### control UX

1. branch angle
2. skew angle

# Sinusoidal Rose

this is the image I am most excited about, and so far the most complicated

### control UX

1. a large and small adjustment for both the variables in the equation
2. a way to apply an animation to (in the perfect world) any given parameter
3. a way to initiate and modify the colors
