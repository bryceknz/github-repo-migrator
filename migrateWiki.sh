#!/bin/zsh

OLD_ORG=""    # Replace as required
NEW_ORG=""    # Replace as required
REPO=""       # Replace as required

echo "Clone wiki..."
git clone https://github.com/${OLD_ORG}/${REPO}.wiki
cd ${REPO}.wiki
echo "Removing existing git config..."
rm -rf .git
echo "Initialising git..."
git init
echo "Adding all files..."
git add .
echo "Making first commit..."
git commit -m "First commit"
echo "Setting git remote..."
git remote add origin https://github.com/${NEW_ORG}/${REPO}.wiki
echo "Pulling existing codebase"
git pull origin master


echo "Pushing to git..."
git push -u origin master
