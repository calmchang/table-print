
npm run build

git add -A
git commit -m "build"

npm version patch
git push

npm publish