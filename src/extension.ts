import * as vscode from 'vscode';

const danceDurationMs = 5_000;
const hasDancedOnFirstRunKey = 'coder-cat.hasDancedOnFirstRun';

let dancePanel: vscode.WebviewPanel | undefined;
let closeTimer: NodeJS.Timeout | undefined;

export function activate(context: vscode.ExtensionContext) {
	const danceCommand = vscode.commands.registerCommand('coder-cat.dance', () => {
		showDancingCat(context);
	});

	context.subscriptions.push(danceCommand);

	if (!context.globalState.get<boolean>(hasDancedOnFirstRunKey, false)) {
		showDancingCat(context);
		void context.globalState.update(hasDancedOnFirstRunKey, true);
	}
}

function showDancingCat(context: vscode.ExtensionContext): void {
	disposeDancePanel();

	const mediaDirectory = vscode.Uri.joinPath(context.extensionUri, 'media');
	dancePanel = vscode.window.createWebviewPanel(
		'coderCatDance',
		'Coder Cat',
		vscode.ViewColumn.Active,
		{
			enableScripts: false,
			localResourceRoots: [mediaDirectory],
		},
	);

	const imageUri = dancePanel.webview.asWebviewUri(
		vscode.Uri.joinPath(mediaDirectory, 'disco-cat-dance.gif'),
	);
	dancePanel.webview.html = getWebviewContent(dancePanel.webview, imageUri);

	dancePanel.onDidDispose(() => {
		dancePanel = undefined;
		clearCloseTimer();
	});

	closeTimer = setTimeout(disposeDancePanel, danceDurationMs);
}

function getWebviewContent(webview: vscode.Webview, imageUri: vscode.Uri): string {
	const csp = [
		"default-src 'none'",
		`img-src ${webview.cspSource}`,
		`style-src ${webview.cspSource} 'unsafe-inline'`,
	].join('; ');

	return `<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="Content-Security-Policy" content="${csp}">
	<title>Coder Cat</title>
	<style>
		* {
			box-sizing: border-box;
		}

		body {
			margin: 0;
			min-height: 100vh;
			display: grid;
			place-items: center;
			overflow: hidden;
			background:
				radial-gradient(circle at 20% 20%, rgba(255, 0, 170, 0.36), transparent 32%),
				radial-gradient(circle at 80% 70%, rgba(0, 220, 255, 0.32), transparent 34%),
				var(--vscode-editor-background);
		}

		.stage {
			position: relative;
			display: grid;
			place-items: center;
			width: min(72vw, 620px);
			aspect-ratio: 1;
			animation: pulse 0.6s ease-in-out infinite alternate;
		}

		.stage::before,
		.stage::after {
			content: '';
			position: absolute;
			inset: 4%;
			border: 4px solid rgba(255, 255, 255, 0.45);
			border-radius: 50%;
			animation: spin 2.2s linear infinite;
		}

		.stage::after {
			inset: 13%;
			border-style: dashed;
			animation-direction: reverse;
			animation-duration: 1.4s;
		}

		.cat {
			z-index: 1;
			display: block;
			max-width: min(58vw, 460px);
			max-height: 65vh;
			border: 8px solid rgba(255, 255, 255, 0.88);
			border-radius: 28px;
			box-shadow: 0 24px 80px rgba(0, 0, 0, 0.48);
			object-fit: contain;
			animation: dance 0.48s ease-in-out infinite alternate;
		}

		@keyframes dance {
			0% { transform: translate(-22px, 12px) rotate(-8deg) scale(0.96); }
			45% { transform: translate(0, -24px) rotate(3deg) scale(1.04); }
			100% { transform: translate(22px, 8px) rotate(9deg) scale(0.98); }
		}

		@keyframes pulse {
			from { filter: hue-rotate(0deg); }
			to { filter: hue-rotate(80deg); }
		}

		@keyframes spin {
			to { transform: rotate(360deg); }
		}

		@media (prefers-reduced-motion: reduce) {
			.stage,
			.stage::before,
			.stage::after,
			.cat {
				animation-duration: 1.5s;
			}
		}
	</style>
</head>
<body>
	<main class="stage" aria-label="A dancing coder cat">
		<img class="cat" src="${imageUri}" alt="Coder Cat dancing">
	</main>
</body>
</html>`;
}

function clearCloseTimer(): void {
	if (closeTimer) {
		clearTimeout(closeTimer);
		closeTimer = undefined;
	}
}

function disposeDancePanel(): void {
	clearCloseTimer();
	dancePanel?.dispose();
	dancePanel = undefined;
}

export function deactivate(): void {
	disposeDancePanel();
}
