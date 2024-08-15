
# gary4live mac version

the file 'notfound' was too hilarious to delete in the process of making this.

this is the mac version of gary4live.

in this version, gary expects to be placed in `/Applications/g4l/GARY_mac.amxd`

the `.app` file expects to be in `/Applications/g4l/g4l-ui/release/build/mac/gary4live.app`

**IF YOU CHOOSE TO CHANGE FILEPATHS:**

`commentedout.js`, `electron_communication.js`, and `launch_electron.js` will need to be changed.

if you want to run gary's electron ui in dev mode,

```
clone this repo:

git clone https://github.com/betweentwomidnights/gary-mac.git

rename gary-mac to g4l

cd gary-mac/g4l-ui

npm install

npm run start
```

the max4live UI does almost everything that the electron UI does. It doesn't have a crop function, and you can't drag/drop your waveform in, but it will work. i tried to make electron as optional as i could.

i included the basic files for making the installer. Here are the commands I used:

```
pkgbuild \                                 
  --root ~/Documents/g4l-package \
  --identifier com.thecollabagepatch.gary4live \
  --version 1.0.0 \
  --scripts ~/Documents/g4l-package/scripts \
  --install-location /Applications/g4l \
  --ownership preserve \
  gary4live.pkg

productbuild \                                           
  --distribution ~/Documents/g4l-package/distribution.xml \
  --package-path /Users/klgriffing \
  --resources ~/Documents/g4l-package \
  ~/Documents/g4l-package/gary4live-installer.pkg
```

you can talk to our backend using the url `https://g4l.thecollabagepatch.com` in `commentedout.js`

for now... if our backend goes down, though, it can be built yourself using this repo:

https://github.com/betweentwomidnights/gary-backend-combined

there are several backend types in that repo. `g4lwebsockets` is the one you'll be spinning up using docker-compose.

i realize as i type this that you're a mac user, and as our dear friend rips pointed out, the backend there was designed for a linux environment.

i'm new to this mac stuff...sry

yell at me on twitter [@thepatch_kev](https://twitter.com/@thepatch_kev)

there are many demos of this plugin being used on youtube:
- [@thepatch_dev](https://youtube.com/@thepatch_dev)
- [@thecollabagepatch](https://youtube.com/@thecollabagepatch)

a special thanks to lyra for the fine-tuning help that made this plugin interesting.
