# Findings & Decisions

## Requirements
<!-- 从用户需求收集 -->
- **网站类型**：个人笔记/知识库
- **内容组织**：按时间排序（最新在前）
- **内容创建**：使用 Markdown 编写，转换为 HTML
- **核心功能**：客户端搜索（无需后端）
- **托管方式**：GitHub Pages
- **设计原则**：
  - 简单、快速、可读
  - 内容优先
  - 无重型前端框架
  - 无后端
  - 无复杂构建流程
  - 每个页面应该在没有 JavaScript 的情况下也能工作
  - 易于长期扩展

## Research Findings
<!-- 关键发现 -->
- **现有文件结构**：
  - 已有 `docs/00_context.md` 和 `docs/01_principles.md` 定义项目原则
  - 已有 `CLAUDE.md` 定义开发规则
  - 已创建基础 `index.html`, `about/index.html`, `assets/style.css`, `assets/main.js`
  - 目录结构遵循扁平化、可预测的原则

- **现有代码分析**：
  - **HTML 结构**：简洁的语义化 HTML，包含 header/nav/main/footer 结构
  - **导航**：双页面结构（Home + About），导航链接使用绝对路径
  - **CSS**：极简主义设计，使用系统字体，最大宽度 800px 居中布局，移动端响应式
  - **JavaScript**：仅用于增强体验（当前页高亮），不影响核心功能
  - **笔记列表**：index.html 已有 `.note-list` 结构，展示时间和标题
  - **样式特点**：清晰的排版层次，良好的可读性，边距和留白合理

- **技术约束**：
  - 不能使用需要服务器端渲染的框架
  - 避免 npm 包管理和复杂构建工具（除非绝对必要）
  - 优先使用浏览器原生功能
  - 保持依赖最小化

- **待解决问题**：
  1. 如何从 Markdown 文件生成 HTML？（需要构建脚本）
  2. Markdown 源文件应该放在哪里？（可能需要 `posts/` 或 `notes/` 文件夹）
  3. 如何自动更新首页的笔记列表？
  4. 如何生成搜索索引？

## Technical Decisions (Updated)
| Decision | Rationale |
|----------|-----------|
| **Markdown 解析器**：**marked.js** | 轻量（~30KB）、零依赖、支持 GFM、速度快 |
| **构建脚本**：**Node.js + build.js** | 简单脚本，本地运行，生成静态 HTML |
| **部署方式**：**本地构建 → 推送** | 本地运行 build.js，推送生成文件到 GitHub |
| **GitHub Pages 设置**：**main 分支根目录** | 直接从 main 分支部署，无需 gh-pages 分支 |
| **搜索实现**：**可选功能**（Phase 4） | 先实现核心功能，搜索作为增强功能 |
| **内容文件组织**：`notes/YYYY-MM-DD.md` | 每天一个文件，文件名即日期，简单明了 |
| **输出方式**：**单页面 timeline** | 所有笔记整合到 index.html，无需独立页面 |
| **排序方式**：**文件名倒序** | 最新日期的文件排在最前面 |
| **Frontmatter**：**可选** | 可以纯 Markdown，也可以添加 frontmatter（tags 等） |
| **资源路径**：**绝对路径（/assets/...）** | 确保 GitHub Pages 正确加载资源 |

## Issues Encountered
| Issue | Resolution |
|-------|------------|
| -     | -          |

## Architecture Design (Updated)

### 核心概念
- **每天一个 Markdown 文件**（notes/YYYY-MM-DD.md）
- **所有笔记整合到首页**：单页面时间线，滚动浏览
- **按时间倒序排列**：最新笔记在最上面
- **无独立笔记页面**：简化结构，减少文件数量

