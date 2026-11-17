<p align="center">
  <img src="media/coder-cat-icon.png" width="128" height="128" alt="Coder Cat icon">
</p>

<h1 align="center">Coder Cat</h1>

<p align="center">
  A playful coding cat that celebrates inside VS Code with a five-second dance. 😸
</p>

## Features

- Shows Coder Cat automatically on the first activation after installation.
- Displays a bundled animated cat GIF with colorful disco effects.
- Closes the dance view automatically after five seconds.
- Provides a command for replaying the animation whenever you want.
- Adapts its background to the active VS Code theme.
- Runs locally without scripts, network requests, telemetry, or data collection.

## Installation

### Install from a VSIX file

1. Open the Extensions view in VS Code.
2. Select the **...** menu in the top-right corner.
3. Select **Install from VSIX...**.
4. Choose the latest `coder-cat-*.vsix` file.
5. Run **Developer: Reload Window** if VS Code asks you to reload.

You can also install the package from a terminal:

```bash
code --install-extension coder-cat-0.1.2.vsix
```

## Usage

Coder Cat dances automatically once, on the first activation after installation. To replay the animation:

1. Open the Command Palette with `Cmd+Shift+P` on macOS or `Ctrl+Shift+P` on Windows and Linux.
2. Search for **Coder Cat: Dance!**.
3. Select the command and enjoy the dance.

> **Note:** `Coder Cat: Dance!` is a VS Code command, not a shell command. Run it from the Command Palette rather than the terminal.

## Commands

| Command | Command ID | Description |
| --- | --- | --- |
| **Coder Cat: Dance!** | `coder-cat.dance` | Displays Coder Cat for five seconds. |

## Requirements

- VS Code `1.85.0` or newer.
- No external dependencies or configuration are required.

## Extension settings

Coder Cat does not currently contribute any settings.

## Development

```bash
npm install
npm run compile
npm test
```

Press `F5` in VS Code to launch an Extension Development Host. If the automatic first-run dance has already been recorded, use **Coder Cat: Dance!** from the Command Palette.

To create a production bundle, run:

```bash
npm run package
```

To build an installable VSIX package, run:

```bash
npx @vscode/vsce package --no-dependencies
```

## Privacy

Coder Cat does not collect, store, or transmit personal information. The extension displays bundled local media and does not make network requests.

## Release notes

### 0.1.2

- Replaced the static JPEG dance image with an animated GIF.
- Reduced the packaged extension size by removing the obsolete JPEG asset.

See [CHANGELOG.md](CHANGELOG.md) for the complete release history.

## Repository

[github.com/arashpourrahim/VSCode-Extention-coder-cat](https://github.com/arashpourrahim/VSCode-Extention-coder-cat)
