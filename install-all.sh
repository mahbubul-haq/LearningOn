#!/bin/bash
cd Backend
rm -rf node_modules
npm ci

cd ../Frontend
rm -rf node_modules
npm ci

