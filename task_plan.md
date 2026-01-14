# Task Plan: notes.foxtiny.com 个人笔记知识库网站

## Goal
创建一个基于 GitHub Pages 的个人笔记知识库网站，支持 Markdown 转 HTML、按时间排序展示内容、客户端搜索功能，保持简单可维护的长期架构。

## Current Phase
Phase 1

## Phases

### Phase 1: Requirements & Discovery
- [x] 了解用户需求和偏好
- [x] 确定核心功能（笔记库、时间排序、Markdown、搜索）
- [x] 分析现有代码结构
- [x] 记录技术约束和设计原则
- **Status:** completed

### Phase 2: Architecture Design
- [x] 设计 Markdown 到 HTML 的转换方案
- [x] 设计内容组织结构（按时间排序）
- [x] 设计客户端搜索方案（无需后端）
- [x] 规划目录结构和文件命名规范
- [x] 选择必要的工具（Markdown 解析器等）
- **Status:** completed

### Phase 3: Core Infrastructure
- [ ] 创建 package.json 和安装依赖（marked.js）
- [ ] 实现 build.js 构建脚本（读取 MD → 排序 → 转换 → 生成 index.html）
- [ ] 创建示例笔记文件（notes/YYYY-MM-DD.md）
- [ ] 更新 CSS 样式（timeline 样式）
- [ ] 测试构建流程
- **Status:** pending

### Phase 4: Search Implementation
- [ ] 实现客户端搜索功能
- [ ] 创建搜索索引生成器
- [ ] 开发搜索 UI 组件
- [ ] 测试搜索性能和准确性
- **Status:** pending

### Phase 5: Content & Styling
- [ ] 完善 CSS 样式（针对笔记内容优化）
- [ ] 优化 Markdown 内容的渲染样式
- [ ] 创建示例笔记内容
- [ ] 确保移动端适配
- **Status:** pending

### Phase 6: Testing & Documentation
- [ ] 本地测试完整流程
- [ ] 编写使用文档（如何添加新笔记）
- [ ] 测试 GitHub Pages 部署
- [ ] 验证所有功能正常工作
- **Status:** pending

### Phase 7: Delivery
- [ ] 最终代码审查
- [ ] 确保文档完整
- [ ] 部署到 GitHub Pages
- [ ] 交付给用户并说明使用方法
- **Status:** pending

## Key Questions
1. Markdown 转 HTML 使用什么工具？（需要轻量、无需复杂构建）
2. 如何生成搜索索引？（JSON 格式，包含标题、内容、日期）
3. 搜索功能使用什么库？（考虑 Fuse.js 或纯 JS 实现）
4. 如何组织 Markdown 源文件？（按日期命名？独立文件夹？）
5. 构建流程如何自动化？（Node.js 脚本 vs Python 脚本 vs 其他）

## Decisions Made
| Decision | Rationale |
|----------|-----------|
| 用户选择 Markdown 转 HTML | 易于编写，易于维护，符合长期目标 |
| **单页面时间线形式** | **所有笔记整合到首页，滚动浏览，最新在上** |
| **每天一个 MD 文件** | **notes/YYYY-MM-DD.md 格式，简单明了** |
| 按时间倒序展示 | 最新笔记在最上面，符合日记/时间线习惯 |
| 客户端搜索（可选） | 先实现核心功能，搜索作为后续增强 |
| 使用 GitHub Pages | 免费托管，版本控制，简单部署 |

## Errors Encountered
| Error | Attempt | Resolution |
|-------|---------|------------|
| -     | -       | -          |

## Notes
- 已创建基础 HTML/CSS/JS 文件，但需要重新设计以支持 Markdown 工作流
- 需要保持 docs/ 文件夹中的项目原则文档
- 遵循 CLAUDE.md 中的规则：不引入框架，保持简单可读
- 优先考虑长期可维护性而非短期炫技
