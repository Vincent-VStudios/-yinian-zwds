<p align="center">
  <img src="https://img.shields.io/badge/Version-v2.1.0-gold" alt="Version">
  <img src="https://img.shields.io/badge/Python-3.10%2B-blue" alt="Python">
  <img src="https://img.shields.io/badge/Next.js-15-black" alt="Next.js">
  <img src="https://img.shields.io/badge/license-MIT-green" alt="License">
  <img src="https://img.shields.io/badge/OpenClaw-Skill-8A2BE2" alt="OpenClaw">
</p>

<h1 align="center">🔮 Yinian Zi Wei Dou Shu · Yinian ZWDS</h1>

<p align="center">
  <b>San He · Fei Xing · Zhan Yan ·</b> AI-powered Zi Wei Dou Shu deep reading system
</p>

<p align="center">
  <i>From chart casting to deep reading — yearly, monthly, daily fortune, compatibility matching, name analysis, Telegram Bot, Web visualization, 6-language support</i>
</p>

<br>

---

## 📖 About

**Yinian ZWDS** is a production-grade AI Zi Wei Dou Shu system built for the "Yinian" (一念) platform. It combines traditional Three-School methodology (San He / Fei Xing / Zhan Yan) with modern LLM AI to deliver structured, in-depth astrolabe readings.

### Why Yinian ZWDS?

Most Zi Wei Dou Shu apps suffer from three problems:

| Problem | Traditional Solutions | Yinian ZWDS |
|---|---|---|
| **Reading Depth** | Template-based, repetitive | 4-layer Prompt architecture, personalized AI reading |
| **School Limitation** | One school only | Three-school fusion (San He + Fei Xing + Zhan Yan) |
| **Internationalization** | Chinese only | 6 languages with full English AI reading |
| **Accessibility** | Closed apps | Telegram Bot + Web + REST API |
| **AI Capability** | Outdated rule engines | DeepSeek / Claude / GPT multi-model |

### Who It's For

- **C-end users**: Get AI deep readings via Telegram Bot or Web
- **B-end developers**: Integrate chart data and AI readings via REST API
- **Cultural researchers**: Reference tool for Zi Wei Dou Shu study

---

## ✨ Features

| Feature | Status | Description |
|:---|---:|:---|
| 🎯 **Solar Chart** | ✅ Stable | iztro-py engine, precise to Chinese hour, 1900-2100 |
| 🎯 **Lunar Chart** | ✅ Stable | Lunar calendar input with leap month handling |
| 📖 **Text Reading** | ✅ Stable | 12-palace reading with 3-square relationships + star brightness |
| 🤖 **AI Deep Reading** | ✅ Stable | 4-layer Prompt architecture, DeepSeek API, 2300+ character output |
| 📅 **Yearly Forecast** | ✅ Stable | 5-dimension yearly analysis (career/wealth/relationships/health/advice) |
| 🌙 **Monthly Forecast** | ✅ Stable | 3-dimension monthly analysis |
| ☀️ **Daily Fortune** | ✅ Stable | Daily push based on day-branch + hour activation |
| 💞 **Compatibility Match** | ✅ Stable | 5-dimension scoring (life palace/marriage/4-transforms/5-elements/spirit) |
| 📛 **Name Analysis** | ✅ Stable | Character decomposition + 5-grid numerology + 5-element analysis |
| 🌐 **English Reading** | ✅ Stable | Full English 4-layer AI deep reading |
| ⭐ **Star Encyclopedia** | ✅ Stable | 14 major stars + auxiliary stars reference |
| 🖥️ **Web Visualization** | ✅ Stable | react-iztro SVG chart + name analysis, dark theme |
| 🔧 **REST API** | ✅ Stable | 5 API endpoints, multi-model parameters |

### Roadmap

```
⬜ Name analysis + astrolabe combined AI reading
⬜ Accurate yearly/monthly/daily algorithm (ZWDS + Bazi cross-reference)
⬜ Scheduled daily fortune push (Cron Job)
⬜ User system & subscription (C-end monetization)
⬜ Korean / Vietnamese translations
⬜ Compatibility report AI deep reading
⬜ Historical chart saving & comparison
⬜ Enterprise API usage tracking & billing
```

