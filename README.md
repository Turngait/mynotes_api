Routes:
  Authorization:

  ```
  /auth/signin - SignIn

  /auth/signup - SignUp
  ```

  Wishlist:

  ```
  get:/wlist/item/:token - Get all wlist's items for user
  post:/wlist/item/add - Add wlist's item
  put:/wlist/item/edit/:id - Edit wlist's item by it ID
  delete:/wlist/item/delete/:id/ - Delete w'list item by it ID

  get:/wlist/group/:token - Get all wlist's groups
  post:/wlist/group/add - Add wlist's group
  delete:/wlist/group/:id/:token - Delete group
  ```

  Finance:

  ```
  /fin/cost/:token/:period - Get all cost by period for user
  /fin/cost/:token - Get all costs for user
  /fin/cost/add - Add cost 
  /fin/cost/edit/:id - Edit cost by ID
  /fin/cost/delete/:id/:token - Delete cost by ID

  /fin/group/
  ```
