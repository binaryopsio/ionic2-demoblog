# BinaryOps Demo

This is an ionic 2 application that shows a simple implementation of the demo API of binaryOps.
Ionic 2 is still in beta, so things could change. We will attempt to keep everything up to date.

The app uses the angular2-binaryops package installed through npm [https://www.npmjs.com/package/angular2-binaryops](https://www.npmjs.com/package/angular2-binaryops)
When you create your own application based on a [BinaryOps.io](https://binaryops.io) API, you can of course start from this project and modify it as needed. Or you can start from scratch with a new ionic 2 project, in which case you'll need to add the reference to angular2-binaryops to your package.json file.

## About the application.
The application is a very plain and simple app that shows a few blogs with a few posts each. you get to add, edit and delete comments from the posts, which make actual requests on the API. You'll need to go to the login page first, the supplied defaults work. ( We clean things up periodically to remove any unwanted content, as per our own discretion.)

We provide this application to show a simple implementation, as a reference for developers. We will be expanding it over time to show implementations of all the features of [BinaryOps.io](https://binaryops.io)


## About the API
We created the API on the binaryOps.io platform just as a little demonstration. We have made the documentation publicly available using this link [https://dashboard.binaryops.io/apidocviewer.html?apicode=bdco43](https://dashboard.binaryops.io/apidocviewer.html?apicode=bdco43) You'll need to enter this tenant code to access the live documentation: `0hjh12`.

All of the responses on the 'Try it out' buttons will return a 401 until you login. (The anonymous user has not been granted any privs). login with demo/horses123 to see real requests and responses.

### The client
Please refer to [https://github.com/binaryopsio/BinaryOpsDemoAPI](https://github.com/binaryopsio/BinaryOpsDemoAPI) to see how you can use the CLI to create an API like this for yourself, on your local machine, and then upload it to the BinaryOps.io service.
