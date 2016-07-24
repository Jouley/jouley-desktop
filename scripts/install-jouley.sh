echo 'Installing app package dependencies'
install-app-deps
echo 'Initializing & installing submodules'
git submodule init
git submodule update
echo 'Navigating to Jouley'
cd src/jouley
echo 'Installing Bower components'
bower i --silent
echo 'Navigating back'
cd ..
echo 'Done!'
