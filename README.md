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

- ### HttpClient

  - When making API requests with `HttpClient`, Angular automatically forgets and discards any `cookies` associated with that request
  - This means by default Angular does NOT remember session cookies, that has to be handled explicitly
  - Example, you authenticate (sign in) to a server, the server sends back a response with a cookie, Angular immediately discards that cookie and if you navigate away from your site and come back or you refresh the page, your cookie is lost and the user has to authenticate again - this is not a good UX

    - `{ withCredentials: true }` needs to be passed in the `options` parameter of HttpClient requests for Angular to remember session cookies

          `
            signup(credentials: SignupCredentials) {
              return this.httpClient
                .post<SignupResponse>(${this.rootUrl}/auth/signup, credentials, {withCredentials: true})
                .pipe(
                  // if an error is returned from the request, the tap() method is automatically skipped
                  tap(() => {
                    this.signedIn$.next(true);
                  })
                );}

            checkAuth() {
              return this.httpClient.get(${this.rootUrl}/auth/signedin, {withCredentials: true}).pipe(
                tap((response) => {
                console.log(response);
              })
          );

      }
      `
