Assumptions - you have composer, php, node, yarn installed on your machine

-Run `npx sgtpenguin/create-craft-react-app your-app-name` to install the project template
-Create an empty database for you project
-Put database details into .env
-Point a hostname to the /web folder
-Navigate to http://your-hostname.test/admin and install craft
-At the bottom of the admin panel, click upgrade to craft pro and install as a trial.
-Go to settings/plugins and install all the plugins
-Create a Redactor field called RichText `richText`
-Create a neo field called Page Builder `pageBuilder` with a block type heading that uses the heading field.
-Create a Structure Section called `Pages` with an entry type `Page`. Set entry uri format to {slug}. Add the `pageBuilder` field to the `page` entry type.
-Go to the graphql schema tab and enable the `Pages` section and `page` entry type for querying.

--------CRA README
