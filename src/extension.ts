import * as vscode from 'vscode';
import * as path from 'path';
import iconsData from './icons.json';
import * as fs from 'fs';

type IconData = { u: string; c: string };

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "ui5-icons-symbols" is now active!');

    const iconDecorationType = vscode.window.createTextEditorDecorationType({
        after: {
            margin: '0 0 0 1rem',
            color: '#00FF00',
            fontWeight: 'normal',
        },
    });

    const notifyFontMissing = () => {
        vscode.window.showWarningMessage(
            'It seems that the SAP-icons font is not loaded. Please make sure the SAP-icons font is installed on your system.'
        );
        vscode.env.openExternal(
            vscode.Uri.parse('https://github.com/SAP/theming-base-content/blob/master/content/Base/baseLib/baseTheme/fonts/SAP-icons.ttf')
        );
    };

    const applyIconDecorations = (editor: vscode.TextEditor) => {
        const text = editor.document.getText();
        const decorationsArray: vscode.DecorationOptions[] = [];

        (iconsData as IconData[]).forEach((icon) => {
            const regex = new RegExp(`['"]sap-icon://${icon.u}['"]`, 'g');
            let match;
            while ((match = regex.exec(text)) !== null) {
                const startPos = editor.document.positionAt(match.index);
                const endPos = editor.document.positionAt(match.index + match[0].length);
                const decoration = {
                    range: new vscode.Range(startPos, endPos),
                    renderOptions: {
                        after: {
                            contentText: icon.c,
                            fontFamily: 'SAP-icons',
                            color: '#00FF00',
                            margin: '0 0 0 0.5rem',
                        },
                    },
                };
                decorationsArray.push(decoration);
            }
        });

        try {
            editor.setDecorations(iconDecorationType, decorationsArray);
        } catch (error) {
            notifyFontMissing();
        }
    };

    vscode.window.onDidChangeActiveTextEditor(
        (editor) => {
            if (editor) {
                applyIconDecorations(editor);
            }
        },
        null,
        context.subscriptions
    );

    vscode.workspace.onDidChangeTextDocument(
        (event) => {
            const editor = vscode.window.activeTextEditor;
            if (editor && event.document === editor.document) {
                applyIconDecorations(editor);
            }
        },
        null,
        context.subscriptions
    );

    const provider = vscode.languages.registerCompletionItemProvider(
        ['html', 'xml', 'javascript', 'typescript'],
        {
            provideCompletionItems(document, position) {
                const line = document.lineAt(position).text;
                const linePrefix = line.substring(0, position.character);
                const lineSuffix = line.substring(position.character);

                const quoteMatch = linePrefix.match(/(['"])[^'"]*$/);
                const quote = quoteMatch ? quoteMatch[1] : '"';

                const match = linePrefix.match(/sap-icon:(\/{0,2})([a-zA-Z0-9\-]*)$/);
                if (!match) {
                    return undefined;
                }

                const slashes = match[1] || '';
                const alreadyTyped = match[2] || '';
                const startPos = position.translate(0, -alreadyTyped.length);

                const suggestions = (iconsData as IconData[])
                    .filter((icon) => icon.u.startsWith(alreadyTyped))
                    .map((icon) => {
                        const item = new vscode.CompletionItem(icon.u, vscode.CompletionItemKind.Value);
                        item.label = `${icon.u}`;
                        item.detail = 'SAP UI5 Icon';
                        item.documentation = new vscode.MarkdownString(`![${icon.u}](vscode-resource:${path.join(context.extensionPath, 'out', 'svg_icons', `${icon.u}.svg`)})`);

                        const svgPath = path.join(context.extensionPath, 'out', 'svg_icons', `${icon.u}.svg`);
                        let documentation: vscode.MarkdownString;
                        
                        try {
                            const svgContent = fs.readFileSync(svgPath, 'utf-8');
                            const base64 = Buffer.from(svgContent).toString('base64');
                            documentation = new vscode.MarkdownString(`![${icon.u}](data:image/svg+xml;base64,${base64})`);
                        } catch (e) {
                            documentation = new vscode.MarkdownString(`SAP Icon: ${icon.u}`);
                        }
                        
                        item.documentation = documentation;

                        const slashesAlreadyTyped = slashes.length;
                        const slashesNeeded = 2 - slashesAlreadyTyped;
                        const needsSlashes = '/'.repeat(Math.max(slashesNeeded, 0));
                        const alreadyHasClosingQuote = lineSuffix.trimStart().startsWith(quote);

                        item.insertText = alreadyHasClosingQuote
                            ? `${needsSlashes}${icon.u}`
                            : `${needsSlashes}${icon.u}${quote}`;

                        item.range = new vscode.Range(startPos, position);
                        return item;
                    });

                return suggestions;
            },
        },
        ':', '/', // trigger characters
    );

    context.subscriptions.push(provider);

    const disposable = vscode.commands.registerCommand('ui5-icons-symbols.helloWorld', () => {
        vscode.window.showInformationMessage('Hello World from UI5 Icons Symbols!');
    });

    context.subscriptions.push(disposable);
}

export function deactivate() {}
