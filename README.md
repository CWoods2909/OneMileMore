# One Mile More (Flask/React project)

## Getting started

1. Clone down this repo.
   *  In terminal
   *  git clone git@github.com:CWoods2909/OneMileMore.git

2. Install all dependencies
   *  In terminal
   *  pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

3. Create a .env file based on the .env.example file(Make sure to set the proper settings for the development enviroment)

4. Create a postgresql user with CREATEDB and PASSWORD (Make sure these match what's in the .env file.)
   * CREATE USER auth_app WITH CREATEDB PASSWORD 'password'

5. Get into your virtual enviroment, migrate, seed and then run the flask app.
   * In terminal

   * pipenv shell
   * flask db upgrade
   * flask db migrate
   * flask seed all
   * flask run

6. You can also run the flask app in development, look at the README on the root level of the react-app directory.


## Deploying to Heroku

1. Before deploying, run this command in your terminal just in case your production environment doesnt have all the up to date dependencies.
   *  pipenv lock -r > requirements.txt

2. Go to Heroku in your browser and create a new project
3. Find the resources tab and browse to 'Find more add-ons' and click on 'Heroku Postgres'
4. Install the Heroku CLI (https://devcenter.heroku.com/articles/heroku-command-line)
5. Now run these commands in your terminal
   * heroku login
   * heroku container:login

6. Make sure to update the 'REACT_APP_BASE_URL' in the DockerFile.
   * It should now look like this "https://{Name-of-app}.herokuapp.com"

7. Now push the Docker container to heroku from the root of the project.  Run these commands in your terminal.
   * heroku container:push web -a {NAME_OF_HEROKU_APP}
   * heroku container:release web -a {NAME_OF_HEROKU_APP}
   * heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade
   * heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade

8. Under settings on Heroku find 'Config Vars' and add the secret .env variables.
