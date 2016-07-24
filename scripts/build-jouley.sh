echo 'Navigating to Jouley'
cd src/jouley
echo 'Building Jouley'
polymer build
echo 'Copying build to app'
cp -f build/bundled/index.html ../../app/index.html
cp -f build/bundled/service-worker.js ../../app/service-worker.js
mkdir ../../app/jouley
cp -Rf build/bundled/* ../../app/jouley
echo 'Making changes'
sed -i 's/\/bower_components/jouley\/bower_components/g' ../../app/index.html
# sed -i 's/\/service-worker/service-worker/g' ../../app/index.html
sed -i 's/href="\/src\/jouley-app.html"/href="jouley\/src\/jouley-app.html"/g' ../../app/index.html
sed -i "s/<\/html>/\ \<script>require('.\/scripts\/renderer.js');<\/script>&/g" ../../app/index.html
echo 'Removing unnecessary files'
rm ../../app/jouley/bower.json
rm ../../app/jouley/polymer.json
rm ../../app/jouley/README.md
rm ../../app/jouley/index.html
echo 'Navigating back'
cd ..
echo 'Done!'