---

## 🚀 Quick Start

### Requirements

- **Python:** 3.10+
- **Node.js:** 18+
- **API Key:** DeepSeek API Key recommended

### Step 1: Install Engine

```bash
pip install iztro-py==0.3.4
```

### Step 2: Test Chart Casting

```bash
python3 -c "
from zwds_calc import generate_astrolabe, format_astrolabe
r = generate_astrolabe('2000-8-16', 6, 'male')
print(format_astrolabe(r))
"
```

Expected output:
```
📅 Four Pillars: 庚辰 甲申 丙午 甲午
🐲 Zodiac: Dragon  Element: Earth 5 Bureau
🏠 Life Palace: Life

⚡ Birth Year Transformations
  · Children: Sun -> Wealth
  · Wealth: Military -> Authority
  · Parents: Moon -> Excellence
  · Health: Harmony -> Taboo
...
```

### Step 3: Configure API Key

```bash
export DEEPSEEK_API_KEY="sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

Or in `~/.openclaw/openclaw.json`:
```json
{
  "models": { "providers": { "deepseek": { "apiKey": "sk-xxxx" } } }
}
```

### Step 4: Start Web Frontend

```bash
cd web
npm install
npx next dev -p 3001
# Open http://localhost:3001
```

### Step 5: Start Backend API

```bash
cd backend
python3 app.py
# API running at http://localhost:8008
```

---

## 📱 Telegram Bot Commands

### Chart Casting

**`/zwds`** — Solar chart + text reading

```
/zwds 1984-6-22 6 male
/zwds 1984-6-22 6 male SanHe   ← Specify school
/zwds 1984-6-22 6 male --deep  ← Chart + AI reading
```

**`/zwds_lunar`** — Lunar chart

```
/zwds_lunar 2000-7-17 6 male
```

### AI Reading

**`/reading`** — 4-layer AI deep reading (core feature)

```
/reading 1984-6-22 6 male
```
→ 2300+ character reading: life overview → 12 palaces → transformations → patterns → decadal → yearly(5 dims) → monthly(3 dims)

**`/yearly`** — Yearly fortune

```
/yearly 1984-6-22 6 male
/yearly 1984-6-22 6 male 2027   ← Specify year
```

**`/monthly`** — Monthly fortune

```
/monthly 1984-6-22 6 male
/monthly 1984-6-22 6 male 2026 5
```

**`/daily`** — Daily fortune

```
/daily 1984-6-22 6 male
```

### Name Analysis

**`/name`** — Chinese name character analysis

```
/name 南曦
/name 李白
```

Output:
```
📛 *Name Analysis · Nan Xi*

✍️ *Character Decomposition*
▪ **南(South)**: Radical「十」9 strokes, Element【Fire】
  Meaning: South (top-bottom structure)
▪ **曦(Sunrise)**: Radical「日」20 strokes, Element【Fire】
  Meaning: Morning sunlight (left-right structure)

📊 *Five Grid Numerology*
▪ ⚠️ Heaven: 10 — Unlucky
▪ ✅ Personality: 29 — Auspicious
▪ ✅ Earth: 21 — Auspicious
▪ ✅ Outer: 1 — Auspicious
▪ ✅ Total: 29 — Auspicious
▪ 🔮 Three Talents: Personality【Fire】× Earth【Fire】→ Same

📜 Cultural reference, view rationally
```

### Compatibility Matching

**`/match`** — Compatibility analysis

```
/match 2000-8-16 6 male / 1995-3-20 8 female
```

### Star Encyclopedia

**`/star`** — Star lookup

```
/star ZiWei
/star PoJun
```

### Command Quick Reference

```
/zwds        Chart casting + text reading
/reading     4-layer AI deep reading         ⭐ Core
/yearly      Yearly fortune
/monthly     Monthly fortune
/daily       Daily fortune                    🔥
/name        Name character analysis          🆕
/match       Compatibility matching           💞
/read_en     English AI reading               🌐
/star        Star encyclopedia
/help        Help
/about       About
```

---

## 🖼️ Demo Outputs

### Demo 1: Chart Casting

`/zwds 1984-6-22 6 male`:

```
🔮 Yinian ZWDS · Chart Reading

