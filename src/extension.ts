import * as vscode from "vscode";

export async function activate(context: vscode.ExtensionContext) {
  // 修改事件处理器为异步
  vscode.workspace.onDidChangeTextDocument(async (event) => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;

    const document = editor.document;
    const position = editor.selection.active;

    // 获取光标前一个字符
    const line = document.lineAt(position.line);
    const charBeforeCursor = line.text.charAt(position.character);

    if (charBeforeCursor === ".") {
      const wordBeforeCursor = getWordBeforeCursor(document, position);

      // 添加边界检查防止越界
      if (position.character > wordBeforeCursor.length) {
        const isPointer = await isPointerType(
          document,
          position,
          wordBeforeCursor
        );
        if (isPointer) {
          replaceDotWithArrow(editor, position);
        }
      }
    }
  });
}

function getWordBeforeCursor(
  document: vscode.TextDocument,
  position: vscode.Position
): string {
  const line = document.lineAt(position.line);
  const range = new vscode.Range(
    new vscode.Position(position.line, 0),
    position
  );
  const textBeforeCursor = line.text.substring(0, position.character);
  const wordMatch = textBeforeCursor.match(/\w+$/);
  return wordMatch ? wordMatch[0] : "";
}

async function isPointerType(
  document: vscode.TextDocument,
  position: vscode.Position,
  word: string
): Promise<boolean> {
  // 获取clangd的hover信息
  console.log(position.line);
  console.log(position.character - word.length);
  const hoverResults = await vscode.commands.executeCommand<vscode.Hover[]>(
    "vscode.executeHoverProvider",
    document.uri,
    new vscode.Position(position.line, position.character - word.length)
  );

  if (!hoverResults || hoverResults.length === 0) {
    return false;
  }

  // 解析hover信息中的类型信息
  const typePattern = /(\w+\s*[*&]|[*&]\s*\w+)/;
  for (const hover of hoverResults) {
    const contents = hover.contents;
    for (const content of contents) {
      let text = "";
      if (typeof content === "string") {
        text = content;
      } else if (content instanceof vscode.MarkdownString) {
        text = content.value;
      }

      // 匹配指针类型模式（包含*或->操作符）
      if (typePattern.test(text) || text.includes("Pointer to")) {
        console.log("=================是指针======================");
        return true;
      }
    }
  }
  return false;
}

function replaceDotWithArrow(
  editor: vscode.TextEditor,
  position: vscode.Position
) {
  const text = editor.document.getText(
    new vscode.Range(position.translate(0, 1), position)
  );
  if (text === ".") {
    editor.edit((editBuilder) => {
      editBuilder.replace(
        new vscode.Range(position.translate(0, 1), position),
        "->"
      );
    });
  }
}

export function deactivate() {}
