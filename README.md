# Survive Verity in Area 51 Field Guide

一个面向 Roblox 游戏 **Survive Verity in Area 51** 的英文实证型攻略站。

网站不是泛化 Wiki，而是玩家决策仪表盘：展示 Roblox 官方实时数据、Gamepass
价格、更新状态和 Codes 核验结果，并把没有游戏内证据的武器、金币和地图内容保持为
`noindex`，不编造数值或位置。

## 当前页面

- `/`：实时游戏快照和攻略入口
- `/gamepasses/`：官方 Gamepass 名称与 Robux 价格
- `/updates/`：Cruelty、Falsity 和标题变化核验
- `/codes/`：兑换系统和有效 Codes 状态
- `/weapons/`：武器实测收集页，当前 `noindex`
- `/coins-rebirth/`：金币与 Rebirth 实测收集页，当前 `noindex`
- `/map/`：地图证据收集页，当前 `noindex`

## 技术栈

- Next.js 13.5.11 App Router
- React 18 + TypeScript
- Tailwind CSS
- Roblox 官方 Games、Votes 和 Gamepass API

## 本地运行

```powershell
npm ci
npm run dev
```

浏览器访问 `http://localhost:3000`。如果端口被占用：

```powershell
npm run dev -- -p 3101
```

## 环境变量

复制 `.env.example` 为 `.env.local`：

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.example
```

未配置时，本地 Canonical 和 Sitemap 使用 `http://localhost:3000`。部署前必须设置真实域名。

## 数据可靠性

- Roblox 官方请求在服务端执行，缓存 30 分钟。
- 单个官方接口失败时使用 `data/roblox-snapshot.ts` 的最近快照。
- 官方事实、官方预告、实测数据、社区报告和未验证内容使用不同状态标签。
- 不发布虚构 Codes、武器伤害、金币效率或地图位置。

## 验证

```powershell
npm test
npm run lint
npm run typecheck
npm run build
```

浏览器回归脚本位于 `tests/e2e_smoke.py`。

## 免责声明

这是非官方粉丝站，不隶属于 Roblox Corporation、Mochi Productions! 或 Verity
相关创作者。