📅 Four Pillars: 甲子 庚午 丁亥 丙午
🐲 Zodiac: Rat  Element: Water 2 Bureau
🏠 Life Palace: Zi

⚡ Birth Year Transformations
  · Career: LianZhen->Wealth
  · Fortune: PoJun->Authority
  · Wealth: WuQu->Excellence
  · Children: TaiYang->Taboo

📋 Twelve Palaces
▪ Life (丙子): ZiWei (Normal)
▪ Parents (丁丑): Empty Palace · TianKui TuoLuo
▪ Fortune (丙寅): PoJun(Authority) LuCun TianMa
▪ Property (辛巳): Empty Palace · QingYang
▪ Career (庚辰): LianZhen(Taboo) TianFu WenChang LingXing
▪ Associates (己卯): TaiYin(Taboo) DiKong DiJie
▪ Travel (癸未): TanLang(Sharp) YouBi
▪ Health (壬午): TianTong JuMen TianYue
▪ Wealth (戊午): WuQu(Excellence) TianXiang ZuoFu HuoXing
▪ Children (壬戌): TaiYang(Taboo) TianLiang
▪ Marriage (甲戌): QiSha WenQu
▪ Siblings (乙亥): TianJi
```

### Demo 2: AI Deep Reading

`/reading 1984-6-22 6 male` (AI summary excerpt):

> **Life Pattern**
> This is a mixed 'ZiFuXiangLianWu' and 'ShaPoLang' pattern. ZiWei Emperor sits in the Life Palace suggesting a steady character, but TanLang, QiSha, PoJun in the 3-square indicate an inner drive for change and breakthroughs. Wealth Palace has WuQu TianXiang — stable wealth accumulation with sudden turns from HuoXing. Career Palace LianZhen(Wealth) with TianFu promises career expansion but with interpersonal intrigue.
>
> **Decadal Fortune**: Current decadal in Career Palace (age 42-51) — the golden decade of career. LianZhen(Wealth) + TianFu, seize opportunities.
>
> **Origin Palace**: Marriage Palace (甲戌) QiSha + WenQu — life trajectory dominated by partnerships.

### Demo 3: Compatibility Match

```
💞 ZWDS · Compatibility Match

Person A                Person B
📅 Element: Water 2     📅 Element: Wood 3
🏠 Life: ZiWei(Norm)    🏠 Life: WuQu(Str)+TianXiang(Str)
Marriage: QiSha(Str)    Marriage: TianTong(Str)

Overall: 80/100 ▓▓▓▓▓▓▓▓░░  Compatible ✓

▪ Elements: Water × Wood → Generates (complementary)
▪ Marriage: QiSha × TianTong → Yin-Yang balance
▪ Transforms: No intersection → natural chemistry

📜 Cultural reference, view rationally
```

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────┐
│                 User Entry                     │
│  Telegram Bot     Web (Next.js)               │
│  (OpenClaw)       localhost:3001              │
│                    REST API                    │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│              OpenClaw Skill Router              │
│  zwds_skill_main.py → tg_bot_handler.py        │
│                      → yinian_zwds.py           │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│              Business Logic                     │
│  Chart Engine      AI Engine     Matching      │
│  (iztro-py)     (DeepSeek/CLAUDE/GPT)          │
│  12 Palaces     4-Layer Prompt 5-Dim Score      │
│  4 Transforms   Daily Fortune  Name Analysis    │
│  Decadal        Int'l (6 lang)                  │
└──────────────────────┬───────────────────────┘
                       │
┌──────────────────────▼───────────────────────┐
│              Data Layer                          │
│  Reference Docs    iztro-py Engine              │
│  (stars/palaces)   DeepSeek API                 │
└──────────────────────────────────────────────────┘
```

### Key Design Decisions

#### 1. Dual Engine Strategy

| Engine | Where | Used For | Advantage |
|---|---|---|---|
| iztro-py (Python) | Backend | Telegram Bot / API | Easy AI integration |
| iztro (JS) | Frontend | Web viz | Zero backend dependency |

#### 2. Palace Index Mapping (Critical)

