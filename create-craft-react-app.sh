#!/bin/bash

if [[ $# -eq 0 ]] ; then
    echo 'you must provide an install path'
    exit 0
fi

echo "installing craft" &&
composer create-project craftcms/craft $1 &&

cd $1 &&

composer require spicyweb/craft-neo --no-update;
composer require craftcms/redactor --no-update;
composer require nystudio107/craft-seomatic --no-update;
composer require nystudio107/craft-imageoptimize --no-update;
composer require verbb/super-table --no-update;
composer update;

echo "installing create-react-app" &&
npx create-react-app ./react-app &&

echo "merging craft and create-react-app .gitignore files" &&
echo "\n" >> ./.gitignore &&
cat ./react-app/.gitignore >> ./.gitignore &&

echo "moving files around"
rm ./react-app/.gitignore &&
shopt -s dotglob &&
mv ./react-app/* . &&
rm -r ./react-app

echo "writing .htaccess file"
echo $'<IfModule mod_rewrite.c>
    RewriteEngine On

    # Send would-be 404 requests to Craft
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteCond %{REQUEST_URI} ^(/cpresources|/admin|/api|/actions) [NC]
    RewriteCond %{REQUEST_URI} !^/(favicon\.ico|apple-touch-icon.*\.png)$ [NC]
    RewriteRule (.+) index.php?p=$1 [QSA,L]

    # Proxy all other requests to the React App
    Options -MultiViews
    RewriteEngine On
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteRule (.*) http://localhost:3001/$1 [P]
</IfModule>' > ./web/.htaccess &&

echo "writing routes file" &&
echo $'<?php
return [
  'api' => 'graphql/api',
];
' > ./config/routes.php &&

echo "done"