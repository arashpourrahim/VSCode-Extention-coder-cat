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
		body {
			margin: 0;
			min-height: 100vh;
			display: grid;
			place-items: center;
			overflow: hidden;
			background: transparent;
		}

		.cat {
			display: block;
			max-width: min(70vw, 500px);
			max-height: 70vh;
			object-fit: contain;
		}
	</style>
</head>
<body>
	<img class="cat" src="${imageUri}" alt="Coder Cat dancing">
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
