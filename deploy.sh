#!/bin/sh
npm run build
rm -rf ../travel-tracker-backend/build/
cp -r build ../travel-tracker-backend/
