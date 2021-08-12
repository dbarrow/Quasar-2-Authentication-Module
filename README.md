### This repository is in active initial development. Breaking changes WILL occur. Stay tuned for stable version.

# Quasar 2 Authentication Module
Quasar 2 based authentication module that handles login, logout, routing and auth middleware.

This repository provides an opinionated implematation of authenitication for Quasar/Vue3 applications. The module was created with a Laravel 8 REST API powered by Sanctum Token based Authentication. The module should be adapatable to other backends. It is at the descretion of the user to modify the module to interact with other backends.


## Motivation
The module was created to have reusable authentication for Quasar/Vue 3 frontend apps & Laravel backend API's with minimal wiring.

## Installation
* Create Quasar 2 app with quasar-cli. See https://quasar.dev/quasar-cli/installation
* Create directory in src folder named modules
* cd to modules and run command:

   ```git clone https://github.com/dbarrow/Quasar-2-Authentication-Module.git auth```

File structure example post installation

![post_install_results](https://user-images.githubusercontent.com/1625395/129212395-0d2ba8b8-1b3a-41b5-b90b-bcc2ec9b1fd8.PNG)


## Configuration
Configuration is contained in the auth.config.js file


