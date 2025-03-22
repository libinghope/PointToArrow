# C++ 指针自动替换扩展

这个 VS Code 扩展旨在帮助 C++ 开发者，在使用指针变量访问成员时自动将输入的点（`.`）替换为箭头（`->`），从而减少常见错误并提升开发效率。

## 功能介绍

- **自动替换**：在 C++ 文件中，当检测到指针变量后输入的“.”时，自动替换为“->”。
- **仅限 C++ 文件**：扩展只在 C++ 源文件（如 `.cpp`、`.hpp` 等）中生效。
- **基于语言服务**：利用 VS Code 的语言服务（例如 `vscode.executeHoverProvider` 命令）获取变量类型信息，判断变量是否为指针，从而提高替换的准确性。
- **可配置**：用户可以通过设置项 `cppPointer.autoArrow.enabled` 来启用或禁用自动替换功能。

## 安装方法

1. 打开 VS Code。
2. 进入扩展视图（侧边栏图标或快捷键 `Ctrl+Shift+X`）。
3. 搜索 “C++ 指针自动替换扩展” 并安装。
4. 安装完成后，重启 VS Code 即可生效。

## 使用说明

安装并启用扩展后，编辑 C++ 文件时，当你在指针变量后输入“.”时，扩展会自动判断该变量是否为指针，并将“.”替换为“->”。  
如果变量不是指针，或者你不希望进行自动替换，可以在用户设置中关闭此功能。

## 配置选项

该扩展提供了以下配置项，允许用户灵活控制自动替换行为：

- **cppPointer.autoArrow.enabled**  
  类型：`boolean`  
  默认值：`true`  
  描述：启用或禁用在指针变量后输入“.”时自动替换为“->”的功能。

要修改此配置，在 VS Code 中打开设置（文件 > 首选项 > 设置 或使用快捷键 `Ctrl+,`），搜索 `cppPointer.autoArrow.enabled`，然后进行切换即可。

## 开发与贡献

该扩展基于 [Yo Code](https://code.visualstudio.com/api/get-started/your-first-extension) 工具和 VS Code 扩展 API 开发，主要逻辑包括：
- 利用 `onDidChangeTextDocument` 监听文档改动事件；
- 调用 `vscode.executeHoverProvider` 获取当前变量的悬停信息，判断是否为指针；
- 在指针变量后输入“.”时，自动替换为“->”；
- 通过配置项允许用户控制功能启用状态。

欢迎大家提交 issue 或 pull request，共同完善此扩展！

## 常见问题

**问：为什么我的指针变量输入“.”没有被替换？**  
答：请确认当前文件为 C++ 文件（语言标识为 `cpp`），并检查配置项 `cppPointer.autoArrow.enabled` 是否已启用。另外，该功能依赖于语言服务返回的类型信息，请确保你的 C++ 语言服务（例如 Microsoft C++ 扩展或 clangd）工作正常。

## 许可证

本扩展遵循 [MIT 许可证](LICENSE) 发布。
