# Contacts-Maps

## Description

This app is a simple web app which let's the user manage contacts and get an overview of the current state of Covid
worldwide as well as past 2 years of data.

## Development

To run the app in development, follow the following steps:

1. Install the required dependencies: `pnpm install`. If you don't have pnpm, you can install it with `npm i -g pnpm`.
   You can however use `npm` if you prefer.
2. Run the app: `pnpm dev`.
3. Open the app in your browser at `http://localhost:3333`.

## Build

To build the app, follow the following steps:

1. Install the required dependencies: `pnpm install`. If you don't have pnpm, you can install it with `npm i -g pnpm`.
   You can however use `npm` if you prefer.
2. Build the app: `pnpm build`.
3. Run the production: `pnpm preview`.
4. Open the app in your browser at `http://localhost:4444`.

## API Endpoint

The endpoints used in this project was provided by `https://disease.sh/`. Huge thanks to them.

- `GET /v3/covid-19/all`: Get the current state of Covid worldwide.
- `GET /v3/covid-19/countries`: Get country-wise data of Covid.
- `GET /v3/covid-19/historical/all?lastdays=all`: Get historical data of Covid worldwide for the past 2 years.

API is open to public, hence no authorisation/token was required.

## Live Demo

You can check the live demo of the app at `https://contacts-maps.vercel.app/`.
