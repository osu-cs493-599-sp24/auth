# Book-A-Place server with Authentication

Note that before you run this server, you'll need to specify your MongoDB database location and credentials as environment variables.  For example if you're using a bash shell, you'd do something like this (other shells, e.g. csh, Windows Power Shell, etc., would require you to do something different than `export`):
```
export MONGO_HOST=localhost
export MONGO_DB=bookaplace
export MONGO_AUTH_DB=bookaplace  # don't need to do this if the same as MONGO_DB
export MONGO_USER=bookaplace
export MONGO_PASSWORD=hunter2
npm start
```
