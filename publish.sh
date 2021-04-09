if [ -d "${HOME}/.nvm/" ]
then
  . ${HOME}/.nvm/nvm.sh
fi
nvm use v10.15.0

npm run build

git add -A
git commit -m "build"

npm version patch
git push

npm publish