import React from "react";
import { COLORS, FONT_FAMILY } from "../theme";

// All phone screens are designed relative to the screen pixel width `w`
// so a single component scales cleanly inside any phone size.

const StatusBar: React.FC<{ w: number }> = ({ w }) => (
  <div
    style={{
      position: "absolute",
      top: w * 0.03,
      left: 0,
      right: 0,
      display: "flex",
      justifyContent: "space-between",
      padding: `0 ${w * 0.09}px`,
      color: COLORS.white,
      fontSize: w * 0.045,
      fontWeight: 700,
      zIndex: 15,
      fontFamily: FONT_FAMILY,
    }}
  >
    <span>9:41</span>
    <span style={{ letterSpacing: 2 }}>5G ▪ ▪ ▪ ⌁</span>
  </div>
);

const screenBase = (w: number): React.CSSProperties => ({
  width: "100%",
  height: "100%",
  position: "relative",
  direction: "rtl",
  fontFamily: FONT_FAMILY,
  color: COLORS.white,
  background: `linear-gradient(180deg, ${COLORS.navy} 0%, ${COLORS.navyDeep} 100%)`,
  paddingTop: w * 0.15,
  overflow: "hidden",
});

const Header: React.FC<{ w: number; title: string; sub?: string }> = ({
  w,
  title,
  sub,
}) => (
  <div style={{ padding: `0 ${w * 0.075}px`, marginBottom: w * 0.05 }}>
    {sub && (
      <div style={{ color: COLORS.blueBright, fontSize: w * 0.04, fontWeight: 700 }}>
        {sub}
      </div>
    )}
    <div style={{ fontSize: w * 0.075, fontWeight: 800 }}>{title}</div>
  </div>
);

const card = (w: number): React.CSSProperties => ({
  background: "rgba(255,255,255,0.06)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: w * 0.05,
  padding: w * 0.05,
});

