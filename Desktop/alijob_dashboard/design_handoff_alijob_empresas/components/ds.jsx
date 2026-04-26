
// AliJob Empresas — Design System Primitives
// Tokens, base components, shared utilities

const DS = {
  colors: {
    sidebarBg: '#111010',
    sidebarText: '#9A9088',
    sidebarActive: '#FFFFFF',
    sidebarAccentPill: 'rgba(196,104,58,0.15)',
    pageBg: '#F5F4F1',
    cardBg: '#FFFFFF',
    border: '#E8E5DF',
    borderLight: '#F0EDE8',
    textPrimary: '#1A1714',
    textSecondary: '#6B6560',
    textMuted: '#9A9088',
    accent: '#C4683A',
    accentLight: '#FDF0EB',
    accentHover: '#B05A2E',
    teal: '#1A8080',
    tealLight: '#E8F5F5',
    green: '#1F7A4D',
    greenLight: '#E8F5EE',
    amber: '#B5691A',
    amberLight: '#FDF4E7',
    red: '#C0392B',
    redLight: '#FDF0EE',
    purple: '#6B3FA0',
    purpleLight: '#F3EEF9',
    blue: '#1A5FA0',
    blueLight: '#EBF2FC',
  },
  radius: {
    sm: '6px',
    md: '10px',
    lg: '14px',
    xl: '20px',
    full: '9999px',
  },
  shadow: {
    sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
    md: '0 4px 12px rgba(0,0,0,0.07), 0 1px 3px rgba(0,0,0,0.05)',
    lg: '0 8px 24px rgba(0,0,0,0.08), 0 2px 6px rgba(0,0,0,0.04)',
  },
};

// ─── Button ─────────────────────────────────────────────────────────────────
function Btn({ variant = 'primary', size = 'md', children, onClick, icon, disabled, full }) {
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: '6px', fontFamily: 'inherit', fontWeight: 600, cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none', borderRadius: DS.radius.md, transition: 'all 0.15s ease',
    width: full ? '100%' : undefined, opacity: disabled ? 0.55 : 1,
    letterSpacing: '-0.01em', whiteSpace: 'nowrap',
  };
  const sizes = {
    sm: { padding: '6px 12px', fontSize: '12px' },
    md: { padding: '9px 18px', fontSize: '13px' },
    lg: { padding: '12px 24px', fontSize: '14px' },
  };
  const variants = {
    primary: { background: DS.colors.accent, color: '#fff' },
    secondary: { background: DS.colors.cardBg, color: DS.colors.textPrimary, border: `1px solid ${DS.colors.border}`, boxShadow: DS.shadow.sm },
    ghost: { background: 'transparent', color: DS.colors.textSecondary },
    danger: { background: DS.colors.red, color: '#fff' },
    teal: { background: DS.colors.teal, color: '#fff' },
    dark: { background: DS.colors.sidebarBg, color: '#fff' },
  };
  return (
    <button style={{ ...base, ...sizes[size], ...variants[variant] }} onClick={onClick} disabled={disabled}>
      {icon && <span style={{ fontSize: size === 'sm' ? '13px' : '15px' }}>{icon}</span>}
      {children}
    </button>
  );
}

// ─── Badge / StatusPill ──────────────────────────────────────────────────────
function Badge({ label, color = 'neutral', dot }) {
  const palette = {
    green: { bg: DS.colors.greenLight, text: DS.colors.green },
    amber: { bg: DS.colors.amberLight, text: DS.colors.amber },
    red: { bg: DS.colors.redLight, text: DS.colors.red },
    teal: { bg: DS.colors.tealLight, text: DS.colors.teal },
    blue: { bg: DS.colors.blueLight, text: DS.colors.blue },
    purple: { bg: DS.colors.purpleLight, text: DS.colors.purple },
    accent: { bg: DS.colors.accentLight, text: DS.colors.accent },
    neutral: { bg: DS.colors.borderLight, text: DS.colors.textSecondary },
    dark: { bg: DS.colors.sidebarBg, text: '#fff' },
  };
  const c = palette[color] || palette.neutral;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '3px 9px', borderRadius: DS.radius.full,
      background: c.bg, color: c.text,
      fontSize: '11px', fontWeight: 600, letterSpacing: '0.01em',
    }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: c.text, flexShrink: 0 }}></span>}
      {label}
    </span>
  );
}

function VerBadge({ label, verified }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: '5px',
      padding: '3px 9px', borderRadius: DS.radius.full,
      background: verified ? DS.colors.greenLight : DS.colors.amberLight,
      color: verified ? DS.colors.green : DS.colors.amber,
      fontSize: '11px', fontWeight: 700,
    }}>
      <span>{verified ? '✓' : '○'}</span> {label}
    </span>
  );
}

