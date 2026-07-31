# 变更记录

本文件记录影响产品、内容可信度、构建和部署的主要变更，方便后续维护者判断当前状态。
提交哈希对应
[leontinasilva493-glitch/survivearea51](https://github.com/leontinasilva493-glitch/survivearea51)。

## Unreleased

### 文档

- 重写 README，补充项目定位、数据边界、路由、目录、本地运行、验证和部署说明。
- 增加 Cloudflare Workers Git 构建字段、自定义域名步骤和发布交接检查清单。
- 新增本变更记录。

### 修复

- 生产构建缺少 `NEXT_PUBLIC_SITE_URL` 时不再回退到 `localhost`，而是安全回退到
  `https://survivearea51.site`；本地开发仍使用 `http://localhost:3000`。
- 首页 WebSite 结构化数据统一复用站点 URL 配置，并增加生产 URL 回归测试。
- 启用 Next.js `trailingSlash`，使实际路由与 Canonical、Sitemap 和内部链接一致。
- 为所有页面增加 `X-Frame-Options`、`X-Content-Type-Options`、
  `Referrer-Policy` 和 `Permissions-Policy` 基础安全响应头。
- 增加 Next.js 发布配置回归测试。
- 增加 Workers `.assetsignore`，排除不属于本站的本地旧模板游戏目录，
  避免 40.4 MiB PCK 和 41.7 MiB WASM 污染 OpenNext/Wrangler 发布产物。

### 待处理

- 在 Cloudflare Dashboard 核对当前活动版本对应的准确 Git 提交。
- 确认 Workers Observability 能收到生产请求和错误日志。
- 配置 Cloudflare Web Analytics，并验证 RUM Beacon 已注入页面。
- 在 HTTPS 稳定运行后再评估 HSTS 和 CSP，不直接开启 preload。

## 2026-07-31 — Cloudflare Workers 发布准备

提交：`9659789` (`build(cloudflare): add OpenNext Workers release`)

### 新增

- 增加 `open-next.config.ts`。
- 增加 `wrangler.jsonc`，Worker 名称为 `survivearea51`。
- 增加 OpenNext 构建、预览、部署和 Cloudflare 类型生成脚本。
- 将 Next.js 升级到 `16.2.12`，OpenNext Cloudflare 适配器为 `1.20.2`。

### 修复

- 调整 Open Graph 图片和首页布局以兼容新的 Next.js/OpenNext 构建链。
- 增加 ESLint 9 flat config，并收窄 Lint 到当前 MVP 代码。
- 排除不适合上传到 Workers 的旧模板大文件。

### 已验证

- 对提交 `9659789` 的干净克隆完成 `npm ci`。
- 测试、Lint、TypeScript 类型检查和生产依赖审计通过。
- OpenNext 构建生成 `.open-next/worker.js` 和 22 个资源。
- Wrangler dry-run 通过，压缩后上传体积低于 Workers 免费计划的 3 MiB 限制。

### 部署状态

- `https://survivearea51.leontinasilva493.workers.dev/` 当前可以访问，并返回预期站点。
- `https://survivearea51.site/` 已作为 Worker Custom Domain 上线，公共 DNS 和 TLS 正常。
- HTTP 已使用 `301` 转到 HTTPS，`www` 已使用 `301` 转到裸域名。
- `NEXT_PUBLIC_SITE_URL` 已生效，Canonical、Open Graph、Robots 和 Sitemap
  均已切换为 `https://survivearea51.site`。
- 当前活动 Worker 的准确部署提交仍需在 Cloudflare Dashboard 登录后核对。

## 2026-07-30 — 实证型攻略站 MVP

提交：`18b5195` (`feat: launch Survive Area 51 guide MVP`)

### 新增

- 将通用游戏站模板改造为 Area 51 控制终端风格的英文攻略站。
- 增加首页、Gamepasses、Updates 和 Codes 四个可索引 P0 页面。
- 增加 Weapons、Coins/Rebirth 和 Map 三个证据收集页面，并设置
  `noindex, follow`。
- 增加响应式导航、可信度状态标签、结构化数据、Manifest、OG 图片、
  `robots.txt`、`sitemap.xml`、`llms.txt` 和粉丝站免责声明。
- 增加 Roblox Games、Votes 和 Gamepass 官方数据加载。
- 增加 30 分钟服务端缓存、独立端点回退和日期化本地快照。
- 增加评分计算、端点独立回退和完整快照回退测试。

### 内容边界

- 不编造 Codes、武器伤害、金币路线、Rebirth 收益或地图位置。
- Gamepass 官方事实和编辑判断分开呈现。
- 缺少官方描述时明确显示 `Official description not provided.`
- 只有具备足够证据的页面进入 Sitemap 和索引范围。

### 已验证

- `npm test`：3 个测试通过。
- `npm run lint`：通过。
- `npm run typecheck`：通过。
- `npm run build`：通过，生成 14 个 Next.js 路由。
