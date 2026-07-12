# 夙夜 IELTS 学习舱

Vue 3 + TypeScript + Element Plus 的 IELTS G 类冲刺学习应用。

```bash
npm install
npm run dev
npm run type-check
npm run test
npm run build
```

## Vercel

将仓库连接到 Vercel。框架选择 Vite，构建命令为 `npm run build`，输出目录为 `dist`。`vercel.json` 已包含 Vue Router history fallback，因此 `/speaking`、`/letter` 等地址可直接刷新。

学习记录仅存于浏览器 `localStorage`；录音不会上传。