// ---------------------------------------------------------------- HOME
export const HomeScreen: React.FC<{ w: number }> = ({ w }) => (
  <div style={screenBase(w)}>
    <StatusBar w={w} />
    <Header w={w} sub="مساء الخير 👋" title="طالب مُمثلي" />
    <div style={{ padding: `0 ${w * 0.075}px`, display: "grid", gap: w * 0.04 }}>
      <div
        style={{
          ...card(w),
          background: `linear-gradient(120deg, ${COLORS.blue}, ${COLORS.blueGlow})`,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <div style={{ fontSize: w * 0.038, opacity: 0.85 }}>المحاضرة القادمة</div>
          <div style={{ fontSize: w * 0.06, fontWeight: 800 }}>خوارزميات</div>
          <div style={{ fontSize: w * 0.036, opacity: 0.85 }}>قاعة ٢٠٤ · ١٠:٣٠</div>
        </div>
        <div style={{ fontSize: w * 0.12 }}>📅</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: w * 0.04 }}>
        {[
          { i: "📚", t: "المواد", n: "٦" },
          { i: "📝", t: "الواجبات", n: "٣" },
          { i: "🔔", t: "الإشعارات", n: "٥" },
          { i: "💬", t: "ميمو AI", n: "" },
        ].map((it) => (
          <div key={it.t} style={{ ...card(w), textAlign: "center" }}>
            <div style={{ fontSize: w * 0.09 }}>{it.i}</div>
            <div style={{ fontSize: w * 0.042, fontWeight: 700, marginTop: w * 0.02 }}>
              {it.t}
            </div>
            {it.n && (
              <div style={{ color: COLORS.gold, fontSize: w * 0.05, fontWeight: 800 }}>
                {it.n}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

// ------------------------------------------------------------ TIMETABLE
export const TimetableScreen: React.FC<{ w: number }> = ({ w }) => {
  const rows = [
    { t: "٨:٣٠", s: "رياضيات", r: "قاعة ١٠١", c: COLORS.blue },
    { t: "١٠:٣٠", s: "خوارزميات", r: "قاعة ٢٠٤", c: COLORS.gold },
    { t: "١٢:٠٠", s: "قواعد بيانات", r: "مختبر ٣", c: "#39C0A0" },
    { t: "٢:٠٠", s: "شبكات", r: "قاعة ١١٥", c: "#B47CFF" },
  ];
  return (
    <div style={screenBase(w)}>
      <StatusBar w={w} />
      <Header w={w} sub="الأحد ٢٧" title="جدولي الأسبوعي" />
      <div style={{ padding: `0 ${w * 0.075}px`, display: "grid", gap: w * 0.035 }}>
        {rows.map((r) => (
          <div
            key={r.s}
            style={{
              ...card(w),
              display: "flex",
              alignItems: "center",
              gap: w * 0.04,
              borderRight: `${w * 0.012}px solid ${r.c}`,
            }}
          >
            <div style={{ fontSize: w * 0.05, fontWeight: 800, color: r.c, minWidth: w * 0.15 }}>
              {r.t}
            </div>
            <div>
              <div style={{ fontSize: w * 0.05, fontWeight: 700 }}>{r.s}</div>
              <div style={{ fontSize: w * 0.036, opacity: 0.7 }}>{r.r}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// -------------------------------------------------------------- SUBJECTS
export const SubjectsScreen: React.FC<{ w: number }> = ({ w }) => {
  const subs = [
    { i: "📐", t: "رياضيات ٢", p: 82, c: COLORS.blue },
    { i: "💻", t: "برمجة", p: 64, c: COLORS.gold },
    { i: "🗄️", t: "قواعد بيانات", p: 90, c: "#39C0A0" },
    { i: "🌐", t: "شبكات", p: 47, c: "#B47CFF" },
  ];
  return (
    <div style={screenBase(w)}>
      <StatusBar w={w} />
      <Header w={w} sub="الفصل الأول" title="المواد" />
      <div style={{ padding: `0 ${w * 0.075}px`, display: "grid", gap: w * 0.035 }}>
        {subs.map((s) => (
          <div key={s.t} style={{ ...card(w) }}>
            <div style={{ display: "flex", alignItems: "center", gap: w * 0.04 }}>
              <div style={{ fontSize: w * 0.08 }}>{s.i}</div>
              <div style={{ fontSize: w * 0.05, fontWeight: 700, flex: 1 }}>{s.t}</div>
              <div style={{ fontSize: w * 0.045, fontWeight: 800, color: s.c }}>{s.p}%</div>
            </div>
            <div
              style={{
                height: w * 0.02,
                borderRadius: 999,
                background: "rgba(255,255,255,0.1)",
                marginTop: w * 0.035,
                overflow: "hidden",
              }}
            >
              <div style={{ width: `${s.p}%`, height: "100%", background: s.c }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------- NOTIFICATIONS
export const NotificationsScreen: React.FC<{ w: number }> = ({ w }) => {
  const items = [
    { i: "📝", t: "واجب جديد", d: "خوارزميات · يسلّم الخميس", c: COLORS.gold },
    { i: "📢", t: "إعلان من الممثل", d: "تأجيل محاضرة الشبكات", c: COLORS.blue },
    { i: "📅", t: "تحديث الجدول", d: "أُضيفت قاعة ٢٠٤", c: "#39C0A0" },
    { i: "📂", t: "ملف جديد", d: "محاضرة ٧ · قواعد بيانات", c: "#B47CFF" },
  ];
  return (
    <div style={screenBase(w)}>
      <StatusBar w={w} />
      <Header w={w} sub="اليوم" title="الإشعارات" />
      <div style={{ padding: `0 ${w * 0.075}px`, display: "grid", gap: w * 0.035 }}>
        {items.map((it) => (
          <div
            key={it.t}
            style={{ ...card(w), display: "flex", gap: w * 0.04, alignItems: "center" }}
          >
            <div
              style={{
                width: w * 0.13,
                height: w * 0.13,
                borderRadius: w * 0.035,
                background: `${it.c}33`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: w * 0.07,
              }}
            >
              {it.i}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: w * 0.046, fontWeight: 700 }}>{it.t}</div>
              <div style={{ fontSize: w * 0.036, opacity: 0.7 }}>{it.d}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------- CHAT
export const ChatScreen: React.FC<{ w: number; reveal?: number }> = ({
  w,
  reveal = 1,
}) => {
  return (
    <div style={screenBase(w)}>
      <StatusBar w={w} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: w * 0.03,
          padding: `0 ${w * 0.075}px ${w * 0.04}px`,
          borderBottom: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            width: w * 0.12,
            height: w * 0.12,
            borderRadius: "50%",
            background: `radial-gradient(circle at 35% 30%, ${COLORS.blueBright}, ${COLORS.blueGlow})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: w * 0.06,
            boxShadow: `0 0 ${w * 0.05}px ${COLORS.blue}`,
          }}
        >
          🤖
        </div>
        <div>
          <div style={{ fontSize: w * 0.05, fontWeight: 800 }}>ميمو</div>
          <div style={{ fontSize: w * 0.034, color: "#39C0A0" }}>● متصل الآن</div>
        </div>
      </div>

      <div style={{ padding: `${w * 0.05}px ${w * 0.06}px`, display: "grid", gap: w * 0.04 }}>
        {/* user bubble */}
        <div style={{ justifySelf: "start", maxWidth: "78%" }}>
          <div
            style={{
              background: `linear-gradient(120deg, ${COLORS.blue}, ${COLORS.blueGlow})`,
              borderRadius: `${w * 0.05}px ${w * 0.05}px ${w * 0.05}px ${w * 0.015}px`,
              padding: `${w * 0.04}px ${w * 0.05}px`,
              fontSize: w * 0.046,
              fontWeight: 600,
            }}
          >
            شنو عندي واجبات اليوم؟
          </div>
        </div>

        {/* memo reply */}
        <div style={{ justifySelf: "end", maxWidth: "82%", opacity: reveal }}>
          <div
            style={{
              background: "rgba(255,255,255,0.08)",
              border: `1px solid ${COLORS.blue}55`,
              borderRadius: `${w * 0.05}px ${w * 0.05}px ${w * 0.015}px ${w * 0.05}px`,
              padding: `${w * 0.04}px ${w * 0.05}px`,
              fontSize: w * 0.044,
              lineHeight: 1.6,
              boxShadow: `0 0 ${w * 0.06}px ${COLORS.blue}44`,
            }}
          >
            عندك واجبين اليوم 👇
            <div style={{ marginTop: w * 0.03, display: "grid", gap: w * 0.025 }}>
              <div style={{ color: COLORS.gold, fontWeight: 700 }}>
                • خوارزميات — يسلّم ٦:٠٠ م
              </div>
              <div style={{ color: COLORS.gold, fontWeight: 700 }}>
                • قواعد بيانات — تقرير المختبر
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* input */}
      <div
        style={{
          position: "absolute",
          bottom: w * 0.06,
          left: w * 0.06,
          right: w * 0.06,
          height: w * 0.13,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.15)",
          display: "flex",
          alignItems: "center",
          padding: `0 ${w * 0.05}px`,
          fontSize: w * 0.04,
          color: COLORS.muted,
        }}
      >
        اكتب رسالتك…
      </div>
    </div>
  );
};
