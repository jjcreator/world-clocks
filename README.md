# World clocks

An app which lets you check the time in any timezone in the world and display up to 6 clocks from different timezones. My first attempt at creating a complete project using the React library. The app fetches data from a free API and displays working analog clocks.

[![world clocks](/clocks.png)](https://jjcreator.github.io/clocks/)


## Technologies

* HTML
* CSS
* React (hooks)
* create-react-app
* npm

## About

My first real project using React. A simple app that fetches data from an API (http://worldtimeapi.org/) and allows the user to visualize it in the form of working clocks, that show the current time in the chosen timezone. Up to 6 clocks can be displayed at the same time. Basic design. Limited responsiveness.

#### Main features
* data fetching from an API endpoint (requests data once for all the timezones)
* a select menu list with the tinames of the fetched timezone data entries
* working analog (digital on a smaller screen size) clocks that display the corrent time for the selected timezone
* up to 6 clocks at the same time


## Launch

Create with the help of create-react-app and deployed on Github Pages.

## Sources

Clocks inspired by one of the projects in the "Javascript30" course by Wes Bos (https://javascript30.com/). Timezone data by http://worldtimeapi.org/. Created using create-react-app (https://github.com/facebook/create-react-app);
