import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Disco Cat Extension', () => {
	test('registers the dance command', async () => {
		const commands = await vscode.commands.getCommands(true);

		assert.ok(commands.includes('disco-cat.dance'));
	});
});
