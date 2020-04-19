# tinu.be - client
[![Codeship Status for tinu-be/tinube-client](https://app.codeship.com/projects/df2db070-2538-0138-5362-0a65957949be/status?branch=master)](https://app.codeship.com/projects/383387)

This is a personal project based ReactJS to url shortener named [tinu.be](https://tinu.be)

## Requirements
- Node ~10.16.
- Yarn or npm ~6.11

## Setup
By the first rename the file `.env-sample` to `.env` and fill with all necessary info:

```
# API host
REACT_APP_API_URL=http://localhost:5000/
REACT_APP_GOOGLE_ANALYTICS=UA-XXXXXXXX-X
```

_Get url from [tinube-api](https://github.com/tinu-be/tinube-api) repo_

## Build
We are using Yarn to install dependencies and build, so open the terminal and run:
```
$ yarn install
```
then to run dev env 
```
$ yarn start
```