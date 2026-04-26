# 「一念」紫微斗数 — 开发路线图

## Phase 1 ✅ 已完成

- [x] 系统架构设计 (ARCHITECTURE.md)
- [x] 排盘引擎 (zwds_calc.py) — 基于 iztro-py
  - [x] 12宫完整星盘
  - [x] 四柱（天干地支）
  - [x] 生年四化
  - [x] 三方四正
  - [x] 空宫判断
- [x] AI解盘Prompt引擎 (ai_reader.py + prompts.py)
  - [x] 三合派系统提示词
  - [x] 飞星派系统提示词
  - [x] 占验派系统提示词
  - [x] 综合（三派合一）提示词
- [x] Telegram格式输出 (formats.py)
- [x] Telegram Bot处理器 (tg_bot_handler.py)
- [x] OpenClaw Skill入口 (zwds_skill_main.py)
- [x] FastAPI后端 (backend/app.py)
  - [x] /api/chart — 排盘
  - [x] /api/reading — 排盘+AI解读
  - [x] /api/palace — 宫位查询
  - [x] /api/star — 星曜查询
  - [x] /api/constants — 常量数据
  - [x] CORS支持
- [x] 知识库 (skill/references/)
  - [x] stars.md — 星曜详解
  - [x] palaces.md — 宫位详解
  - [x] mutagen.md — 四化体系
  - [x] sanhe.md — 三派理论
- [x] 伦理准则 (ETHICS.md)

## Phase 2 — 深度与精细化

- [ ] AI解盘深度优化
  - [ ] 每宫三派并行解读
  - [ ] 流年运势分析（大限+流年）
  - [ ] 合盘（两人命盘对比）
- [ ] 排盘精细化
  - [ ] 飞星四化（宫干飞化）
  - [ ] 自化判断
  - [ ] 特殊格局识别
- [ ] 流年/流月运势推送
- [ ] Telegram Bot交互完善
  - [ ] 按钮交互（Inline Keyboard）
  - [ ] 多轮对话（选宫位 → 看详解）
  - [ ] 用户会话管理

## Phase 3 — 出海与多端

- [ ] Web前端（Next.js + react-iztro）
  - [ ] 星盘可视化
  - [ ] 中文/英文切换
- [ ] 多语言AI解盘
  - [ ] 英文版Prompt模板
  - [ ] 日文版Prompt模板
- [ ] B端API文档与定价
  - [ ] API Key管理
  - [ ] 用量统计
- [ ] SEO + 官网

## Phase 4 — 高级功能

- [ ] 深度学习模型微调（专用解盘模型）
- [ ] 用户数据积累与匿名分析
- [ ] 社群功能
- [ ] 付费订阅
