# ugmk_test_app

## Commands
1. Install dependencies:

    ```sh
    npm i
    ```

2. Run type checkng:

    ```sh
    npm run type
    ```
   
3. Run mock-server at [localhost:3001](http://localhost:3001/):

    ```sh
    npm run start-server
    ```

4. Run project:

    ```sh
    npm start
    ```
   
5. Build docker image:

    ```sh
    npm run dockerize
    ```

6. Start project in docker container proxied by nginx at [localhost:3000](http://localhost:3000/):

    ```sh
    npm run start-contaner
    ```

7. Run ci-check before project build in production

    ```sh
    npm run ci-check
    ```

### TODO:
1. Add and configure `eslint` + `prettier`
2. Add `husky` and `precommit` hook
3. Move `API_BASE_URL` to `.env`
4. Move `ui` to separate workspace
