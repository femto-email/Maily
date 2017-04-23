[![Build Status](https://travis-ci.org/femto-email/client.svg?branch=master)](https://travis-ci.org/femto-email/client)
# Maily

[![Greenkeeper badge](https://badges.greenkeeper.io/femto-email/client.svg)](https://greenkeeper.io/)

> A cross-platform mail-client with the intent to be fast, reliable and easy to use.

![](https://puu.sh/vmtT6/b803a88da5.png)

This is an attempt to see how *simple* a Node.JS app can be yet still have the full functionality a user can expect.  It aims to be a good training project for people to start working on, even if they have very little knowledge on contributing to Node.JS projects, or open source projects in general.

At the moment of writing, we don't have any external build tools, `gulpfile.js` is simply included in case we wish to use any `*.scss` files.  Setting up the development environment is a single command, as is starting the application.  

## Production

We're very sorry, at the moment no production builds are available!  Please stand-by as we get our monkeys typing as fast as we can.

## Dev

Looking to get started?  We've kept things as simple as possible, right now there are only three commands required to setup this project.  If you get any problems, feel free to contact me on Discord, we have a [dedicated channel here](https://discord.gg/dnbQx6X) or create an issue within Github.

Before getting started, please make sure you have the following installed:

 - Node V7+ (check with `node -v`, install from [here](https://nodejs.org/en/download/))
 - NPM (check with `npm -v`, comes pre-installed with Node)
 - Git (check with `git --version`, install from [here](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git))
 - Electron (check with `electron -v`, install with `npm i -g electron`)

```
$ npm install
```

### Run

```
$ npm start
```

This command runs the 'start' function defined within `package.json`.  It is a universal way to run programs, and in this project is simply runs `electron .`.

### Build

```
$ npm run dist
```

### Layout

The top-level folder mainly contains information relating to the project, as well as how specific tools can run/build the project.  Important files in here are:

 - `index.js`, which is the file run when one starts the application, it creates a new window and loads up our application.  
 - `package.json`, contains information about this project such as licensing and author information.  Also contains a list of all node modules required to run this project, which are installed when `npm i` is run.

The app folder contains the mail client, seperated into the HTML for layout, JavaScript modules for the logic and CSS for the styling.  

 - `main.html`, a page which is always loaded, it forms the basis of each of our pages.  Contains the script to load `app.js` and any styles we will need.
 - `welcome.html`, contains user onboarding information to get them setup with an account.
 - `mail.html`, contains the page design for the actual mail application.
 - `app.js`, the entry point for the JavaScript code.

There are also three folders, `css` contains all the styling for the project, as well as fonts.  `helpers` contains a series of commands that aim to make the rest of the project easier to use (one hopes there are very few reasons to edit files in here), whilst `modules` implements a lot of the functionality you see.  Within the modules folder, we have:

 - `setup.js`, when the project is first loaded this module is run to setup basic information required globally and deciding which state the user is currently in.  Once it gains this information, it routes the user to the correct location.
 - `welcome.js`, handles all the logic for the user onboarding.
 - `mail.js`, handles all the logic for the mail application itself.
 - `mailer.js`, a module which attempts to abstract the `IMAP` plugin to our needs, handles the base authentication with the mail server as well as retrieving messages.

Electron is built for single page applications, thus we use our own router (`navigo` in `app.js`) and insert the HTML of each page ourselves.  To attempt to seperate the CSS into logical files, we also enable/disable them on page change.  Most of this has been completed before hand so we can normally ignore it.  When creating a new page however, one should run the following command:

```javascript
page(<pageName>, ['basic', <cssFiles...>])
```

It will handle switching the HTML, as well as enabling/disabling required CSS files.  When this new page is loaded, for development purposes it is also useful to add in:

```javascript
if (!testLoaded(<pageName>)) return
```

Which makes sure this page isn't being called from a `reload` operation, but instead is being routed from the router.  If the page has not loaded, it is likely the setup function has not run yet and variables you may normally have access to are no longer defined.

## Contributing

This is an OPEN open source project, which means that any individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.  Noting this however, please do not change the git history, commit on-going work (which is unfinished) to the master branch or push major design changes without at least opening an issue for debate.

### Coding Style Tests

We enforce several code standards in order to keep the codebase maintainable, the full list can be found [here](http://standardjs.com/rules.html) but the key points are:

- We use two spaces for indentation.
- Always handle errors.
- Never have unused variables.
- Don't define multiple variables in one statement
- No semicolons at the end of lines

## Roadmap

### Functionality

- [ ] Allow people to use the service online. (major parts: db, page changes)
- [x] List folders from an account.
- [x] List emails from an account.
- [x] Add an account/edit an account.
- [ ] Send emails via SMTP.
- [x] Compile multiple emails into one thread.
- [ ] Render HTML and plaintext.
- [ ] Implement anti-spam.
- [ ] Test an account with a specific email.
- [x] Persistant caches for emails and folders from a user.
- [ ] Ability to snooze emails.
- [ ] Delay email sending.
- [ ] Contacts list.
- [ ] Implement a method of searching.
- [ ] Add a settings page for hotkeys & etc.
- [ ] Allow people to create their own plugins.
- [ ] Unified email account.
- [ ] Add "topics" and "attributes" to emails that can be sorted from.
- [ ] Template responses for many different things.
- [ ] Placeholders in response templates ( like {{ source.to.firstName }} ).
- [ ] Inbuilt PGP support.
- [ ] Automatic folder rules & actions (perhaps based on Regex or something?)

### Styling
- [ ] Login page redesign (in progress).
- [ ] Settings page.
- [ ] Account testing page (in progress).
- [ ] Email list.
- [ ] Compose email page.
- [ ] List of contacts page.
- [ ] Customisable layouts.
- [ ] Image effects in the email editor. 

### Various Useful Commands

```javascript
// Reset Current Account
(async () => { let y = await mailStore[state.account.hash].removeAsync({}, { multi: true }); console.log(y); stateSet('state', 'new'); location.reload(); })()
// List All Emails on Current Account
(async () => { let y = await mailStore[state.account.hash].findAsync({}, {}); console.log(y); })()
// Change Current State (available: 'new', 'mail')
stateSet('state', 'new')
// See Loaded CSS Files
(() => { for (let i = 0; i < document.styleSheets.length; i++) { console.log(document.styleSheets[i].ownerNode.getAttribute('data-name') + ": " + (document.styleSheets[i].disabled ? 'disabled' : 'enabled')) }})()
```

## License

MIT © [Codefined](http://github.com/popey456963/maily) & [Miles Budden](http://github.com/pbexe)