// ─── Card ────────────────────────────────────────────────────────────────────
function Card({ children, style, onClick, hover }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      style={{
        background: DS.colors.cardBg, borderRadius: DS.radius.lg,
        border: `1px solid ${DS.colors.border}`,
        boxShadow: hovered && hover ? DS.shadow.md : DS.shadow.sm,
        transition: 'box-shadow 0.15s ease, transform 0.15s ease',
        transform: hovered && hover ? 'translateY(-1px)' : 'none',
        cursor: onClick ? 'pointer' : 'default',
        ...style,
      }}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </div>
  );
}

// ─── MetricCard ───────────────────────────────────────────────────────────────
function MetricCard({ label, value, sub, icon, accent, trend }) {
  return (
    <Card style={{ padding: '20px 22px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div style={{ fontSize: '12px', fontWeight: 600, color: DS.colors.textMuted, letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 10 }}>{label}</div>
          <div style={{ fontSize: '28px', fontWeight: 800, color: DS.colors.textPrimary, letterSpacing: '-0.03em', lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: '12px', color: DS.colors.textMuted, marginTop: 6 }}>{sub}</div>}
          {trend && <div style={{ fontSize: '12px', color: trend > 0 ? DS.colors.green : DS.colors.red, marginTop: 4, fontWeight: 600 }}>{trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% esta semana</div>}
        </div>
        {icon && (
          <div style={{
            width: 40, height: 40, borderRadius: DS.radius.md,
            background: accent ? DS.colors.accentLight : DS.colors.borderLight,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '18px', flexShrink: 0,
          }}>
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}

// ─── SectionHeader ───────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, actions }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
      <div>
        <h1 style={{ fontSize: '20px', fontWeight: 800, color: DS.colors.textPrimary, margin: 0, letterSpacing: '-0.03em' }}>{title}</h1>
        {subtitle && <p style={{ fontSize: '13px', color: DS.colors.textSecondary, margin: '4px 0 0', lineHeight: 1.5 }}>{subtitle}</p>}
      </div>
      {actions && <div style={{ display: 'flex', gap: 8 }}>{actions}</div>}
    </div>
  );
}

// ─── FormField ───────────────────────────────────────────────────────────────
function FormField({ label, hint, required, children, error }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {label && (
        <label style={{ fontSize: '13px', fontWeight: 600, color: DS.colors.textPrimary, display: 'flex', gap: 4 }}>
          {label} {required && <span style={{ color: DS.colors.accent }}>*</span>}
        </label>
      )}
      {children}
      {hint && <span style={{ fontSize: '11px', color: DS.colors.textMuted }}>{hint}</span>}
      {error && <span style={{ fontSize: '11px', color: DS.colors.red }}>{error}</span>}
    </div>
  );
}

function Input({ placeholder, type = 'text', value, onChange, prefix, style }) {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
      {prefix && <span style={{ position: 'absolute', left: 12, color: DS.colors.textMuted, fontSize: '13px', pointerEvents: 'none' }}>{prefix}</span>}
      <input
        type={type}
        placeholder={placeholder}
        defaultValue={value}
        style={{
          width: '100%', padding: prefix ? '9px 12px 9px 32px' : '9px 12px',
          borderRadius: DS.radius.md, border: `1px solid ${DS.colors.border}`,
          fontSize: '13px', color: DS.colors.textPrimary, background: '#FDFCFA',
          outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
          ...style,
        }}
      />
    </div>
  );
}

function Select({ options, value, style }) {
  return (
    <select defaultValue={value} style={{
      width: '100%', padding: '9px 12px', borderRadius: DS.radius.md,
      border: `1px solid ${DS.colors.border}`, fontSize: '13px',
      color: DS.colors.textPrimary, background: '#FDFCFA',
      outline: 'none', fontFamily: 'inherit', cursor: 'pointer', ...style,
    }}>
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  );
}

function Textarea({ placeholder, rows = 4, value }) {
  return (
    <textarea
      placeholder={placeholder}
      defaultValue={value}
      rows={rows}
      style={{
        width: '100%', padding: '9px 12px', borderRadius: DS.radius.md,
        border: `1px solid ${DS.colors.border}`, fontSize: '13px',
        color: DS.colors.textPrimary, background: '#FDFCFA',
        outline: 'none', fontFamily: 'inherit', resize: 'vertical',
        boxSizing: 'border-box', lineHeight: 1.6,
      }}
    />
  );
}

// ─── Tabs ────────────────────────────────────────────────────────────────────
function Tabs({ tabs, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 2, borderBottom: `1px solid ${DS.colors.border}`, marginBottom: 24 }}>
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          style={{
            padding: '10px 16px', background: 'none', border: 'none',
            borderBottom: active === t.id ? `2px solid ${DS.colors.accent}` : '2px solid transparent',
            color: active === t.id ? DS.colors.accent : DS.colors.textSecondary,
            fontSize: '13px', fontWeight: active === t.id ? 700 : 500,
            cursor: 'pointer', fontFamily: 'inherit', marginBottom: '-1px',
            transition: 'all 0.15s ease',
          }}
        >
          {t.label}
          {t.count !== undefined && (
            <span style={{ marginLeft: 6, background: active === t.id ? DS.colors.accentLight : DS.colors.borderLight, color: active === t.id ? DS.colors.accent : DS.colors.textMuted, padding: '1px 7px', borderRadius: DS.radius.full, fontSize: '11px', fontWeight: 700 }}>{t.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

// ─── Alert ───────────────────────────────────────────────────────────────────
function Alert({ type = 'info', title, message, action }) {
  const palette = { info: { bg: DS.colors.blueLight, border: DS.colors.blue, icon: 'ℹ' }, warning: { bg: DS.colors.amberLight, border: DS.colors.amber, icon: '⚠' }, success: { bg: DS.colors.greenLight, border: DS.colors.green, icon: '✓' }, error: { bg: DS.colors.redLight, border: DS.colors.red, icon: '✕' } };
  const c = palette[type];
  return (
    <div style={{ display: 'flex', gap: 12, padding: '12px 16px', borderRadius: DS.radius.md, background: c.bg, border: `1px solid ${c.border}20` }}>
      <span style={{ color: c.border, fontWeight: 700, flexShrink: 0 }}>{c.icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: '13px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 2 }}>{title}</div>}
        <div style={{ fontSize: '12px', color: DS.colors.textSecondary, lineHeight: 1.5 }}>{message}</div>
      </div>
      {action && <button style={{ background: 'none', border: 'none', color: c.border, fontSize: '12px', fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0 }}>{action}</button>}
    </div>
  );
}

// ─── EmptyState ───────────────────────────────────────────────────────────────
function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '64px 32px', textAlign: 'center' }}>
      <div style={{ fontSize: '36px', marginBottom: 16, opacity: 0.4 }}>{icon}</div>
      <div style={{ fontSize: '15px', fontWeight: 700, color: DS.colors.textPrimary, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: '13px', color: DS.colors.textSecondary, maxWidth: 320, lineHeight: 1.6, marginBottom: 20 }}>{subtitle}</div>
      {action}
    </div>
  );
}

// ─── MatchBar ─────────────────────────────────────────────────────────────────
function MatchBar({ score }) {
  const color = score >= 80 ? DS.colors.green : score >= 60 ? DS.colors.teal : DS.colors.amber;
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ flex: 1, height: 6, background: DS.colors.borderLight, borderRadius: DS.radius.full, overflow: 'hidden' }}>
        <div style={{ width: `${score}%`, height: '100%', background: color, borderRadius: DS.radius.full, transition: 'width 0.4s ease' }}></div>
      </div>
      <span style={{ fontSize: '12px', fontWeight: 700, color, minWidth: 32 }}>{score}%</span>
    </div>
  );
}

