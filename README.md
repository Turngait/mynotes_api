# FinCloud API

This is API for FinCloud project.

## Start working on local machine

0. To develop this project you need to install several programs:
nodejs
git
docker
docker-compose

1. Clone this project.
```
git clone https://github.com/Turngait/mynotes_api.git
```

2. Go to develop branch
```
git checkout develop
```

3. You need to make "npm install" in folder of all services. 

4. You need to fill config files.
All services have config files in "/config" folder.
Delete "_example" substring from name of the config files and fill there filds.

5. Go to root folder of this project and make:
```
docker-compose build
docker-compose up
```

6. ....

# This documentation is not finished yet.

## Routes:
  ### Authorization:

  ```
  post: /auth/signin - SignIn
  post: /auth/signup - SignUp
  get: /auth/user/:token - get user's info by token
  post: /auth/user/setdata
  post: /auth/user/changepassword
  ```

  ### Finance:

  ```
  /fin/cost/get/:token/:period - Get all cost by period for user
  /fin/cost/get/:token - Get all costs for user
  /fin/cost/group/:token/:id_group/:period - Filter by group
  /fin/cost/add - Add cost 
  /fin/cost/edit/:id - Edit cost by ID
  /fin/cost/delete/:id/:token - Delete cost by ID

  /fin/group/add
  /fin/group/delete/:id/:token

  /fin/income/add - Add item
  /fin/income/get/:token/:period - Get all incomes for user by period
  /fin/income/delete/:token/:id - Delete one income
  ```