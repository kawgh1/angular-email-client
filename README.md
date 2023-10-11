# Email Client

- ### API Server

  - Root URL: `https://api.angular-email.com`

  |                |        |                                                                      |                                                       |
  | -------------- | ------ | -------------------------------------------------------------------- | ----------------------------------------------------- |
  | Path           | Method | Body                                                                 | Description                                           |
  | /auth/signup   | POST   | { username: String, password: String, passwordConfirmation: String } | Signs up for a new account with the provided username |
  | /auth/signin   | POST   | { username: String, password: String }                               | Signs in with the provided username                   |
  | /auth/username | POST   | { username: String }                                                 | checks to see if a username is already in use         |
  | /auth/signedin | GET    |                                                                      | Checks to see if the user is currently signed in      |
  | /auth/signout  | POST   | { }                                                                  | Signs the user out                                    |
