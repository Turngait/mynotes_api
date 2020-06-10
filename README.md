Routes:
  Authorization:

  ```
  post: /auth/signin - SignIn
  post: /auth/signup - SignUp
  get: /auth/user/:token - get user's info by token
  ```

  Wishlist:

  ```
  get:/wlist/:token - Get all wlist's items and groups for user
  
  post:/wlist/item/add - Add wlist's item
  put:/wlist/item/edit/:id - Edit wlist's item by it ID
  delete:/wlist/item/delete/:id/ - Delete w'list item by it ID

  get:/wlist/group/:token - Get all wlist's groups
  post:/wlist/group/add - Add wlist's group
  delete:/wlist/group/delete/:id/:token - Delete group
  ```

  Finance:

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
