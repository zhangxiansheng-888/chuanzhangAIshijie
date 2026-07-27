# 船长AI视界（chuanzhangAIshijie）

一个从“灵感”走到“最终分镜”的中文 AI 影视创作工具。

这个仓库只做两件事：

- 提供可以在线使用和自行部署的网站源码。
- 提供 5 个可以单独安装到 Codex 的创作技能。

在线体验：[船长AI视界](https://captain-ai-studio.zhanganseng.chatgpt.site)

## 创作流程

1. 灵感破题
2. 故事创作
3. 图片提示词
4. 真人感与角色情绪
5. 最终分镜

网站采用 BYOK（自带 API Key）方式。每位使用者填写自己的 OpenAI API Key，密钥只用于向 OpenAI 发起当次请求；项目内容保存在使用者自己的浏览器中。

> ChatGPT Plus 与 OpenAI API 是两套独立服务。使用网站调用 API 时，需要在 OpenAI API 平台单独开通计费和额度。

## 仓库中的技能

| 技能 | 用途 |
| --- | --- |
| `chuanzhang-chuangzuo-v1` | 从灵感、梗概到完整中文影视创作与剧本诊断 |
| `chuanzhang-tuxiangtishici` | 把故事和画面想法转成中英双语图片提示词 |
| `chuanzhangzhenren-prompts` | 强化真人摄影感、身份一致性、妆容、光线和质感 |
| `chuanzhangbiaoqing` | 设计微表情、情绪变化、身体表演和视频表演提示 |
| `chuanzhang-fenjing` | 将剧本拆成可制作的镜头、机位、调度和最终分镜 |

原本的 `chuanzhang-fenjing-` 末尾多了一个连字符，不符合 Codex 技能命名规范；仓库中已规范为 `chuanzhang-fenjing`，功能内容不变。

## 安装技能

### 最简单的方法

把当前 GitHub 仓库地址发给 Codex，然后说：

```text
请安装这个 GitHub 仓库 skills 目录下的全部技能。
```

只安装一个技能时，可以说：

```text
请安装这个仓库里的 skills/chuanzhang-fenjing。
```

安装完成后，从下一次对话开始即可使用。

### 手动安装

下载或克隆本仓库，把 `skills` 目录中需要的技能文件夹复制到：

- Windows：`%USERPROFILE%\.codex\skills\`
- macOS / Linux：`~/.codex/skills/`

每个技能目录都必须完整保留，其中的 `SKILL.md` 是技能入口。

## 本地运行网站

环境要求：Node.js 22.13 或更高版本。

```bash
npm install
npm run dev
```

浏览器打开终端显示的本地地址即可使用。

构建检查：

```bash
npm test
```

## API Key 与隐私

- 仓库不包含任何人的 API Key。
- 网站不会把用户的 API Key 写入项目文件或数据库。
- 使用者可以选择只在当前页面会话中保存密钥。
- 不要把 `.env`、日志或包含密钥的截图提交到 GitHub。
- 公开部署前，请自行检查服务器日志和托管平台设置。

## 目录结构

```text
chuanzhangAIshijie/
├─ app/          网站页面与接口
├─ public/       网站静态资源
├─ skills/       5 个可独立安装的 Codex 技能
├─ tests/        网站检查
├─ README.md
└─ LICENSE
```

## 开源许可

本项目使用 [MIT License](LICENSE)。你可以学习、修改、分发和商用，但需保留原许可与版权声明。
