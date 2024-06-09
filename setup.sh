#!/bin/bash

# Exit script on any error
set -e

# Update the package list
sudo apt-get update

# Install Node.js and npm
sudo apt-get install -y nodejs npm git

# Clone the repository
git clone https://github.com/susanhsrestha/test-website.git

# Navigate to the backend folder, install dependencies, and start the backend server
cd test-website/backend/
npm install
nohup npm start &

# Navigate to the frontend folder, install dependencies, and start the frontend server
cd ../frontend/
npm install
nohup npm start &

echo "Backend and frontend servers are running"