### 文件夹结构（GitHub Pages 兼容）
```
/
├── index.html              # 📄 生成的首页（所有笔记的时间线）- 推送到 GitHub
├── about/
│   └── index.html          # 📄 关于页面 - 推送到 GitHub
├── notes/                  # 📝 Markdown 源文件（每天一个）- 推送到 GitHub
│   ├── 2026-01-14.md
│   ├── 2026-01-15.md
│   └── 2026-01-16.md
├── assets/                 # 📦 静态资源 - 推送到 GitHub
│   ├── style.css
│   ├── main.js
│   └── search-index.json   # 搜索索引（可选）
├── docs/                   # 📚 项目文档 - 推送到 GitHub
├── build.js                # 🔧 构建脚本 - 推送到 GitHub（本地运行）
├── package.json            # 📦 Node.js 依赖 - 推送到 GitHub
├── .gitignore              # 忽略 node_modules/
├── CLAUDE.md
└── README.md
```

**GitHub Pages 部署说明**：
- ✅ 所有生成的 HTML/CSS/JS 文件推送到仓库
- ✅ Markdown 源文件也推送（用于版本控制）
- ✅ 构建在**本地完成**，不在 GitHub 上构建
- ❌ node_modules/ 不推送（通过 .gitignore 忽略）

### 构建流程（本地 → GitHub Pages）

**本地开发流程**：
1. 编写 `notes/YYYY-MM-DD.md` 笔记
2. 运行 `node build.js` 生成 index.html
3. `git add . && git commit -m "Add note" && git push`
4. GitHub Pages 自动部署（1-2 分钟）

**build.js 处理步骤**：
1. 读取 `notes/*.md` 所有文件
2. 解析 Markdown（可选 frontmatter）
3. 按文件名（日期）倒序排序
4. 使用 marked.js 转换 Markdown → HTML
5. 生成 index.html（包含所有笔记内容）
6. （可选）生成搜索索引

**关键点**：
- ✅ 构建脚本在**本地运行**，不在 GitHub 上运行
- ✅ 推送**构建后的 index.html** 到 GitHub
- ✅ GitHub Pages 直接托管静态 HTML 文件
- ✅ 无需服务器端处理，纯静态网站

### index.html 结构
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>notes.foxtiny.com</title>
    <link rel="stylesheet" href="/assets/style.css">
</head>
<body>
    <header>
        <nav>
            <a href="/">Home</a>
            <a href="/about/">About</a>
        </nav>
    </header>

    <main class="timeline">
        <!-- 每天的笔记作为一个 article -->
        <article class="note-entry">
            <time datetime="2026-01-16">2026-01-16</time>
            <div class="note-content">
                <!-- Markdown 转换后的 HTML 内容 -->
            </div>
        </article>

        <article class="note-entry">
            <time datetime="2026-01-15">2026-01-15</time>
            <div class="note-content">
                <!-- Markdown 转换后的 HTML 内容 -->
            </div>
        </article>

        <!-- 更多笔记... -->
    </main>

    <footer>
        <p>&copy; 2026 notes.foxtiny.com</p>
    </footer>

    <script src="/assets/main.js"></script>
</body>
</html>
```

### Markdown 文件格式（简化版）
```markdown
# 2026-01-14

今天学习了 JavaScript 的闭包概念。

## 关键要点
- 闭包可以访问外部函数的变量
- 常用于数据封装

例子：
\`\`\`javascript
function counter() {
  let count = 0;
  return () => ++count;
}
\`\`\`

---

下午读了一篇关于 CSS Grid 的文章，很有收获。
```

**或者使用 frontmatter（可选）**：
```markdown
---
date: 2026-01-14
tags: [javascript, css]
---

今天学习了 JavaScript 的闭包概念...
```

### 搜索索引格式（简化）
```json
{
  "notes": [
    {
      "date": "2026-01-16",
      "content": "全文内容或摘要...",
      "tags": []
    },
    {
      "date": "2026-01-15",
      "content": "全文内容或摘要...",
      "tags": []
    }
  ]
}
```

## Resources
<!-- 有用的资源链接 -->
- GitHub Pages 文档: https://docs.github.com/pages
- marked.js: https://marked.js.org/
- gray-matter (frontmatter 解析): https://github.com/jonschlinkert/gray-matter

## Visual/Browser Findings
<!-- 视觉/浏览器发现 -->
- 目前无需浏览器操作

---
*Update this file after every 2 view/browser/search operations*
