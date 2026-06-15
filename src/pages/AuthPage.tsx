import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/Logo.png';

type Tab = 'login' | 'register';

export default function AuthPage() {
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>('login');

  // Login fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Register fields
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');
  const [regError, setRegError] = useState('');
  const [regLoading, setRegLoading] = useState(false);

  const [showLoginPw, setShowLoginPw] = useState(false);
  const [showRegPw, setShowRegPw] = useState(false);
  const [showRegConfirm, setShowRegConfirm] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);
    const result = await login(loginEmail, loginPassword);
    setLoginLoading(false);
    if (result.error) {
      setLoginError(result.error);
    } else {
      navigate('/cuenta');
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    setRegError('');
    if (!regName.trim()) return setRegError('El nombre es obligatorio.');
    if (regPassword.length < 6) return setRegError('La contraseña debe tener al menos 6 caracteres.');
    if (regPassword !== regConfirm) return setRegError('Las contraseñas no coinciden.');
    setRegLoading(true);
    const result = await register(regName, regEmail, regPassword);
    setRegLoading(false);
    if (result.error) {
      setRegError(result.error);
    } else {
      navigate('/cuenta');
    }
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none transition-all duration-200';
  const inputStyle = {
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.09)',
    fontFamily: 'DM Sans, sans-serif',
  };
  const inputFocusStyle = {
    border: '1px solid rgba(144,68,235,0.6)',
    boxShadow: '0 0 0 3px rgba(144,68,235,0.12)',
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4 py-16"
      style={{ background: '#05070F' }}
    >
      {/* Back link */}
      <div className="w-full max-w-md mb-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm"
          style={{ fontFamily: 'DM Sans, sans-serif' }}
        >
          <ArrowLeft size={15} />
          Volver al inicio
        </Link>
      </div>

      {/* Card */}
      <div
        className="w-full max-w-md rounded-3xl p-8"
        style={{
          background: 'rgba(255,255,255,0.025)',
          border: '1px solid rgba(255,255,255,0.07)',
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img src={logoImg} alt="LUMY" className="h-8 w-auto" />
        </div>

        {/* Tabs */}
        <div
          className="flex rounded-2xl p-1 mb-8"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          {(['login', 'register'] as Tab[]).map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 focus:outline-none"
              style={{
                fontFamily: 'DM Sans, sans-serif',
                background:
                  tab === t
                    ? 'linear-gradient(135deg, #2474D5, #9044EB)'
                    : 'transparent',
                color: tab === t ? '#fff' : '#94a3b8',
                boxShadow:
                  tab === t ? '0 2px 12px rgba(144,68,235,0.35)' : 'none',
              }}
            >
              {t === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
            </button>
          ))}
        </div>

        {/* LOGIN FORM */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label
                className="block text-xs text-slate-400 mb-1.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                required
                placeholder="tucorreo@email.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
              />
            </div>
            <div>
              <label
                className="block text-xs text-slate-400 mb-1.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showLoginPw ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  className={inputClass}
                  style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={(e) => Object.assign(e.currentTarget.style, { ...inputStyle, paddingRight: '48px', ...inputFocusStyle })}
                  onBlur={(e) => Object.assign(e.currentTarget.style, { ...inputStyle, paddingRight: '48px' })}
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showLoginPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {loginError && (
              <p
                className="text-sm px-4 py-3 rounded-xl"
                style={{
                  color: '#fb7185',
                  background: 'rgba(193,43,77,0.08)',
                  border: '1px solid rgba(193,43,77,0.18)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {loginError}
              </p>
            )}

            <button
              type="submit"
              disabled={loginLoading}
              className="w-full py-3.5 rounded-2xl font-semibold text-white text-sm mt-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                boxShadow: '0 6px 24px rgba(144,68,235,0.35)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {loginLoading ? 'Iniciando…' : 'Iniciar sesión'}
            </button>

            <p
              className="text-center text-xs text-slate-500 mt-1"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => setTab('register')}
                className="text-purple-400 hover:text-purple-300 transition-colors focus:outline-none"
              >
                Créala gratis
              </button>
            </p>
          </form>
        )}

        {/* REGISTER FORM */}
        {tab === 'register' && (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label
                className="block text-xs text-slate-400 mb-1.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Nombre completo
              </label>
              <input
                type="text"
                required
                placeholder="Tu nombre"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
              />
            </div>
            <div>
              <label
                className="block text-xs text-slate-400 mb-1.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Correo electrónico
              </label>
              <input
                type="email"
                required
                placeholder="tucorreo@email.com"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className={inputClass}
                style={inputStyle}
                onFocus={(e) => Object.assign(e.currentTarget.style, inputFocusStyle)}
                onBlur={(e) => Object.assign(e.currentTarget.style, inputStyle)}
              />
            </div>
            <div>
              <label
                className="block text-xs text-slate-400 mb-1.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showRegPw ? 'text' : 'password'}
                  required
                  placeholder="Mínimo 6 caracteres"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  className={inputClass}
                  style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={(e) => Object.assign(e.currentTarget.style, { ...inputStyle, paddingRight: '48px', ...inputFocusStyle })}
                  onBlur={(e) => Object.assign(e.currentTarget.style, { ...inputStyle, paddingRight: '48px' })}
                />
                <button
                  type="button"
                  onClick={() => setShowRegPw((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showRegPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label
                className="block text-xs text-slate-400 mb-1.5"
                style={{ fontFamily: 'DM Sans, sans-serif' }}
              >
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  type={showRegConfirm ? 'text' : 'password'}
                  required
                  placeholder="Repite tu contraseña"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  className={inputClass}
                  style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={(e) => Object.assign(e.currentTarget.style, { ...inputStyle, paddingRight: '48px', ...inputFocusStyle })}
                  onBlur={(e) => Object.assign(e.currentTarget.style, { ...inputStyle, paddingRight: '48px' })}
                />
                <button
                  type="button"
                  onClick={() => setShowRegConfirm((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors focus:outline-none"
                >
                  {showRegConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {regError && (
              <p
                className="text-sm px-4 py-3 rounded-xl"
                style={{
                  color: '#fb7185',
                  background: 'rgba(193,43,77,0.08)',
                  border: '1px solid rgba(193,43,77,0.18)',
                  fontFamily: 'DM Sans, sans-serif',
                }}
              >
                {regError}
              </p>
            )}

            <button
              type="submit"
              disabled={regLoading}
              className="w-full py-3.5 rounded-2xl font-semibold text-white text-sm mt-2 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: 'linear-gradient(135deg, #2474D5, #9044EB)',
                boxShadow: '0 6px 24px rgba(144,68,235,0.35)',
                fontFamily: 'DM Sans, sans-serif',
              }}
            >
              {regLoading ? 'Creando cuenta…' : 'Crear cuenta gratis'}
            </button>

            <p
              className="text-center text-xs text-slate-500 mt-1"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              ¿Ya tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => setTab('login')}
                className="text-purple-400 hover:text-purple-300 transition-colors focus:outline-none"
              >
                Inicia sesión
              </button>
            </p>

            <p
              className="text-center text-[11px] text-slate-600 leading-relaxed"
              style={{ fontFamily: 'DM Sans, sans-serif' }}
            >
              Cuenta temporal - los datos se eliminan al cerrar el navegador.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
