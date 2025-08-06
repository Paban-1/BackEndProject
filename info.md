# ✨What is CookieParser ?

\_\_

# ✨What is cors ?

help to get setting for cross origin resorche shareing proccess

# ✨What is cors do ?

cors do if req come form any other frontend then do not listion only listion what we given frontend that's how not every one can listion or talk with our backend.(so we set a origin in a formate of CROS_ORIGIN in .env)

# ✨What app.use(express.json({ limit: "16kb" })); do ?

we make a config for handle a json data and limit it in 16kb just make sure our app dosen't crash. useing express.

# ✨What app.use(express.urlencoded({ extended: true, limit: "16kb" })); Do ?

Again we make a config that will get data that come form URL also we set a limit of 16kb. all are this are express confige

# ✨What app.use(express.static("public")); Do ?

We use it for store temporary files like pdf img or any this kind of think in our public file.

# ✨What app.use(cookieParser()) Do ?

This do we give some cookie to the user browser and some time get some secure cookies form user browser, for this perpases we use this config.

# ✨What is middleware ?

If we go to /insta or /login the res will check that dose our server can handle to many res or not.This is called middleware, this help to check in all the req in medule. Like(Check if user is logged in) - we can use multiple wares LIKE (Check is user is admin).

# ✨How to use middleware ?

We have 4 paramiters LIKE(err, res, req, next) This next is the middleware

# ✨We can make Utilitis for the DB and make a wraper ...(1/2)

### ✨This One is Try catch method

const asyncHandaler = (fn) => async (req, res, next, err) => {
try {
await fn(req, res, next);
} catch (err) {
(res.status(err.code || 500),
json({
success: false,
message: err.message,
}));
}
}

# ✨We can make Utilitis for the DB and make a wraper ...(2/2)

### ✨This One is Promises method

const asyncHandaler = (requestHandler) => {
(res, req, next) => {
Promise.resolve(requestHandler(res, req, next)).catch((err) => next(err));
};
};

# ✨When use app.use ?

When we used middleware (next), then we use app.use, and the app is a express powered.
