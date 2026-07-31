# Survive Verity in Area 51 Field Guide

面向 Roblox 游戏 **Survive Verity in Area 51** 的英文实证型攻略站。

项目不是泛化 Wiki，而是玩家决策仪表盘：优先展示 Roblox 官方数据、Gamepass
价格、更新状态和 Codes 核验结果；没有可靠游戏内证据的武器、金币和地图内容会明确
标记为未验证，并保持 `noindex`，不使用推测内容填充页面。

## 项目状态

截至 2026-07-31：

- 源代码：[GitHub - leontinasilva493-glitch/survivearea51](https://github.com/leontinasilva493-glitch/survivearea51)
- Git 分支：`main`
- Cloudflare Worker：`survivearea51`
- 正式地址：[survivearea51.site](https://survivearea51.site/)
- 备用平台地址：[survivearea51.leontinasilva493.workers.dev](https://survivearea51.leontinasilva493.workers.dev/)
- 自定义域名状态：Active，公共 DNS、TLS 和 HTTPS 已验证
- 跳转状态：HTTP 强制转 HTTPS，`www` 以 `301` 转到裸域名
- SEO 域名：Canonical、Open Graph、Robots 和 Sitemap 已使用正式域名

> 正式发布仍需在 Cloudflare Deployments 中核对绿色部署对应的 Git
> 提交；网页能访问不代表最新提交已经上线。

详细历史和后续事项见 [CHANGELOG.md](./CHANGELOG.md)。

## 页面与索引策略

| 路由 | 内容 | 搜索引擎状态 |
| --- | --- | --- |
| `/` | 游戏实时快照、可信度状态和攻略入口 | `index` |
| `/gamepasses/` | 官方 Gamepass 名称、价格和描述 | `index` |
| `/updates/` | Cruelty、Falsity 和游戏标题变化核验 | `index` |
| `/codes/` | 兑换系统和有效 Codes 状态 | `index` |
| `/weapons/` | 武器实测证据收集页 | `noindex, follow` |
| `/coins-rebirth/` | 金币与 Rebirth 实测证据收集页 | `noindex, follow` |
| `/map/` | 地图位置证据收集页 | `noindex, follow` |

`sitemap.xml` 只收录当前允许索引的四个 P0 页面。

## 数据与内容原则

- Roblox Universe ID：`10455462279`
- Roblox Place ID：`74716719697996`
- 服务端分别请求 Roblox Games、Votes 和 Gamepass 官方接口。
- 官方数据缓存 30 分钟，单个接口失败时独立回退到
  `data/roblox-snapshot.ts` 的最近快照。
- 官方事实、官方预告、实测数据、社区报告和未验证内容使用不同状态标签。
- Gamepass 官方事实与编辑判断分开；官方没有描述时显示
  `Official description not provided.`
- 不发布虚构 Codes、武器伤害、金币效率、Rebirth 收益或地图位置。

## 技术栈

- Next.js 16.2.12 App Router
- React 18
- TypeScript
- Tailwind CSS
- OpenNext for Cloudflare
- Cloudflare Workers + Wrangler
- Roblox 官方 API

## 目录说明

```text
app/                         Next.js 页面、SEO、Manifest 和 OG 图片
components/home/             首页仪表盘
components/site/             Header、Footer、状态标签和结构化数据
config/site.ts               站点名称、域名、Canonical 和元数据
data/roblox-snapshot.ts      官方接口失败时使用的本地快照
lib/roblox.ts                Roblox 数据请求、缓存、回退和评分逻辑
tests/                       数据单测和浏览器烟雾测试
docs/superpowers/            MVP 设计和实施计划
open-next.config.ts          OpenNext Cloudflare 配置
wrangler.jsonc               Cloudflare Worker 配置
```

仓库外层的 `MVP执行文档.txt` 是产品需求基线；模板只作为技术基础，不作为内容事实来源。

## 本地运行

### 前置条件

- Node.js `>= 20.9.0`
- npm
- Windows PowerShell、WSL 或其他终端

### 启动开发服务器

```powershell
git clone https://github.com/leontinasilva493-glitch/survivearea51.git
Set-Location survivearea51
npm ci
Copy-Item .env.example .env.local
npm run dev
```

浏览器访问 [http://localhost:3000](http://localhost:3000)。

如果 `3000` 端口被占用：

```powershell
npm run dev -- -p 3101
```

然后访问 [http://localhost:3101](http://localhost:3101)。

## 环境变量

| 变量 | 是否必需 | 用途 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 生产环境必需 | Canonical、Sitemap、Open Graph 和结构化数据的站点根地址 |
| `NEXT_PUBLIC_CONTACT_EMAIL` | 否 | 站点联系邮箱；未配置时不展示 |

本地 `.env.local` 示例：

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_CONTACT_EMAIL=
```

正式域名未启用前，Cloudflare 环境可暂时使用：

```env
NEXT_PUBLIC_SITE_URL=https://survivearea51.leontinasilva493.workers.dev
```

自定义域名启用后应改为：

```env
NEXT_PUBLIC_SITE_URL=https://survivearea51.site
```

修改该变量后需要重新构建部署，已有 HTML 中的 Canonical 不会自动更新。

## 常用命令

| 命令 | 作用 |
| --- | --- |
| `npm run dev` | 启动本地开发服务器 |
| `npm test` | 运行 Roblox 数据逻辑单测 |
| `npm run lint` | 检查当前项目代码 |
| `npm run typecheck` | 运行 TypeScript 类型检查 |
| `npm run build` | 只执行 Next.js 构建，输出 `.next` |
| `npm run adapter:build` | 构建 Cloudflare Worker，输出 `.open-next` |
| `npm run preview` | 构建并本地预览 Cloudflare 版本 |
| `npm run deploy` | 构建 OpenNext 产物并部署到 Cloudflare |
| `npm run cf-typegen` | 根据 Wrangler 配置生成 Cloudflare 类型 |

> `npm run build` 不能单独生成 Cloudflare 部署产物。发布前必须执行
> `npm run adapter:build` 或直接执行 `npm run deploy`。

## 本地验证

日常改动建议依次运行：

```powershell
npm test
npm run lint
npm run typecheck
npm run build
```

涉及 Cloudflare 发布时还要运行：

```powershell
npm run adapter:build
npx wrangler deploy --dry-run
```

浏览器回归脚本位于 `tests/e2e_smoke.py`。

OpenNext 在原生 Windows 上可能出现文件复制或兼容问题。正式打包优先使用 WSL、
Linux 或 Cloudflare Workers Builds；不要因为 `.next` 构建成功就跳过
`.open-next/worker.js` 检查。

## Cloudflare Workers 部署

### 部署类型

项目是 **Next.js + OpenNext + Cloudflare Workers**，不是 Pages 静态站：

- Worker 入口：`.open-next/worker.js`
- 静态资源：`.open-next/assets`
- Worker 名称：`survivearea51`
- 配置文件：`wrangler.jsonc`
- URL 规范：内容页使用尾部 `/`
- 基础安全响应头：`X-Frame-Options`、`X-Content-Type-Options`、
  `Referrer-Policy` 和 `Permissions-Policy`

### 本地命令行部署

登录 Cloudflare 后执行：

```powershell
npm ci
npm run deploy
```

部署后先验证 `workers.dev`，再处理 Custom Domain、公共 DNS、TLS 和外部 HTTPS。

### Cloudflare Git 自动构建配置

Cloudflare Dashboard 中应使用以下字段：

```text
Build command:   npm run adapter:build
Deploy command:  npx wrangler deploy
Version command: npx wrangler versions upload
Root directory:  /
Production branch: main
```

如果日志仍出现以下组合，说明控制台仍在使用旧配置：

```text
Executing user build command: npm run build
Could not find compiled Open Next config
```

修改位置：

```text
Workers & Pages
→ survivearea51
→ Settings
→ Build
→ Build configuration
```

保存后触发一次新的 `main` 构建，并在日志中确认实际执行的是
`npm run adapter:build`。

### 自定义域名

`survivearea51.site` 已经作为 Worker Custom Domain 上线。以下是后续迁移
或重建环境时的恢复步骤：

不要只在 DNS 页面手动创建指向 `workers.dev` 的记录。应从 Worker 添加：

```text
Workers & Pages
→ survivearea51
→ Domains / Domains & Routes
→ Add
→ Custom Domain
→ survivearea51.site
```

完成后应分别确认：

1. Worker 域名状态为 Active。
2. 公共 DNS 能解析 `survivearea51.site`。
3. Cloudflare TLS 证书生效。
4. `https://survivearea51.site/` 返回 `200`。
5. Canonical、Sitemap 和 Open Graph URL 已切换到正式域名。

## 发布交接检查清单

- [ ] GitHub `main` 包含要发布的提交。
- [ ] `npm ci`、测试、Lint 和类型检查通过。
- [ ] `.open-next/worker.js` 已生成。
- [ ] `npx wrangler deploy --dry-run` 通过。
- [ ] Cloudflare Git 构建使用 `npm run adapter:build`。
- [ ] `workers.dev` 返回预期页面。
- [ ] `survivearea51.site` 已作为 Worker Custom Domain 绑定。
- [ ] 公共 DNS、TLS、HTTP 跳转和外部 HTTPS 验证通过。
- [ ] `NEXT_PUBLIC_SITE_URL` 指向最终正式域名。
- [ ] `robots.txt`、`sitemap.xml`、Canonical 和 Open Graph 使用正式域名。
- [ ] 内容页的 Canonical、Sitemap 和实际 URL 尾部斜杠一致。
- [ ] 生产响应包含基础安全头。

## 免责声明

这是非官方粉丝站，不隶属于 Roblox Corporation、Mochi Productions! 或 Verity
相关创作者。
