#!/bin/bash

# Set the paths for Node.js
NODE_BIN="/Applications/g4l/tools/node/bin"

# Ensure Node.js is in PATH
export PATH="$NODE_BIN:$PATH"

# Install Node.js dependencies
cd /Applications/g4l
"$NODE_BIN/npm" install

# Verify Node.js installations
echo "Node.js version:"
"$NODE_BIN/node" -v

echo "npm version:"
"$NODE_BIN/npm" -v

# Install ffmpeg using Homebrew
if ! command -v brew &> /dev/null
then
    echo "Homebrew not found, installing Homebrew..."
    /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
fi

echo "Installing ffmpeg using Homebrew..."
brew install ffmpeg

# Verify ffmpeg installation
echo "ffmpeg version:"
ffmpeg -version

# Set the correct permissions
chmod -R 777 /Applications/g4l

# Output a success message
echo "Installation completed successfully."

exit 0
