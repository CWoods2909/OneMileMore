# One Mile More

One mile more is a loose clone of Meetup, a site for event posting. My idea for this site came about from being a road cyclist/mountain biker and having a hard time finding groups of people to ride with. This site will hopefully alleviate some of that by allowing users to navigate to the site, post cycling events and meet up with fellow enthusiasts.

# Features

- A user login, sign up, or log in as a demo user.
- Create, Read, Update, Delete
  - Events
  - Comments

# Upcoming features

- User profile, and view who's attending.

# Technologies Used

- React
- Redux
- Python
- PostgreSQL
- Flask SQLAlchemy

# Splash Page

- From the splash page a user can either log-in, sign-up, or choose demo. Only the splash page is accessable without being logged in.
  ![image](https://user-images.githubusercontent.com/83300311/163842855-87c9a1ec-0134-4869-907b-229f7894e60c.png)

# Home Page

- Upon log in the user is greeted with the homepage. Here you can view events already made, or create your own event.
  ![image](https://user-images.githubusercontent.com/83300311/163842965-05915f50-f638-45cd-9c12-cc7a31ede642.png)
  ![image](https://user-images.githubusercontent.com/83300311/163843002-417431aa-64bc-4a2e-8492-1658d78dc309.png)

# Event page

- Clicking on an event or creating an event will take the user to that event.
  ![image](https://user-images.githubusercontent.com/83300311/163843136-93a96d41-c4cc-4580-a9da-2f25c7ea71aa.png)

- From here the user can edit their event if they made the event, or, leave a comment.
  ![image](https://user-images.githubusercontent.com/83300311/163843198-9aab207b-3470-4b9f-9235-ea8c0fca8209.png)
  ![image](https://user-images.githubusercontent.com/83300311/163843245-83f3b658-bb7d-4f9d-b401-4d0b127e8c05.png)

* Users can also edit or delete comments if they are the user that made them.

![image](https://user-images.githubusercontent.com/83300311/160015097-ceb370bd-cf87-4b42-9389-bd358f092cbf.png)

## Getting started (If you want to clone down the repo yourself.)

1. Clone down this repo.

   - In terminal
   - git clone git@github.com:CWoods2909/OneMileMore.git

2. Install all dependencies

   - In terminal
   - pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

3. Create a .env file based on the .env.example file(Make sure to set the proper settings for the development enviroment)

4. Create a postgresql user with CREATEDB and PASSWORD (Make sure these match what's in the .env file.)

   - CREATE USER auth_app WITH CREATEDB PASSWORD 'password'

5. Get into your virtual enviroment, migrate, seed and then run the flask app.

   - In terminal

   - pipenv shell
   - flask db upgrade
   - flask db migrate
   - flask seed all
   - flask run

6. You can also run the flask app in development, look at the README on the root level of the react-app directory.

## Deploying to Heroku

1. Before deploying, run this command in your terminal just in case your production environment doesnt have all the up to date dependencies.

   - pipenv lock -r > requirements.txt

2. Go to Heroku in your browser and create a new project
3. Find the resources tab and browse to 'Find more add-ons' and click on 'Heroku Postgres'
4. Install the Heroku CLI (https://devcenter.heroku.com/articles/heroku-command-line)
5. Now run these commands in your terminal

   - heroku login
   - heroku container:login

6. Make sure to update the 'REACT_APP_BASE_URL' in the DockerFile.

   - It should now look like this "https://{Name-of-app}.herokuapp.com"

7. Now push the Docker container to heroku from the root of the project. Run these commands in your terminal.

   - heroku container:push web -a {NAME_OF_HEROKU_APP}
   - heroku container:release web -a {NAME_OF_HEROKU_APP}
   - heroku run -a {NAME_OF_HEROKU_APP} flask db migrate
   - heroku run -a {NAME_OF_HEROKU_APP} flask db upgrade

8. Under settings on Heroku find 'Config Vars' and add the secret .env variables.
