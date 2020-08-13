#!/bin/bash

if [[ $# -eq 0 ]] ; then
    echo 'you must provide an install path'
    exit 0
fi

echo "installing craft" &&
composer create-project craftcms/craft $1 &&

echo "installing create-react-app" &&
npx create-react-app $1/react-app &&

echo "merging craft and create-react-app .gitignore files" &&
echo "\n" >> $1/.gitignore &&
cat $1/react-app/.gitignore >> $1/.gitignore &&

echo "moving files around"
rm $1/react-app/.gitignore &&
shopt -s dotglob &&
mv $1/react-app/* $1 &&
rm -r $1/react-app

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
</IfModule>' > $1/web/.htaccess &&

echo "writing routes file" &&
echo $'<?php
return [
  'api' => 'graphql/api',
];
' > $1/config/routes.php &&

echo "done"