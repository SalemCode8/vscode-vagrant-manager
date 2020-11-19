import {commands, ExtensionContext, Progress, ProgressLocation, window, workspace} from 'vscode';
import { exec } from 'child_process';
export function activate(context: ExtensionContext) {
	console.log('Congratulations, your extension "vagrant-manager" is now active!');

	context.subscriptions.push(commands.registerCommand('vagrant-manager.halt', () => {
		window.withProgress({
			location: ProgressLocation.Notification,
			title: 'Halting Vagrant Machine'
		}, (progress, token) => {
			return new Promise((resolve, reject) => {
				exec('vagrant halt', {
					cwd: workspace.rootPath
				}, (err, stdout, stderr) => {
					if(err) {
						window.showErrorMessage(err.message);
						reject();
					}
					if(stderr) {
						window.showErrorMessage(stderr); reject();
					}
					resolve();
					window.showInformationMessage('Vagrant Machine Halted');
				});
			});
		});
	}));
	context.subscriptions.push(commands.registerCommand('vagrant-manager.up', () => {
		window.withProgress({
			location: ProgressLocation.Notification,
			title:'Starting Vagrant Machine'
		}, (progress, token) => {
			return new Promise((resolve, reject) => {
				exec('vagrant up', {
					cwd: workspace.rootPath
				}, (err, stdout, stderr) => {
					if(err) {window.showErrorMessage(err.message.replace('Command failed: ','')); reject(); return;}
					window.showInformationMessage('Vagrant Machine Started');
					resolve();
				});
			});;
		})

	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}
