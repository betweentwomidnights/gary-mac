# gary4live mac version

## update july 2025 - now with stable-audio-open-small (jerry)

![Gary4Live Screenshot](screenshot.png)

gary4live now includes three AI models working together:

**jerry** (stable-audio-open-small): generates 12 seconds of bpm-aware audio almost instantly. perfect for drum layers and quick iteration.

**terry** (melodyflow): transforms your input audio and returns audio the same length. great for reimagining gary's continuations or your recorded input.

**gary** (musicgen): continues from your input audio with wild variations that tend to stack up with your ableton layers in surprising ways.

## what's new in july 2025

- **instant generation with jerry**: stable-audio-open-small generates 12-second samples in under 1 second
- **bpm awareness**: jerry uses ableton's global bpm automatically (generic bpm values like 100, 120 work best)
- **better state management**: clear visual feedback for backend connection status
- **waveform highlighting**: hover over buttons to see which waveform they operate on
- **recording progress**: visual feedback while recording the 30-second buffer
- **session management**: transform continuations or go back to original input
- **simple prompts work best**: try "techno drums", "house beat", "aggressive bass" with jerry

## model links

- **stable-audio-open-small**: https://huggingface.co/stabilityai/stable-audio-open-small
- **melodyflow**: https://huggingface.co/spaces/facebook/melodyflow  
- **audiocraft/musicgen**: https://github.com/facebookresearch/audiocraft

## installation

in this version, gary expects to be placed in `/Applications/g4l/GARY_mac.amxd`

the `.app` file expects to be in `/Applications/g4l/gary4live.app`

## development setup

if you want to run gary's electron ui in dev mode:

1. clone this repo:
```bash
git clone https://github.com/betweentwomidnights/gary-mac.git
```

2. install nvm:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
```

3. re-open terminal and run:
```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
```

4. install and use Node 18:
```bash
nvm install 18
nvm use 18
```

5. navigate to project and start:
```bash
cd gary-mac/g4l-ui
npm install
npm run start
```

to build the app:
```bash
npm run package
```

the app will be built to `g4l-ui/release/build/mac/gary4live.app`.

## important filepath considerations

**production filepaths** (used in the released version):
- `/Applications/g4l/myOutput.wav`
- `/Applications/g4l/myBuffer.wav`

**development filepaths** (our dev environment):
- `/Documents/g4l/myOutput.wav`
- `/Documents/g4l/myBuffer.wav`

if you're developing, you'll need to perform a **find and replace** in these files:
- `electron-communication.js`
- `commentedout.js`
- both max4live UI objects (node.script components)

change `/Applications/g4l/` to your development path (e.g., `/Documents/g4l/`).

**important**: if you change filepaths during development, change them back to `/Applications/g4l/` before running `npm run package`. it took a lot of iteration to get apple to let us rewrite these audio files in the production location.

dynamic filepaths are challenging inside max4live GUI objects/node.scripts. when we tried placing `myBuffer.wav` in the same folder as the device, we encountered permissions issues on macbook in the production release. someone smarter than me might solve this delicate filepath issue so that dynamic filepaths in the max4live objects and node.scripts play nicely together. that would be a very welcome contribution.

## backend

you can talk to our backend using the url `https://g4l.thecollabagepatch.com` in `commentedout.js`.



if our backend goes down, it can be built yourself using this repo: https://github.com/betweentwomidnights/gary-backend-combined

see below about apple silicon woes with the backend repo. if you do manage to get the backend running locally, you can uncomment these lines in `commentedout.js`:

```
// =============================================================================
// CONFIGURATION - Change these URLs when building from source with localhost
// =============================================================================

// For localhost development with our github repo https://github.com/betweentwomidnights/gary-backend-combined
// Uncomment these lines and comment out the production URLs below:
// const BACKEND_URL = 'http://localhost:8000';
// const STABLE_AUDIO_HOST = 'localhost';
// const STABLE_AUDIO_PORT = 8005;
// const STABLE_AUDIO_PATH = '/generate';  // Direct to service
// const USE_HTTPS = false;

// Production URLs (default):
const BACKEND_URL = 'https://g4l.thecollabagepatch.com';
const STABLE_AUDIO_HOST = 'g4l.thecollabagepatch.com';
const STABLE_AUDIO_PORT = 443;
const STABLE_AUDIO_PATH = '/audio/generate';  // Through Caddy proxy
const USE_HTTPS = true;
```

## apple silicon compatibility

**as of july 2025, we have not yet solved the issue of building the backend on apple silicon devices.** a dockerfile exists but the last time we tested on apple silicon, it didn't work. since we don't have an apple silicon machine for testing, this remains an open issue. if you get it working, please let us know!

## max4live ui standalone

the max4live UI does almost everything that the electron UI does. it doesn't have jerry generation, crop function, drag/drop, or the visual feedback, but it will work for basic gary continuations. we tried to make electron as optional as possible while adding the new features.

## community

yell at me on discord: https://discord.gg/VECkyXEnAd  
yell at me on twitter: [@thepatch_kev](https://twitter.com/@thepatch_kev)

there are many demos of this plugin being used on youtube:
- [@thepatch_dev](https://youtube.com/@thepatch_dev)
- [@thecollabagepatch](https://youtube.com/@thecollabagepatch)

a special thanks to lyra for the fine-tuning help that made this plugin interesting.