# 船长AI视界

一个从“灵感”走到“最终分镜”的中文 AI 影视创作工具。

GitHub 仓库名：`chuanzhangAIshijie`

这个仓库集中提供三种使用方式：

- 查看不调用 AI、不收集 API Key 的公开流程 Demo。
- 从 `self-hosted` 分支部署一份属于自己的可用网站。
- 提供 5 个可以单独安装到 Codex 的创作技能。

公开 Demo：[船长AI视界](https://captain-ai-studio.zhanganseng.chatgpt.site)

> 公开 Demo 的所有结果均为预制样例，只用于展示完整方法，不会调用 AI。需要真正创作时，请安装技能，或部署自己的版本。

## 核心特色

### 人物提示词不是只写长相

生成涉及人物的图片提示词时，船长AI视界会把两个专门技能加入图像提示词流程：

1. **真人感增强｜`chuanzhangzhenren-prompts`**
   - 锁定成年人物的身份锚点、脸型、五官比例和辨识特征。
   - 补齐真实皮肤、细发、眼神反光、妆容、服装、镜头、光线与摄影质感。
   - 有真人参考图时强调身份一致性；没有参考图时不虚假声称“保留本人长相”。
2. **人物情绪增强｜`chuanzhangbiaoqing`**
   - 不只使用“悲伤、愤怒、开心”等标签，而是先确定情绪触发、目标、阻碍和保护策略。
   - 把情绪写成可见表演：眼神先变化，再到呼吸、嘴角、下颌、头部、肩膀和手部。
   - 保留情绪顶点后的余波，减少僵硬脸、表情过猛和所有五官同时变化的问题。

最终的人物图片提示词会同时包含：

`人物身份一致性 + 真人摄影质感 + 可见情绪表演 + 构图光线 + 中英双语提示词`

### 从一个灵感走完整条生产链

## 创作流程

1. 灵感破题
2. 故事创作
3. 人物与图片提示词（自动融合真人感和人物情绪）
4. 真人感与角色情绪
5. 最终分镜

公开 Demo 不提供生成接口，不要求 API Key，也不产生 AI 调用费用。`self-hosted` 分支保留 BYOK（自带 API Key）版本，部署者和使用者自行承担各自的托管及 API 用量。

## 仓库中的技能

| 技能 | 用途 |
| --- | --- |
| `chuanzhang-chuangzuo-v1` | 从灵感、梗概到完整中文影视创作与剧本诊断 |
| `chuanzhang-tuxiangtishici` | 把故事和画面想法转成中英双语图片提示词；人物画面自动融合真人感与情绪规则 |
| `chuanzhangzhenren-prompts` | 真人感技能：强化真实摄影感、身份一致性、五官、皮肤、妆容、光线和质感 |
| `chuanzhangbiaoqing` | 人物情绪技能：设计情绪因果、微表情、呼吸、身体表演和情绪余波 |
| `chuanzhang-fenjing` | 将剧本拆成可制作的镜头、机位、调度和最终分镜 |

原本的 `chuanzhang-fenjing-` 末尾多了一个连字符，不符合 Codex 技能命名规范；仓库中已规范为 `chuanzhang-fenjing`，功能内容不变。

## 安装全部技能

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

## 部署自己的版本

可用网站保存在本仓库的 `self-hosted` 分支。最简单的做法是把下面这段话发给你自己的 Codex：

```text
请从这个仓库的 self-hosted 分支创建一份属于我自己的网站，
部署到我自己的 ChatGPT Sites 账号，不要使用仓库作者的托管。
网站采用 BYOK，每位使用者填写自己的 OpenAI API Key。
```

仓库地址：

```text
https://github.com/zhangxiansheng-888/chuanzhangAIshijie
```

这样部署后：

- 网站托管额度属于部署者自己的账号。
- AI 调用费用属于填写 API Key 的使用者。
- 不会占用船长AI视界公开 Demo 的 AI 额度。
- ChatGPT Plus 与 OpenAI API 仍是两套独立服务；API 需要单独开通计费。

## 本地运行公开 Demo

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
- 公开 Demo 不接收 API Key，也不会发起 AI 生成请求。
- `self-hosted` 版本不会把用户的 API Key 写入项目文件或数据库。
- `self-hosted` 版本的使用者可以选择只在当前页面会话中保存密钥。
- 不要把 `.env`、日志或包含密钥的截图提交到 GitHub。
- 公开部署前，请自行检查服务器日志和托管平台设置。

## 船长AI视界公众号

船长AI视界专注于 AI 影视创作方法与生产实践，持续分享故事创作、剧本结构、图像提示词、真人摄影质感、人物情绪表演、影视分镜和 AI 视频生成工作流。

扫码关注公众号，获取技能更新、使用案例、提示词方法和创作流程说明。

![船长AI视界公众号二维码](public/wechat-official-account-qr.jpg)

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

本项目由船长AI视界发布，使用 [MIT License](LICENSE)。你可以学习、修改、分发和商用，但需保留“船长AI视界”的原许可与版权声明。
