echo 'Initializing & installing submodules'
git submodule init
git submodule update
cd src/jouley
echo 'Installing Bower components'
bower i --verbose
echo 'Start build'
polymer build
cp build/bundled app/jouley
cp build/bundled/index.html app/index.html
cd ..
