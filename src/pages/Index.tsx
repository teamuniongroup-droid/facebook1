import { useState, useEffect, useRef, memo } from "react";
import turbinadorImg from "@/assets/turbinador.png";
import bonusImg from "@/assets/bonusimg.png";
import garantiaImg from "@/assets/garantia30dias.png";
import drMiguelImg from "@/assets/dr-miguel.png";
import reactLike from "@/assets/react-like.png";
import reactLove from "@/assets/react-love.png";
import reactWow from "@/assets/react-wow.png";

const HOTMART_LINK = "https://uniongroup.mycartpanda.com/checkout/207849699:1";

const CTAButton = ({ children }: { children: React.ReactNode }) => (
  <div className="flex flex-col items-center gap-2 my-4">
    <a
      href={HOTMART_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block bg-accent border border-accent/80 text-accent-foreground px-10 py-4 rounded-full font-bold text-lg no-underline animate-pulse-btn"
    >
      {children}
    </a>
    <a
      href={HOTMART_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[hsl(220,46%,48%)] text-lg underline"
    >
      Agregar al carrito
    </a>
  </div>
);

const MenuDotsIcon = () => (
  <svg viewBox="0 0 20 20" className="w-5 h-5" fill="hsl(215, 8%, 47%)">
    <path d="M10 4C11.105 4 12 3.105 12 2S11.105 0 10 0 8 .895 8 2s.895 2 2 2zm0 6c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm0 6c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" />
  </svg>
);

/* Facebook Header - mobile style: logo left, icons right */
const FBHeader = memo(() => (
  <header className="bg-card shadow-sm border-b border-border">
    <div className="max-w-[680px] mx-auto flex items-center justify-between px-4 h-[56px]">
      <span className="text-[hsl(220,46%,48%)] text-[28px] font-bold tracking-tight" style={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
        facebook
      </span>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-border transition-colors">
          <svg viewBox="0 0 20 20" className="w-5 h-5" fill="hsl(214, 13%, 17%)">
            <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
          </svg>
        </div>
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-border transition-colors">
          <svg viewBox="0 0 20 20" className="w-5 h-5" fill="hsl(214, 13%, 17%)">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="w-9 h-9 rounded-full bg-secondary flex items-center justify-center cursor-pointer hover:bg-border transition-colors">
          <svg viewBox="0 0 24 24" className="w-5 h-5" fill="hsl(214, 13%, 17%)">
            <path d="M12 2C10.9 2 10 2.9 10 4C10 4.1 10 4.19 10.02 4.28C7.58 5.16 6 7.41 6 10V15L4 17V18H20V17L18 15V10C18 7.41 16.42 5.16 13.98 4.28C14 4.19 14 4.1 14 4C14 2.9 13.1 2 12 2ZM12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22Z" />
          </svg>
        </div>
      </div>
    </div>
  </header>
));
FBHeader.displayName = 'FBHeader';

const formatViewers = (n: number) => {
  if (n >= 1000) return `${(n / 1000).toFixed(1).replace('.0', '')} mil`;
  return n.toString();
};

const Index = () => {
  const showSections = true;
  const [viewers, setViewers] = useState(3700);
  const viewersRef = useRef(3700);
  const [reactions, setReactions] = useState({ like: 1847, love: 432, wow: 156 });
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showReactionPicker, setShowReactionPicker] = useState(false);
  const longPressTimer = useRef<NodeJS.Timeout | null>(null);
  const [shared, setShared] = useState(false);
  const [shares, setShares] = useState(312);
  const didLongPress = useRef(false);
  const [startTime] = useState(() => Date.now());

  const isBoosted = () => Date.now() - startTime < 17000;

  useEffect(() => {
    const maxViewers = 12309;
    const timer = setInterval(() => {
      setViewers(prev => {
        if (prev >= maxViewers) return maxViewers;
        const remaining = maxViewers - prev;
        const boost = isBoosted() ? 3 : 1;
        const increment = Math.max(1, Math.floor(Math.random() * Math.min(remaining * 0.02, 15) * boost) + 1);
        const next = Math.min(prev + increment, maxViewers);
        viewersRef.current = next;
        return next;
      });
    }, isBoosted() ? 600 + Math.random() * 800 : 1500 + Math.random() * 2000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const run = () => {
      const boosted = isBoosted();
      const delay = boosted ? 500 + Math.random() * 800 : 2000 + Math.random() * 3000;
      const timer = setTimeout(() => {
        setReactions(prev => {
          const total = prev.like + prev.love + prev.wow;
          const maxReactions = Math.floor(viewersRef.current * 0.6);
          if (total >= maxReactions) return prev;
          const multiplier = boosted ? 3 : 1;
          const rand = Math.random();
          if (rand < 0.6) {
            const inc = Math.ceil(Math.random() * 3 * multiplier);
            return (total + inc <= maxReactions) ? { ...prev, like: prev.like + inc } : prev;
          }
          if (rand < 0.85) {
            const inc = Math.ceil(Math.random() * 2 * multiplier);
            return (total + inc <= maxReactions) ? { ...prev, love: prev.love + inc } : prev;
          }
          const inc = Math.ceil(multiplier);
          return (total + inc <= maxReactions) ? { ...prev, wow: prev.wow + inc } : prev;
        });
        run();
      }, delay);
      return timer;
    };
    const timer = run();
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const run = () => {
      const delay = 7000 + Math.random() * 10000;
      const timer = setTimeout(() => {
        setShares(prev => prev + 1);
        run();
      }, delay);
      return timer;
    };
    const timer = run();
    return () => clearTimeout(timer);
  }, []);

  // Vturb video player
  useEffect(() => {
    const container = document.getElementById('vturb-container');
    if (!container) return;
    const player = document.createElement('vturb-smartplayer') as any;
    player.id = 'vid-699b46dcc89dd0b2f580df73';
    player.style.cssText = 'display: block; margin: 0 auto; width: 100%;';
    container.appendChild(player);

    const s = document.createElement('script');
    s.src = 'https://scripts.converteai.net/d0d64cb2-dca3-4be6-983c-3bc700b6a1d8/players/699b46dcc89dd0b2f580df73/v4/player.js';
    s.async = true;
    document.head.appendChild(s);

    const style = document.createElement('style');
    style.textContent = '.esconder { display: none; }';
    document.head.appendChild(style);

    player.addEventListener('player:ready', function() {
      (player as any).displayHiddenElements(1036, ['.esconder'], { persist: true });

      const observer = new MutationObserver(() => {
        const ctaSection = document.getElementById('cta-section');
        if (ctaSection && ctaSection.offsetParent !== null) {
          ctaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          observer.disconnect();
        }
      });
      observer.observe(document.body, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] });
    });

    return () => { s.remove(); style.remove(); };
  }, []);

  const totalReactions = reactions.like + reactions.love + reactions.wow;

  const handleReaction = (type: string) => {
    if (userReaction === type) {
      setReactions(prev => ({ ...prev, [type]: prev[type as keyof typeof prev] - 1 }));
      setUserReaction(null);
    } else {
      if (userReaction) {
        setReactions(prev => ({ ...prev, [userReaction as keyof typeof prev]: prev[userReaction as keyof typeof prev] - 1 }));
      }
      setReactions(prev => ({ ...prev, [type]: prev[type as keyof typeof prev] + 1 }));
      setUserReaction(type);
    }
    setShowReactionPicker(false);
  };

  const handleLikeClick = () => {
    if (didLongPress.current) {
      didLongPress.current = false;
      return;
    }
    if (userReaction) {
      setReactions(prev => ({ ...prev, [userReaction as keyof typeof prev]: prev[userReaction as keyof typeof prev] - 1 }));
      setUserReaction(null);
    }
  };

  const handleLongPressStart = () => {
    if (userReaction) return;
    didLongPress.current = false;
    longPressTimer.current = setTimeout(() => {
      didLongPress.current = true;
      setShowReactionPicker(true);
    }, 500);
  };

  const handleLongPressEnd = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    handleLongPressEnd();
    if (didLongPress.current) {
      e.preventDefault();
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif" }}>
      <FBHeader />

      <div className="max-w-[680px] mx-auto py-4 px-2">
        <div className="bg-card rounded-xl shadow-sm border border-border">
          {/* Post header */}
          <div className="flex items-center justify-between px-4 pt-3 pb-2">
            <div className="flex items-center gap-3">
              <img src={drMiguelImg} alt="Dr. Miguel" className="w-10 h-10 rounded-full object-cover" width={40} height={40} />
              <div>
                <div className="flex items-center gap-1">
                  <span className="text-[15px] font-semibold text-foreground hover:underline cursor-pointer">Dr. Miguel</span>
                  <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="hsl(220, 46%, 48%)">
                    <path d="M8 0C3.582 0 0 3.582 0 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8zm3.535 6.381l-4 4a.75.75 0 01-1.061 0l-2-2a.75.75 0 011.06-1.061L7 8.793l3.474-3.474a.75.75 0 011.061 1.061z" />
                  </svg>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 text-red-500 font-semibold">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    En vivo
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-full hover:bg-secondary flex items-center justify-center cursor-pointer">
                <MenuDotsIcon />
              </div>
            </div>
          </div>

          {/* Post text */}
          <div className="px-4 py-2">
            <h1 className="text-foreground text-[15px] md:text-xl font-bold leading-snug">
              🔊 Sube el volumen para ver la Presentación...
            </h1>
          </div>

          {/* Video Player - LIVE */}
          <div className="overflow-hidden relative">
            <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
              <div id="vturb-container" className="absolute top-0 left-0 w-full h-full" />
              <div className="absolute top-3 left-3 flex items-center gap-1 bg-black/60 text-white px-2 py-1 rounded-md text-xs font-semibold z-10">
                <svg viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="currentColor"><path d="M8 2C4.318 2 1.09 4.58.066 8c1.024 3.42 4.252 6 7.934 6s6.91-2.58 7.934-6C14.91 4.58 11.682 2 8 2zm0 10a4 4 0 110-8 4 4 0 010 8zm0-6.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z"/></svg>
                {formatViewers(viewers)} viendo
              </div>
            </div>
          </div>

          {/* Live reactions bar */}
          <div className="flex items-center justify-between px-4 py-2.5">
            <div className="flex items-center gap-1">
              <div className="flex -space-x-0.5">
                <img src={reactLike} alt="Like" className="w-[18px] h-[18px] rounded-full object-contain" width={18} height={18} />
                <img src={reactLove} alt="Love" className="w-[18px] h-[18px] rounded-full object-contain" width={18} height={18} />
                <img src={reactWow} alt="Wow" className="w-[18px] h-[18px] rounded-full object-contain" width={18} height={18} />
              </div>
              <span className="text-muted-foreground text-[13px] ml-0.5">{formatViewers(totalReactions)}</span>
            </div>
            <div className="flex items-center gap-4 text-muted-foreground text-[13px]">
              <span>{shares} compartidos</span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center border-t border-b border-border px-2 py-1">
            <div
              className="relative flex-1"
              onMouseEnter={() => setShowReactionPicker(true)}
              onMouseLeave={() => { setShowReactionPicker(false); handleLongPressEnd(); }}
            >
              {showReactionPicker && (
                <div className="absolute bottom-full left-0 mb-2 flex items-center gap-1 bg-card border border-border rounded-full px-2 py-1.5 shadow-lg z-20 animate-in fade-in slide-in-from-bottom-2 duration-200">
                  <button onClick={() => handleReaction('like')} className={`transition-transform hover:scale-125 p-1 rounded-full ${userReaction === 'like' ? 'bg-accent' : ''}`} title="Me gusta">
                    <img src={reactLike} alt="Me gusta" className="w-8 h-8 object-contain pointer-events-none select-none" draggable={false} width={32} height={32} />
                  </button>
                  <button onClick={() => handleReaction('love')} className={`transition-transform hover:scale-125 p-1 rounded-full ${userReaction === 'love' ? 'bg-accent' : ''}`} title="Me encanta">
                    <img src={reactLove} alt="Me encanta" className="w-8 h-8 object-contain pointer-events-none select-none" draggable={false} width={32} height={32} />
                  </button>
                  <button onClick={() => handleReaction('wow')} className={`transition-transform hover:scale-125 p-1 rounded-full ${userReaction === 'wow' ? 'bg-accent' : ''}`} title="Asombro">
                    <img src={reactWow} alt="Asombro" className="w-8 h-8 object-contain pointer-events-none select-none" draggable={false} width={32} height={32} />
                  </button>
                </div>
              )}

              <button
                onClick={handleLikeClick}
                onMouseDown={handleLongPressStart}
                onMouseUp={handleLongPressEnd}
                onTouchStart={handleLongPressStart}
                onTouchEnd={handleTouchEnd}
                onTouchCancel={handleLongPressEnd}
                className={`flex items-center justify-center gap-2 py-2 px-3 rounded-md hover:bg-secondary transition-colors w-full ${userReaction ? 'font-semibold' : 'text-muted-foreground'}`}
              >
                {userReaction ? (
                  <img src={userReaction === 'like' ? reactLike : userReaction === 'love' ? reactLove : reactWow} alt="Reacción" className="w-5 h-5 object-contain pointer-events-none select-none" draggable={false} width={20} height={20} />
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                  </svg>
                )}
                <span className={`text-[13px] ${userReaction === 'like' ? 'text-blue-500' : userReaction === 'love' ? 'text-red-500' : userReaction === 'wow' ? 'text-yellow-500' : ''}`}>
                  {userReaction === 'like' ? 'Me gusta' : userReaction === 'love' ? 'Me encanta' : userReaction === 'wow' ? 'Asombro' : 'Me gusta'}
                </span>
              </button>
            </div>

            <button
              onClick={() => setShared(prev => !prev)}
              className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md hover:bg-secondary transition-colors ${shared ? 'text-blue-500 font-semibold' : 'text-muted-foreground'}`}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 1l4 4-4 4" /><path d="M3 11V9a4 4 0 0 1 4-4h14" /><path d="M7 23l-4-4 4-4" /><path d="M21 13v2a4 4 0 0 1-4 4H3" />
              </svg>
              <span className="text-[13px]">{shared ? 'Compartido' : 'Compartir'}</span>
            </button>
          </div>

          {/* Comments disabled */}
          <div className="px-4 py-3 border-t border-border">
            <div className="flex items-center justify-center gap-2 bg-secondary rounded-full py-2.5 px-4">
              <svg viewBox="0 0 20 20" className="w-4 h-4 text-muted-foreground flex-shrink-0" fill="currentColor">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-muted-foreground text-[13px]">Los comentarios están desactivados en este momento.</span>
            </div>
          </div>

          {/* Post content sections */}
          {showSections && (
            <div className="animate-fade-in px-4 py-4 text-center esconder">
              <section id="cta-section" className="mb-8">
                <p className="text-2xl md:text-3xl font-extrabold mb-2 tracking-tight">
                  <span className="text-muted-foreground opacity-70 text-lg md:text-xl" style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>De $287</span>
                  {" "}por solo{" "}
                  <span className="text-green-500 text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}>$37</span>
                </p>
                <CTAButton>haga clic aquí</CTAButton>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-6" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}>
                  Aquí está todo lo que recibirá...
                </h2>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="hidden md:block md:w-2/5">
                    <img src={turbinadorImg} alt="APP Maximizador de Potencia" className="w-full max-w-lg mx-auto" loading="lazy" />
                  </div>
                  <div className="md:w-3/5 text-left">
                    <h3 className="text-xl font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}>APP Maximizador de Potencia</h3>
                    <p className="mb-4 text-muted-foreground">
                      Guía completa de técnicas y recetas para hacerte sentir como un alfa de nuevo en la cama con tu pareja en cuestión de días.
                    </p>
                    <div className="block md:hidden mb-4">
                      <img src={turbinadorImg} alt="APP Maximizador de Potencia" className="w-full max-w-[200px] mx-auto" loading="lazy" />
                    </div>
                    <ol className="list-decimal list-inside space-y-2 text-left">
                      <li><strong>La mezcla principal para potenciar el rendimiento;</strong></li>
                      <li><strong>Secretos de nutrición para darle aún más rigidez a su erección;</strong></li>
                      <li><strong>Una guía completa para que evite los asesinos de la erección de sus comidas;</strong></li>
                      <li><strong>Viagra Invisible: qué hacer si está perdiendo la erección en medio del sexo;</strong></li>
                      <li><strong>Enfoque mental: un truco simple que aumenta la erección en cualquier momento;</strong></li>
                      <li><strong>Un truco simple al que llamo "Noche del rey" que te brinda erecciones matutinas súper potentes;</strong></li>
                      <li><strong>Reparador de Disfunciones: Este ejercicio que puedes hacer cada vez que vayas al baño.</strong></li>
                    </ol>
                    <p className="text-red-600 text-2xl font-bold text-center mt-4">(Valor $147)</p>
                  </div>
                </div>
              </section>

              <section className="mb-8">
                <img src={bonusImg} alt="Bonos exclusivos" className="w-full max-w-sm mx-auto mb-4" loading="lazy" />
                <p className="text-muted-foreground mb-4">
                  Garantizando hoy tu acceso al APP Maximizador de Potencia, te asegurarás de forma totalmente gratuita los increíbles bonos:
                </p>
                <ol className="list-decimal list-inside space-y-2 text-left max-w-md mx-auto mb-4">
                  <li><strong>Erecciones instantáneas;</strong></li>
                  <li><strong>Turbina de testosterona de 7 minutos;</strong></li>
                  <li><strong>Guía de alimentos para el poder masculino.</strong></li>
                </ol>
                <p className="text-red-600 text-2xl font-bold">(Valor $140)</p>
              </section>

              <section className="mb-8">
                <p className="text-muted-foreground text-lg mb-1">Valor total de todo el paquete:</p>
                <p className="text-2xl font-bold mb-3" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}>
                  <span className="text-muted-foreground opacity-70" style={{ textDecoration: 'line-through', textDecorationColor: 'red' }}>$287</span>
                </p>
                <h2 className="text-2xl font-bold mb-2" style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800 }}>
                  Hoy todo esto por solo <span className="text-green-500 text-4xl md:text-5xl font-extrabold" style={{ fontFamily: "'Georgia', serif", fontStyle: "italic" }}>$37</span>
                </h2>
                <h4 className="text-lg text-muted-foreground mb-4">
                  Obtén acceso completo al APP Maximizador de Potencia y a los bonos con DESCUENTO
                </h4>
              </section>

              <section className="mb-8">
                <CTAButton>Quiero ser parte ahora</CTAButton>
              </section>

              <section className="mb-8 text-center">
                <img src={garantiaImg} alt="Garantía de 30 días" className="w-44 mx-auto mb-4" loading="lazy" />
                <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-md mx-auto">
                  Si no ves resultados en 30 días, te devolvemos el 100% de tu dinero. Sin preguntas, sin complicaciones.
                </p>
              </section>
            </div>
          )}
        </div>
      </div>

      <div className="text-center text-sm text-muted-foreground p-4 max-w-[680px] mx-auto">
        <p>© Copyright 2026</p>
      </div>
    </div>
  );
};

export default Index;
