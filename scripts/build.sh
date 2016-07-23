cd src/jouley
echo 'Installing Bower components'
bower i
echo 'Start build'
polymer build
cp build/bundled app/jouley
cp build/bundled/index.html app/index.html
cd ..