iztro-py returns palaces in fixed earthly branch order (寅=0...丑=11). ZWDS standard order starts from Life Palace going counter-clockwise:

```python
soul_iztro_idx = BRANCH_TO_INDEX[soul_branch]
for i in range(12):
    raw_idx = (soul_iztro_idx + i) % 12  # counter-clockwise
    zwds_palaces[i] = iztro_palaces[raw_idx]
```

#### 3. AI Model Comparison

| Factor | DeepSeek | Claude | GPT |
|---|---|---|---|
| China direct | ✅ Yes | ❌ Proxy | ❌ Proxy |
| Chinese ZWDS | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| Cost | Very low | High | High |

---

## 🧠 AI Deep Reading System

### 4-Layer Prompt Architecture

#### Layer 1: Foundation — 12 Palace Detail

Each palace tells AI: stem-branch + main star + brightness + transformation + auxiliary stars + 3-square

#### Layer 2: Advanced — Transformations + Patterns + Palace Relations

Tells AI: 4-transform distribution → causality chain → pattern meaning → palace interaction

#### Layer 3: Temporal — Time Dimension

```
Current Decade: Career (42-51) LianZhen(Wealth)+TianFu
2026 Yearly: Travel Palace TanLang activated
  · Career: Cross-border opportunities
  · Wealth: Mentor help, stay cautious
  · Love: Romantic energy, avoid entanglement
  · Health: Watch liver/gallbladder
  · Advice: Leverage network, steady progress
```

#### Layer 4: Professional — Origin + Body-Use

```
Origin Palace: Marriage (甲戌) QiSha + WenQu
→ Life thread in partnerships

Body-Use Analysis:
  Body=Life (ZiWei Normal) → stable nature needs spark
  Use=Career (LianZhen+TianFu) → flexibility + stability
```

### Quality Standards

```
✔ Life pattern overview      100-200 chars
✔ 12 palaces detail          1200-1800 chars
✔ Transformation analysis    200-300 chars
✔ Special patterns           100-200 chars
✔ Decadal fortune            200-300 chars
✔ Origin + Body-Use analysis 200-300 chars
✔ Yearly 5-dimensions        150-200 chars
✔ Monthly 3-dimensions       100-150 chars
────────────────────────────────────────
Total: ~2300-3500 characters
```

---

## 💞 Compatibility Matching Engine

### 5-Dimension Scoring

#### Dimension 1: Life Palace Interaction

| A Life | B Life | Relation | Score |
|---|---|---|---|
| ZiWei | WuQu+TianXiang | Emperor likes General support | +10 |

#### Dimension 2: Marriage Resonance

| A Marriage | B Marriage | Relation | Score |
|---|---|---|---|
| QiSha | TianTong | Strength × Gentleness | +15 |

#### Dimension 3: 4-Transform Intersection

```
A: LianZhen(Wealth, Career) PoJun(Authority, Fortune)
B: TaiYang(Wealth, Travel) WuQu(Authority, Life)
→ WuQu + TaiYang activated, mild resonance → +5
```

#### Dimension 4: Element Compatibility

| A Element | B Element | Relation | Score |
|---|---|---|---|
| Water | Wood | Water breeds Wood | +10 |
| Metal | Fire | Fire conquers Metal | -5 |

#### Dimension 5: Spirit Palace

| A Spirit | B Spirit | Relation | Score |
|---|---|---|---|
| PoJun(Authority)+LuCun+TianMa | TianTong | Change × Comfort, need balance | 0 |

#### Scoring Formula

```python
def _compute_score(dimensions):
    score = 60  # base
    if both_marriage_not_empty: score += 10
    if common_transformations: score += 10
    if element_compatible: score += 10
    if element_conflict: score -= 5
    return max(0, min(100, score))
```

---

## 🌐 Internationalization

### Supported Languages

| Language | Status | Coverage |
|:---|---:|:---|
| 🇨🇳 **简体中文** zh-CN | ✅ Full | All features (default) |
| 🇹🇼 **繁體中文** zh-TW | ✅ Full | Stars/Palaces/UI |
| 🇺🇸 **English** en-US | ✅ Full | All + English prompts |
| 🇯🇵 **日本語** ja-JP | ✅ Basic | Stars/Palaces/UI + prompts |
| 🇰🇷 **한국어** ko-KR | ✅ Basic | Stars/Palaces/UI |
| 🇻🇳 **Tiếng Việt** vi-VN | ✅ Basic | Stars/Palaces/UI |

