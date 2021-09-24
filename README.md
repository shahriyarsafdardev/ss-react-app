# ScholarSite React Application

This project was created to house ScholarSite's Student Portal. We’re receiving more and more validation everyday that we’re building something very special at ScholarSite and are really excited for this next step in the journey.

## Product Description

ScholarSite hosts live sessions with some of the world's leading experts. During these sessions, teachers engage with students and help them accelerate their career growth. Often these same students want to revisit materials they have covered in the live sessions, and to do so, they come to the Student Portal.

## Designs

The initial designs for the Student Portal are shown [here](https://www.figma.com/file/bcAdfEQCTLfnF8HCHdy6Iq/Student-Prototype?node-id=0%3A1).

A prototype is shown [here](https://www.figma.com/proto/bcAdfEQCTLfnF8HCHdy6Iq/Student-Prototype?node-id=7%3A3758&scaling=scale-down&page-id=0%3A1&starting-point-node-id=30%3A9406).

As you can see, we are using a set of MaterialUI components which are already integrated within this directory. This should allow us to focus on code quality and testing rather than spending time on styling details.

## Development

We would like to build this project using test driven development. Thic process will rely on both:

- Integration testing using enzyme
- Unit testing using jest
- Continuous integration using CircleCi

These tests will rely on a set of fixtured included within the `./fixtures/` directory.

## API

### Login

URL: https://scholarsite-staging.herokuapp.com/api/v1/users/sign_in

Params: { email: string, password: string }

Successful response fixture: fixtures/successful_authentication.json

Failed response fixture: fixtures/failed_authentication.json

### Fetch User

URL: https://scholarsite-staging.herokuapp.com/api/v1/users/fetch_user

Params: {}

Successful response fixture: fixtures/successful_user_fetch.json

Failed response fixture: fixtures/failed_user_fetch.json

### Cohort List

URL: https://scholarsite-staging.herokuapp.com/api/v1/users/user_uuid/cohorts

Params: {}

Fixture: fixtures/cohorts_fixture.json

### Cohort Details

URL: https://scholarsite-staging.herokuapp.com/api/v1/users/user_uuid/cohorts/cohort_uuid

Params: {}

Fixture: fixtures/cohort_fixture.json

### Peers details for a Cohort

URL: https://scholarsite-staging.herokuapp.com/api/v1/users/user_uuid/cohorts/cohort_uuid/peers

Params: { cohort_id: uuid }

Fixture: fixtures/cohort_peers_fixture.json

### Cohort Session Details

URL: https://scholarsite-staging.herokuapp.com/api/v1/users/user_uuid/cohorts/cohort_uuid/sessions

Params: { cohort_id: uuid }

Fixture: fixtures/cohort_sessions_fixture.json

### Cohort Home Details

URL: https://scholarsite-staging.herokuapp.com/api/v1/users/user_uuid/cohorts/cohort_uuid/home

Params: { cohort_id: uuid, participant_id: uuid }

Fixture: fixtures/cohort_home_fixture.json

### Cohort Registration, on each step completion

URL: https://scholarsite-staging.herokuapp.com/api/v1/users/user_uuid/cohorts/cohort_uuid/registration/step_completed

Params: { cohort_id: uuid, step_number: number }

Fixture: N/A

### Saving a User profile details for a cohort

URL: https://scholarsite-staging.herokuapp.com/api/v1/users/user_uuid/cohorts/cohort_uuid/registration/save_user_profile

Params: {
cohort_id: uuid,
first_name: string,
last_name: string,
email: string,
current_company: string,
interests: string[],
strengths: string[]
}

Fixture: N/A

## Tooling

### Install

```
yarn install
```

### Start

```sh
yarn start
```

### Build

```sh
yarn build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
