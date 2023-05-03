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
   
3. Run mock-server:

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

6. Start project in docker container proxied by nginx:

    ```sh
    npm run start-contaner
    ```

7. Run ci-check before project build in production

    ```sh
    npm run ci-check
    ```

### TODO:
1. Add and configure `eslint` + `prettier`
2. Move `API_BASE_URL` to `.env`
3. Move `ui` to separate workspace
