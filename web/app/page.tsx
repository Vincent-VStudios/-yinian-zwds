"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { analyzeName, type CharAnalysis, type WugeResult } from "@/lib/name_analysis";

// react-iztro 动态加载（client-only）
const Iztrolabe = dynamic(
  () => import("react-iztro/lib/Iztrolabe/Iztrolabe").then((m) => ({ default: m.Iztrolabe })),
  { ssr: false, loading: () => <div className="chart-loading">✨ 加载星盘中...</div> }
);

type Gender = "男" | "女";

interface FormState {
  year: string;
  month: string;
  day: string;
  hour: string;
  gender: Gender;
  name: string;  // ← 新增姓名输入
}

const defaultForm: FormState = {
  year: "",
  month: "",
  day: "",
  hour: "",
  gender: "男",
  name: "",
};

const HOUR_LABELS = [
  "子时 23:00-00:59", "丑时 01:00-02:59", "寅时 03:00-04:59",
  "卯时 05:00-06:59", "辰时 07:00-08:59", "巳时 09:00-10:59",
  "午时 11:00-12:59", "未时 13:00-14:59", "申时 15:00-16:59",
  "酉时 17:00-18:59", "戌时 19:00-20:59", "亥时 21:00-22:59",
];

export default function Home() {
  const [form, setForm] = useState<FormState>(defaultForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string>("");
  const [showDecadal, setShowDecadal] = useState(false);
  const [showYearly, setShowYearly] = useState(false);

  // 姓名分析状态
  const [nameResult, setNameResult] = useState<{
    chars: CharAnalysis[];
    wuge: WugeResult | null;
  } | null>(null);

  const update = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = useCallback(() => {
    setError("");
    setNameResult(null);

    const { year, month, day, hour, gender, name } = form;

    // 校验生辰
    const hasBirth = year || month || day || hour;
    if (hasBirth) {
      if (!year || !month || !day || !hour) {
        setError("请填写完整的出生信息");
        return;
      }
      const y = parseInt(year);
      const m = parseInt(month);
      const d = parseInt(day);
      if (y < 1900 || y > 2100 || m < 1 || m > 12 || d < 1 || d > 31) {
        setError("日期范围有误（1900-2100）");
        return;
      }
    }

    // 姓名分析（Web端本地计算）
    if (name && name.length >= 2) {
      const r = analyzeName(name);
      if (r.success) setNameResult(r);
    }

    if (hasBirth) {
      setSubmitted(true);
    } else if (name && name.length >= 2) {
      setSubmitted(true);  // 只有姓名也能查看拆字
    } else {
      setError("请输入出生信息或姓名");
    }
  }, [form]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const birthday = submitted
    ? `${parseInt(form.year)}-${parseInt(form.month)}-${parseInt(form.day)}`
    : undefined;
  const birthTime = submitted ? parseInt(form.hour) : undefined;
  const gender = submitted ? (form.gender === "男" ? "male" as const : "female" as const) : undefined;
  const hasBirth = !!birthday && birthTime !== undefined;

  return (
    <div className="app-container" onKeyDown={handleKeyDown}>
      {/* Header */}
      <header className="header">
        <h1 className="title">🔮 一念·紫微斗数</h1>
        <p className="subtitle">Yinian Zi Wei Dou Shu · 姓名拆解</p>
      </header>

      {/* Form */}
      <div className="form-card">
        <div className="form-row">
          <div className="field">
            <label>年份</label>
            <input
              type="number"
              placeholder="e.g. 1984"
              value={form.year}
              onChange={(e) => update("year", e.target.value)}
            />
          </div>
          <div className="field">
            <label>月份</label>
            <input
              type="number"
              placeholder="6"
              min={1} max={12}
              value={form.month}
              onChange={(e) => update("month", e.target.value)}
            />
          </div>
          <div className="field">
            <label>日</label>
            <input
              type="number"
              placeholder="22"
              min={1} max={31}
              value={form.day}
              onChange={(e) => update("day", e.target.value)}
            />
          </div>
          <div className="field">
            <label>时辰</label>
            <select
              value={form.hour}
              onChange={(e) => update("hour", e.target.value)}
            >
              <option value="">选择时辰</option>
              {HOUR_LABELS.map((label, i) => (
                <option key={i} value={(i * 2).toString()}>{label}</option>
              ))}
            </select>
          </div>
          <div className="field gender-field">
            <label>性别</label>
            <div className="gender-group">
              <button
                className={`gender-btn ${form.gender === "男" ? "active-male" : ""}`}
                onClick={() => update("gender", "男")}
              >♂ 男</button>
              <button
                className={`gender-btn ${form.gender === "女" ? "active-female" : ""}`}
                onClick={() => update("gender", "女")}
              >♀ 女</button>
            </div>
          </div>
        </div>
        <div className="form-divider">⬇ 也可只输入姓名做拆字分析 ⬇</div>
        <div className="form-row name-row">
          <div className="field name-field">
            <label>📛 姓名（选填，自动拆字解字）</label>
            <input
              type="text"
              placeholder="e.g. 南曦"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              maxLength={8}
              className="name-input"
            />
          </div>
        </div>
        <button className="calc-btn" onClick={handleSubmit}>
          📿 起盘
        </button>
        {error && <p className="error">{error}</p>}
      </div>

      {/* Name Analysis Result */}
      {submitted && nameResult && (
        <div className="name-analysis-card">
          <h3 className="name-section-title">📛 姓名拆解 · {form.name}</h3>
          
          <div className="char-grid">
            {nameResult.chars.map((c) => (
              <div key={c.char} className="char-card">
                <div className="char-big">{c.char}</div>
                <div className="char-info">
                  <span>部首「{c.radical}」</span>
                  <span>{c.strokes}画</span>
                  <span>五行【{c.element}】</span>
                </div>
                <div className="char-meaning">{c.meaning}</div>
              </div>
            ))}
          </div>

          {nameResult.wuge && (
            <div className="wuge-section">
              <h4>📊 五格数理</h4>
              <div className="wuge-grid">
                {[
                  { key: "tiange", label: "天格", v: nameResult.wuge.tiange },
                  { key: "renge", label: "人格", v: nameResult.wuge.renge },
                  { key: "dige", label: "地格", v: nameResult.wuge.dige },
                  { key: "waige", label: "外格", v: nameResult.wuge.waige },
                  { key: "zongge", label: "总格", v: nameResult.wuge.zongge },
                ].map(({ key, label, v }) => (
                  <div key={key} className={`wuge-item ${v.jixiong.includes("吉") ? "good" : v.jixiong.includes("凶") ? "bad" : ""}`}>
                    <span className="wuge-label">{label}</span>
                    <span className="wuge-num">{v.num}</span>
                    <span className="wuge-ji">{v.jixiong}</span>
                  </div>
                ))}
              </div>
              <div className="sancai-line">
                🔮 三才：人格【{nameResult.wuge.sancai.re}】× 地格【{nameResult.wuge.sancai.de}】→ {nameResult.wuge.sancai.relation}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Chart */}
      {submitted && hasBirth && birthday && birthTime !== undefined && gender && (
        <div className="chart-section">
          <div className="chart-wrapper">
            <Iztrolabe
              birthday={birthday}
              birthTime={birthTime}
              gender={gender}
              birthdayType="solar"
              lang="zh-CN"
              width="100%"
            />
          </div>

          <div className="scope-bar">
            <label className="scope-toggle">
              <input type="checkbox" checked={showDecadal} onChange={(e) => setShowDecadal(e.target.checked)} />
              📅 大限
            </label>
            <label className="scope-toggle">
              <input type="checkbox" checked={showYearly} onChange={(e) => setShowYearly(e.target.checked)} />
              📆 流年
            </label>
          </div>

          <div className="action-bar">
            <button className="action-btn" onClick={() => {
              const text = `🔮 一念紫微斗数\n📅 ${birthday} ${HOUR_LABELS[parseInt(form.hour) / 2]}\n🐉 ${form.gender}`;
              navigator.clipboard.writeText(text);
            }}>📋 复制信息</button>
            <button className="action-btn" onClick={() => window.open("https://t.me/vinceeeent", "_blank")}>🤖 AI解盘</button>
          </div>
        </div>
      )}

      {/* Welcome */}
      {!submitted && (
        <div className="welcome">
          <p className="welcome-icon">🦞</p>
          <p className="welcome-text">输入出生信息 + 姓名，获取命盘 + 姓名拆解</p>
          <p className="welcome-hint">示例：1984-6-22 卯时 男 · 南曦</p>
        </div>
      )}

      <div className="disclaimer">📜 文化参考，理性看待 · 一念紫微斗数</div>

      {/* Global styles */}
      <style jsx global>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans SC", sans-serif;
          background: linear-gradient(135deg, #0f0c29, #1a1a3e, #24243e);
          color: #e0d8c8;
          min-height: 100vh;
        }
        .app-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 1rem;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .header { text-align: center; padding: 1.5rem 0 0.5rem; }
        .title {
          font-size: 1.6rem;
          background: linear-gradient(135deg, #f7d68a, #e8b84a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .subtitle { font-size: 0.75rem; opacity: 0.4; letter-spacing: 2px; margin-top: 0.25rem; }
        .form-card {
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,200,100,0.15);
          border-radius: 16px;
          padding: 1.2rem;
          width: 100%;
          max-width: 680px;
          backdrop-filter: blur(10px);
          margin: 0.5rem 0;
        }
        .form-row { display: flex; gap: 0.6rem; flex-wrap: wrap; }
        .field { flex: 1; min-width: 80px; }
        .field label { display: block; font-size: 0.75rem; opacity: 0.6; margin-bottom: 0.3rem; }
        .field input, .field select {
          width: 100%;
          padding: 0.55rem 0.5rem;
          border-radius: 8px;
          border: 1px solid rgba(255,200,100,0.2);
          background: rgba(0,0,0,0.3);
          color: #e0d8c8;
          font-size: 0.9rem;
        }
        .field select option { background: #1a1a3e; color: #e0d8c8; }
        .gender-field { min-width: 140px; }
        .gender-group { display: flex; gap: 0.4rem; }
        .gender-btn {
          flex: 1; padding: 0.55rem; border-radius: 8px;
          border: 1px solid rgba(255,200,100,0.2);
          background: rgba(0,0,0,0.3); color: #a09078;
          cursor: pointer; transition: all 0.2s; font-size: 0.85rem;
        }
        .active-male { background: rgba(100,150,255,0.2); border-color: rgba(100,150,255,0.5); color: #8ab4ff; }
        .active-female { background: rgba(255,130,180,0.2); border-color: rgba(255,130,180,0.5); color: #ff8ab4; }
        .form-divider {
          text-align: center; font-size: 0.75rem; opacity: 0.35;
          padding: 0.6rem 0 0.3rem; letter-spacing: 1px;
        }
        .name-row { margin-top: 0.3rem; }
        .name-field { flex: 1; min-width: 100%; }
        .name-input { font-size: 1.1rem !important; letter-spacing: 4px; }
        .calc-btn {
          width: 100%; padding: 0.7rem; margin-top: 0.7rem; border-radius: 10px;
          border: none; background: linear-gradient(135deg, #8b6914, #c4983a);
          color: #1a1a2e; font-size: 1rem; font-weight: 600; cursor: pointer;
          transition: all 0.2s;
        }
        .calc-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 15px rgba(196,152,58,0.3); }
        .error { color: #ff7a7a; text-align: center; margin-top: 0.5rem; font-size: 0.85rem; }

        /* Name Analysis Card */
        .name-analysis-card {
          width: 100%; max-width: 680px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,200,100,0.12);
          border-radius: 16px;
          padding: 1.2rem;
          margin-top: 1rem;
          backdrop-filter: blur(10px);
        }
        .name-section-title { font-size: 1rem; margin-bottom: 0.8rem; }
        .char-grid { display: flex; gap: 0.8rem; flex-wrap: wrap; justify-content: center; }
        .char-card {
          background: rgba(0,0,0,0.25);
          border: 1px solid rgba(255,200,100,0.1);
          border-radius: 12px;
          padding: 0.8rem;
          text-align: center;
          min-width: 120px;
          flex: 1;
        }
        .char-big { font-size: 2.5rem; background: linear-gradient(135deg, #f7d68a, #e8b84a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .char-info { font-size: 0.75rem; opacity: 0.7; margin-top: 0.3rem; display: flex; gap: 0.3rem; justify-content: center; flex-wrap: wrap; }
        .char-meaning { font-size: 0.8rem; opacity: 0.6; margin-top: 0.3rem; }
        .wuge-section { margin-top: 1rem; }
        .wuge-section h4 { font-size: 0.9rem; margin-bottom: 0.5rem; opacity: 0.8; }
        .wuge-grid { display: flex; gap: 0.4rem; flex-wrap: wrap; justify-content: center; }
        .wuge-item {
          background: rgba(0,0,0,0.2);
          border: 1px solid rgba(255,200,100,0.08);
          border-radius: 10px;
          padding: 0.5rem 0.7rem;
          text-align: center;
          min-width: 70px;
        }
        .wuge-item.good { border-color: rgba(100,200,100,0.3); }
        .wuge-item.bad { border-color: rgba(255,100,100,0.3); }
        .wuge-label { display: block; font-size: 0.7rem; opacity: 0.5; }
        .wuge-num { display: block; font-size: 1.2rem; font-weight: 600; }
        .wuge-ji { display: block; font-size: 0.7rem; }
        .wuge-item.good .wuge-ji { color: #6f6; }
        .wuge-item.bad .wuge-ji { color: #f66; }
        .sancai-line { text-align: center; font-size: 0.8rem; opacity: 0.6; margin-top: 0.5rem; }

        .chart-section { width: 100%; max-width: 680px; margin-top: 1rem; }
        .chart-wrapper { width: 100%; display: flex; justify-content: center; }
        .chart-wrapper :global(svg) { width: 100%; height: auto; max-width: 600px; display: block; }
        .chart-loading { text-align: center; padding: 3rem; opacity: 0.6; font-size: 1.1rem; }
        .scope-bar { display: flex; gap: 1rem; justify-content: center; margin-top: 0.5rem; }
        .scope-toggle { display: flex; align-items: center; gap: 0.4rem; font-size: 0.85rem; cursor: pointer; opacity: 0.7; color: #e0d8c8; }
        .scope-toggle input { width: 16px; height: 16px; accent-color: #c4983a; }
        .action-bar { display: flex; gap: 0.5rem; justify-content: center; margin-top: 0.8rem; }
        .action-btn {
          padding: 0.4rem 0.8rem; border-radius: 8px;
          border: 1px solid rgba(255,200,100,0.2);
          background: rgba(0,0,0,0.2); color: #c0b090;
          cursor: pointer; font-size: 0.8rem; transition: all 0.2s;
        }
        .action-btn:hover { background: rgba(255,200,100,0.1); color: #e0d0a0; }
        .welcome { text-align: center; padding: 3rem 1rem; }
        .welcome-icon { font-size: 2rem; }
        .welcome-text { font-size: 1.1rem; opacity: 0.7; }
        .welcome-hint { font-size: 0.85rem; opacity: 0.5; margin-top: 0.8rem; }
        .disclaimer { text-align: center; font-size: 0.7rem; opacity: 0.35; padding: 1.5rem 0; margin-top: auto; }
      `}</style>
    </div>
  );
}