### Translation Architecture

```python
PALACE_NAMES = {
    "命宫": {
        "zh-CN": "命宫", "en-US": "Life",
        "ja-JP": "命宮", "ko-KR": "명궁", "vi-VN": "Mệnh cung",
    },
}

def t(key, lang="zh-CN"):
    return DICT[key].get(lang, key)
```

---

## 🖥️ Web Visualization

### Tech Stack

| Tech | Version | Purpose |
|---|---|---|
| Next.js | 15 | App Router framework |
| react-iztro | 1.4.2 | SVG chart rendering |
| iztro | 2.5.8 | Browser-side chart engine |
| TypeScript | 5.x | Type safety |

### Features

- **Dark theme**: Gradient purple background, warm gold text
- **Form input**: Year/Month/Day/Hour dropdown + Gender toggle
- **📛 Name input**: Optional field, real-time character decomposition (browser-side)
- **One-click chart**: Click "📿" to render SVG astrolabe
- **Name analysis panel**: Per-character card (radical/strokes/element/meaning) + 5-grid numerology
- **Decadal/Yearly toggle**: Checkboxes overlay time info on chart
- **Copy info**: One-click copy Four Pillars/Element/Life Palace
- **Mobile responsive**: Adaptive layout

### Start

```bash
cd web
npm install
npx next dev -p 3001
# Open http://localhost:3001
```

---

## 🔧 REST API

All endpoints at `http://localhost:8008`:

| Endpoint | Method | Params | Returns |
|---|---|---|---|
| `/chart` | POST/GET | date, hour, gender, is_lunar | Astrolabe JSON |
| `/reading` | POST | date, hour, gender | AI deep reading text |
| `/match` | POST | person_a, person_b | Match score + AI prompt |
| `/daily` | POST | date, hour, gender | Daily fortune text |
| `/name` | POST | name | Character decomposition + 5-grid numerology |

### `/chart` Response Example

```json
{
  "success": true,
  "astrolabe": {
    "four_pillars": "甲子 庚午 丁亥 丙午",
    "soul_palace": "命宫",
    "body_palace": "命宫",
    "element": "水二局",
    "birthday": "1984-6-22",
    "palaces": [
      {"name": "命宫", "stars": ["紫微"], "brightness": "平"}
    ]
  }
}
```

### `/name` Response Example

```json
{
  "success": true,
  "name": "南曦",
  "chars": [
    {"char": "南", "radical": "十", "strokes": 9, "element": "火", "meaning": "南方"},
    {"char": "曦", "radical": "日", "strokes": 20, "element": "火", "meaning": "阳光"}
  ],
  "wuge": {
    "tiange": {"num": 10, "jixiong": "凶"},
    "renge": {"num": 29, "jixiong": "大吉"},
    "dige": {"num": 21, "jixiong": "大吉"},
    "zongge": {"num": 29, "jixiong": "大吉"}
  }
}
```

---

## 📋 Project Structure