// ─── Avatar ───────────────────────────────────────────────────────────────────
function Avatar({ name, size = 32, color }) {
  const initials = name ? name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase() : '?';
  const colors = ['#C4683A', '#1A8080', '#6B3FA0', '#1A5FA0', '#1F7A4D', '#B5691A'];
  const bg = color || colors[name ? name.charCodeAt(0) % colors.length : 0];
  return (
    <div style={{ width: size, height: size, borderRadius: '50%', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: size * 0.35 + 'px', fontWeight: 700, flexShrink: 0 }}>
      {initials}
    </div>
  );
}

// ─── StarRating ───────────────────────────────────────────────────────────────
function StarRating({ value, max = 5, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 2 }}>
      {Array.from({ length: max }).map((_, i) => (
        <span key={i} style={{ fontSize: size, color: i < Math.floor(value) ? '#F59E0B' : i < value ? '#F59E0B' : DS.colors.border }}>★</span>
      ))}
    </span>
  );
}

// ─── Divider ─────────────────────────────────────────────────────────────────
function Divider({ label }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '4px 0' }}>
      <div style={{ flex: 1, height: 1, background: DS.colors.border }}></div>
      {label && <span style={{ fontSize: '11px', color: DS.colors.textMuted, fontWeight: 600, letterSpacing: '0.04em' }}>{label}</span>}
      <div style={{ flex: 1, height: 1, background: DS.colors.border }}></div>
    </div>
  );
}

// ─── Tag ─────────────────────────────────────────────────────────────────────
function Tag({ label }) {
  return (
    <span style={{ padding: '3px 10px', borderRadius: DS.radius.full, background: DS.colors.borderLight, color: DS.colors.textSecondary, fontSize: '11px', fontWeight: 500 }}>{label}</span>
  );
}

// ─── Grid helpers ─────────────────────────────────────────────────────────────
function Grid({ cols = 4, gap = 16, children, style }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${cols}, 1fr)`, gap, ...style }}>
      {children}
    </div>
  );
}

Object.assign(window, { DS, Btn, Badge, VerBadge, Card, MetricCard, SectionHeader, FormField, Input, Select, Textarea, Tabs, Alert, EmptyState, MatchBar, Avatar, StarRating, Divider, Tag, Grid });