```
yinian-zwds/
├── README.md                    # 中文文档 (Chinese)
├── README_EN.md                 # English documentation
├── LICENSE                      # MIT
├── .gitignore
├── ARCHITECTURE.md              # Architecture documentation
├── ROADMAP.md                   # Roadmap
│
├── skill/                       # OpenClaw Skill
│   ├── SKILL.md                 # Skill definition
│   ├── ETHICS.md                # Ethics statement
│   ├── references/              # Knowledge base
│   │   ├── stars.md             # Star encyclopedia (14 majors + auxiliaries)
│   │   ├── palaces.md           # 12 palaces reference
│   │   ├── mutagen.md           # 4-transformations theory
│   │   └── sanhe.md             # San He school reference
│   └── scripts/                 # Core Python modules
│       ├── zwds_skill_main.py   # Skill entry + routing
│       ├── tg_bot_handler.py    # Telegram command parsing & dispatch
│       ├── zwds_calc.py         # Chart engine (iztro-py wrapper)
│       ├── ai_engine.py         # AI LLM calling layer
│       ├── ai_reader.py         # Basic AI reading
│       ├── ai_reader_v2.py      # Multi-model adapter
│       ├── deep_reading.py      # 4-layer deep reading logic
│       ├── prompts.py           # Chinese prompt templates
│       ├── multilang_prompts.py # English/Japanese prompt templates
│       ├── i18n.py              # 6-language translation layer
│       ├── matching.py          # Compatibility matching (5-dimension)
│       ├── name_analysis.py     # Name decomposition + 5-grid numerology
│       ├── daily_push.py        # Daily fortune
│       ├── decadal.py           # Decadal calculation
│       ├── formats.py           # Output formatting
│       └── yinian_zwds.py       # Unified reading entry
│
├── backend/                     # FastAPI backend
│   ├── app.py                   # API server (5 endpoints)
│   └── scripts/                 # Backend-specific wrappers
│
└── web/                         # Next.js frontend
    ├── package.json
    ├── next.config.js
    ├── tsconfig.json
    ├── app/
    │   ├── layout.tsx           # Root layout
    │   ├── page.tsx             # Main page (chart + name analysis)
    │   └── globals.css          # Dark theme styles
    └── lib/
        ├── chart.ts             # Chart utilities
        └── name_analysis.ts     # Browser-side name analysis engine
```

---

## 🚢 Deployment

### Method 1: Command Line

```bash
# Install dependencies
pip install iztro-py==0.3.4 requests

# Export API key
export DEEPSEEK_API_KEY="sk-xxxx"

# Run a reading
python3 skill/scripts/zwds_skill_main.py
```

### Method 2: OpenClaw Skill

```bash
# Copy to OpenClaw skills dir
cp -r skill/* ~/.openclaw/skills/yinian-zwds/

# Reload skills
openclaw skills reload
```

### Method 3: Standalone API + Web

```bash
# Terminal 1: Backend
cd backend && python3 app.py

# Terminal 2: Web
cd web && npm install && npx next dev -p 3001
```

---

## 📜 Ethics Statement

1. **Cultural reference only** — ZWDS readings are for entertainment and cultural study purposes
2. **No medical/legal/financial advice** — This tool does not replace professional consultation
3. **No data collection** — All processing is ephemeral; no user data is stored or transmitted
4. **AI disclaimer** — AI readings are generated by LLMs and may contain inaccuracies
5. **View rationally** — Life decisions should not be based solely on divination
6. **Privacy** — No PII is logged or persisted

---

## ⭐ Technical Highlights

### 1. Palace Index Mapping (The Tricky Bit)

iztro-py returns palaces in fixed earthly branch order. ZWDS requires Life Palace as index 0 going counter-clockwise. The correct mapping `raw_idx = (soul_branch_index + i) % 12` was verified through real-world testing.

### 2. 4-Layer Prompt Tower

Instead of a single AI prompt, the system builds context incrementally: Foundation → Advanced → Temporal → Professional. Each layer adds structured data that the AI can reference without hallucination.

### 3. Compatibility with Real Stars

Each scoring dimension uses real star examples (ZiWei × WuQu, QiSha × TianTong) with documented interaction logic.

### 4. Internationalization Done Right

6-language support via key-value dictionary with language-appropriate prompt templates for English and Japanese AI readings.

### 5. Pure Frontend Name Analysis

Name character decomposition runs entirely in the browser (TypeScript), zero backend calls needed. Same 200+ character database as Python backend.

### 6. Multi-Model AI

DeepSeek (primary), Claude, and GPT are all supported via an adapter layer with model-specific prompt formatting.

---

## 📄 License

MIT License — see [LICENSE](LICENSE)

---

## 🙏 Acknowledgements

- **SylarLong** — iztro (JS) & iztro-py (Python) — the best open-source ZWDS engine
- **OpenClaw Team** — OpenClaw Skill framework
- **DeepSeek** — AI LLM for Chinese ZWDS readings

---

<p align="center">
  <b>一念 · Yinian</b>
  <br>
  <i>One thought, one destiny</i>
</p>
