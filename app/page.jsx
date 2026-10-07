'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { Activity, Heart, TrendingDown, Plane, IndianRupee, Timer, Crown, Moon, ArrowRight, Menu, X } from 'lucide-react';

// Pre-generated random-looking powder flakes to avoid hydration mismatch
const FLAKES = Array.from({ length: 80 }).map((_, i) => ({
  id: i,
  top: `${Math.random() * 120 - 10}%`,
  left: `${Math.random() * 120 - 10}%`,
  width: `${Math.random() * 8 + 3}px`,
  height: `${Math.random() * 8 + 3}px`,
  rotate: `${Math.random() * 360}deg`,
  borderRadius: `${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}% ${30 + Math.random() * 40}%`,
  backgroundColor: ['#b38b6d', '#a07555', '#d4b499', '#8a5a3a'][i % 4],
  opacity: Math.random() * 0.6 + 0.4,
  layer: i % 3, // 0: back, 1: middle, 2: front
}));

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 2);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Combine scroll progress and mouse position for 3D parallax
  const x1 = useTransform(smoothMouseX, [-1, 1], [30, -30]);
  const y1 = useTransform(
    [scrollYProgress, smoothMouseY], 
    ([s, m]) => (s * 400 - 200) + (m * -30)
  );

  const x2 = useTransform(smoothMouseX, [-1, 1], [-50, 50]);
  const y2 = useTransform(
    [scrollYProgress, smoothMouseY], 
    ([s, m]) => (s * -300 + 150) + (m * 50)
  );

  const x3 = useTransform(smoothMouseX, [-1, 1], [80, -80]);
  const y3 = useTransform(
    [scrollYProgress, smoothMouseY], 
    ([s, m]) => (s * 550 - 250) + (m * -80)
  );

  const y4 = useTransform(scrollYProgress, [0, 1], [250, -250]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main>
      <nav className="navbar">
        <div className="nav-brand">FIBREVITA</div>
        <div className="nav-links">
          <a href="#products">SHOP</a>
          <a href="#why-fiber">SCIENCE</a>
          <a href="#recipes">HACKS</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <a href="#products" className="btn btn-strawberry nav-cta">
            BUY NOW
          </a>
          <button className="menu-toggle" onClick={() => setMenuOpen(true)}>
            <Menu size={32} color="#000" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div className="mobile-menu-overlay">
          <div className="mobile-menu-header">
            <div className="nav-brand">FIBREVITA</div>
            <button className="menu-toggle" onClick={() => setMenuOpen(false)}>
              <X size={32} color="#000" />
            </button>
          </div>
          <div className="mobile-menu-links">
            <a href="#products" onClick={() => setMenuOpen(false)}>SHOP</a>
            <a href="#why-fiber" onClick={() => setMenuOpen(false)}>SCIENCE</a>
            <a href="#recipes" onClick={() => setMenuOpen(false)}>HACKS</a>
          </div>
        </div>
      )}

      <section className="hero-new">
        {/* Left Side: Massive Branding */}
        <div className="hero-brand-group">
          <div className="hero-tagline">100% NATURAL</div>
          <div className="hero-massive-name">FIBREVITA</div>
          <div className="hero-subname">POWER HUSK</div>
        </div>

        {/* Center: Strongman */}
        <img src="/strongman_wheat.png" alt="Strongman" className="hero-character" />
        {/* Right Side: Stats & Details */}
        <div className="hero-stats-group">
          <div className="hero-stat-huge">15<span style={{ fontSize: '0.6em' }}>G</span> FIBER</div>
          <div className="hero-stat-sub">PER SERVING</div>
          
          <div className="hero-bullets">
            <div className="hero-bullet">ZERO CLUMPING</div>
            <div className="hero-bullet">NO CHALKY TASTE*</div>
            <div className="hero-bullet">FIGHTS CRAVINGS</div>
          </div>
        </div>

        {/* Bottom Center: CTA */}
        <a href="#products" className="hero-cta">
          SHOP NOW
        </a>

        {/* Bottom Right: Products */}
        <div className="hero-products">
          <img src="/plain.png" alt="Plain" className="hero-product-1" />
          <img src="/strawberry.png" alt="Strawberry" className="hero-product-2" />
          <img src="/orange.png" alt="Orange" className="hero-product-3" />
        </div>
        
        {/* Bottom Decorative Fields */}
        <div className="hero-ground"></div>
      </section>

      <div className="marquee-wrapper">
        <div className="marquee-content">
          <span className="marquee-item">ZERO CLUMP, ALL FLAVOR</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">FIGHT 3PM CRAVINGS</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">STEALTH HEALTH</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">ZERO CLUMP, ALL FLAVOR</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">FIGHT 3PM CRAVINGS</span>
          <span className="marquee-item">✦</span>
          <span className="marquee-item">STEALTH HEALTH</span>
          <span className="marquee-item">✦</span>
        </div>
      </div>

      <section id="products" className="section">
        <div className="container">
          <h2 className="section-title">CHOOSE YOUR FUEL</h2>
          <div className="grid-3">
            {/* Zesty Orange */}
            <div className="product-card">
              <div className="product-image-container" style={{ background: '#ffe4cc', padding: 0 }}>
                <img src="/orange.png" alt="Zesty Orange Sachet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3 className="product-title">ZESTY ORANGE</h3>
                <p className="product-desc">A refreshing afternoon drink that fights the 3 PM snack craving.</p>
                <div className="product-price">₹1,999</div>
                <button className="btn btn-primary">ADD TO CART</button>
              </div>
            </div>

            {/* Sweet Strawberry */}
            <div className="product-card">
              <div className="product-image-container" style={{ background: '#ffccd8', padding: 0 }}>
                <img src="/strawberry.png" alt="Sweet Strawberry Sachet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3 className="product-title">SWEET STRAWBERRY</h3>
                <p className="product-desc">The perfect dose to curb your appetite without the bloating.</p>
                <div className="product-price">₹1,999</div>
                <button className="btn btn-strawberry">ADD TO CART</button>
              </div>
            </div>

            {/* Plain */}
            <div className="product-card">
              <div className="product-image-container" style={{ background: '#e0e0e0', padding: 0 }}>
                <img src="/plain.png" alt="Plain 100% Sachet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div className="product-info">
                <h3 className="product-title">PLAIN 100%</h3>
                <p className="product-desc">Blends invisibly into your favorite smoothies, oats, and baked goods.</p>
                <div className="product-price">₹1,799</div>
                <button className="btn btn-yellow">ADD TO CART</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="split-section" id="why-fiber">
        <div className="split-half">
          <h2>THE FULLNESS FACTOR.</h2>
          <p style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '40px' }}>
            If you have ever tried to maintain a clean diet, you know the real enemy is the 3 PM snack craving. The secret weapon isn’t willpower. It’s soluble fiber.
          </p>
          <div className="feature-item">
            <h3>SLOWS DIGESTION</h3>
            <p>Keeps you biologically fuller for longer periods.</p>
          </div>
          <div className="feature-item">
            <h3>STABILIZES SUGAR</h3>
            <p>Prevents the sharp spikes and crashes that trigger sudden hunger pangs.</p>
          </div>
        </div>
        <div className="split-half" style={{ background: 'var(--accent-yellow)', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
          <img src="/science.png" alt="Science Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.5, mixBlendMode: 'multiply' }} />
          <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="stat-title">
            ONLY<br/>15G
          </h2>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '24px' }}>
            THE AVERAGE ADULT BARELY SCRAPES TOGETHER 15G OF FIBER A DAY.
          </p>
          <p style={{ fontSize: '1.5rem', marginTop: '24px' }}>
            Health authorities recommend 25g to 38g. You are running on empty.
          </p>
          </div>
        </div>
      </div>

      <section id="recipes" className="section section-dark" style={{ position: 'relative', overflow: 'hidden' }}>
        <img src="/recipes.png" alt="Recipes Background" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, opacity: 0.4 }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h2 className="section-title" style={{ color: '#fff' }}>STEALTH HEALTH</h2>
          <div className="grid-3">
            <div className="brutalist-card" style={{ background: 'var(--accent-blue)', color: '#fff' }}>
              <h3 style={{ fontSize: '3rem', marginBottom: '16px' }}>SMOOTHIE BOOST</h3>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Don't change your favorite recipe. Drop in one Plain sachet right before blending. It gives a rich, creamy, milkshake-like texture.
              </p>
            </div>
            <div className="brutalist-card" style={{ background: 'var(--accent-orange)' }}>
              <h3 style={{ fontSize: '3rem', marginBottom: '16px' }}>OATMEAL POWER</h3>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                Stirring a sachet into warm oatmeal makes it incredibly voluminous. Psyllium absorbs liquid, keeping you full well past lunchtime.
              </p>
            </div>
            <div className="brutalist-card" style={{ background: 'var(--accent-yellow)', color: '#000' }}>
              <h3 style={{ fontSize: '3rem', marginBottom: '16px' }}>BETTER BAKING</h3>
              <p style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
                A holy grail ingredient for gluten-free baking. Add moisture, structure, and essential dietary fiber to batters without altering flavor.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="featured-section">
        <h2 className="featured-title">AVAILABLE ON</h2>
        <div className="featured-logos">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="logo-img" style={{ height: '35px' }} />
          <img src="https://www.google.com/s2/favicons?sz=256&domain_url=flipkart.com" alt="Flipkart" className="logo-img" style={{ height: '40px', borderRadius: '8px' }} />
          <img src="https://www.google.com/s2/favicons?sz=256&domain_url=blinkit.com" alt="Blinkit" className="logo-img" style={{ height: '40px', borderRadius: '8px' }} />
          <img src="https://www.google.com/s2/favicons?sz=256&domain_url=zeptonow.com" alt="Zepto" className="logo-img" style={{ height: '40px', borderRadius: '8px' }} />
          <img src="https://www.google.com/s2/favicons?sz=256&domain_url=swiggy.com" alt="Instamart" className="logo-img" style={{ height: '40px', borderRadius: '8px' }} />
        </div>
      </section>

      <section className="why-section" ref={containerRef}>
        <div className="why-banner-container" style={{ position: 'relative' }}>
          
          {/* Powder Parallax Layers */}
          <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, x: x1, y: y1, zIndex: 1, pointerEvents: 'none' }}>
            {FLAKES.filter(f => f.layer === 0).map(f => (
              <div key={f.id} style={{ position: 'absolute', top: f.top, left: f.left, width: f.width, height: f.height, rotate: f.rotate, borderRadius: f.borderRadius, backgroundColor: f.backgroundColor, opacity: f.opacity, filter: 'blur(1px)' }} />
            ))}
          </motion.div>

          <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, x: x2, y: y2, zIndex: 3, pointerEvents: 'none' }}>
            {FLAKES.filter(f => f.layer === 1).map(f => (
              <div key={f.id} style={{ position: 'absolute', top: f.top, left: f.left, width: f.width, height: f.height, rotate: f.rotate, borderRadius: f.borderRadius, backgroundColor: f.backgroundColor, opacity: f.opacity, boxShadow: '1px 2px 2px rgba(0,0,0,0.1)' }} />
            ))}
          </motion.div>

          <div className="why-banner" style={{ zIndex: 5, position: 'relative' }}>
            <span style={{ position: 'relative', zIndex: 10 }}>WHY FIBREVITA?</span>
            
            {/* Front powder layer (overlaps the pink banner, but behind the text) */}
            <motion.div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, x: x3, y: y3, zIndex: 1, pointerEvents: 'none' }}>
              {FLAKES.filter(f => f.layer === 2).map(f => (
                <div key={f.id} style={{ position: 'absolute', top: f.top, left: f.left, width: f.width, height: f.height, rotate: f.rotate, borderRadius: f.borderRadius, backgroundColor: f.backgroundColor, opacity: f.opacity, boxShadow: '2px 3px 3px rgba(0,0,0,0.2)' }} />
              ))}
            </motion.div>
          </div>
        </div>
        <div className="container">
          <p className="why-subtitle">TODAY, THERE IS A BETTER WAY TO GET YOUR FIBER.<br/>ESPECIALLY IF YOU ARE BUSY ABOUT IT.</p>
          <div className="grid-4 features-grid">
            
            {/* Gut Health */}
            <div className="feature-card">
              <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                {/* Slanted Tape */}
                <div style={{ position: 'absolute', width: '160px', height: '70px', background: 'var(--accent-strawberry)', transform: 'rotate(-5deg) skewX(-10deg)', zIndex: 0 }} />
                {/* Icon with halo & shadow */}
                <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(4px 4px 0px #000)', transform: 'rotate(3deg)' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                    <Activity size={70} strokeWidth={8} color="#fff" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <Activity size={70} strokeWidth={2.5} color="#000" style={{ position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </div>
                {/* Badge */}
                <div style={{ position: 'absolute', bottom: '15px', right: '5%', background: '#000', color: '#fff', fontFamily: "'Anton', sans-serif", padding: '4px 10px', fontSize: '1rem', transform: 'rotate(-8deg)', zIndex: 2, border: '2px solid #fff' }}>
                  NO BLOAT
                </div>
              </div>
              <h3 className="feature-title">GUT HEALTH</h3>
              <p className="feature-desc">Promotes a healthy microbiome and keeps your digestion running like clockwork. No bloating, just balance.</p>
            </div>

            {/* Heart Health */}
            <div className="feature-card">
              <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'absolute', width: '160px', height: '70px', background: 'var(--accent-strawberry)', transform: 'rotate(6deg) skewX(10deg)', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(4px 4px 0px #000)', transform: 'rotate(-4deg)' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                    <Heart size={70} strokeWidth={8} color="#fff" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <Heart size={70} strokeWidth={2.5} color="#000" style={{ position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '15px', right: '0%', background: '#000', color: '#fff', fontFamily: "'Anton', sans-serif", padding: '4px 10px', fontSize: '1rem', transform: 'rotate(12deg)', zIndex: 2, border: '2px solid #fff' }}>
                  100% PURE
                </div>
              </div>
              <h3 className="feature-title">HEART HEALTH</h3>
              <p className="feature-desc">Soluble fiber acts like a sponge, trapping cholesterol and removing it from your body. Essential for cardiovascular strength.</p>
            </div>

            {/* Blood Sugar */}
            <div className="feature-card">
              <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'absolute', width: '160px', height: '70px', background: 'var(--accent-strawberry)', transform: 'rotate(-3deg) skewX(5deg)', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(4px 4px 0px #000)', transform: 'rotate(5deg)' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                    <TrendingDown size={70} strokeWidth={8} color="#fff" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <TrendingDown size={70} strokeWidth={2.5} color="#000" style={{ position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', bottom: '10px', left: '0%', background: '#000', color: '#fff', fontFamily: "'Anton', sans-serif", padding: '4px 10px', fontSize: '1rem', transform: 'rotate(-5deg)', zIndex: 2, border: '2px solid #fff' }}>
                  STABLE ENERGY
                </div>
              </div>
              <h3 className="feature-title">BLOOD SUGAR</h3>
              <p className="feature-desc">Slows down the absorption of sugar, preventing massive crashes and keeping your energy stable.</p>
            </div>

            {/* Convenience */}
            <div className="feature-card">
              <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'absolute', width: '160px', height: '70px', background: 'var(--accent-strawberry)', transform: 'rotate(8deg) skewX(-5deg)', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(4px 4px 0px #000)', transform: 'rotate(-2deg)' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                    <Plane size={70} strokeWidth={8} color="#fff" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <Plane size={70} strokeWidth={2.5} color="#000" style={{ position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </div>
                <div style={{ position: 'absolute', top: '15px', left: '0%', background: '#000', color: '#fff', fontFamily: "'Anton', sans-serif", padding: '4px 10px', fontSize: '1rem', transform: 'rotate(-15deg)', zIndex: 2, border: '2px solid #fff' }}>
                  ON THE GO
                </div>
              </div>
              <h3 className="feature-title">CONVENIENCE</h3>
              <p className="feature-desc">Perfect for travel, busy schedules, and desk jobs. Single-serve packets that go wherever you do.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="nutrition-section" style={{ padding: '120px 0', background: 'var(--accent-yellow)', borderBottom: 'var(--border-thick)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          
          <div style={{ background: '#fff', border: 'var(--border-thick)', boxShadow: '16px 16px 0px 0px #000', padding: '40px', position: 'relative', marginTop: '40px' }}>
            <div className="nutrition-badge" style={{ position: 'absolute', top: '-25px', right: '-10px', background: 'var(--accent-orange)', border: 'var(--border-thick)', color: '#000', fontFamily: "'Anton', sans-serif", fontSize: '1.5rem', padding: '8px 16px', transform: 'rotate(5deg)', boxShadow: '4px 4px 0px 0px #000', zIndex: 10 }}>
              100% TRANSPARENT
            </div>

            <h2 className="large-title" style={{ marginTop: '10px' }}>NUTRITION FACTS</h2>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '4px solid #000', paddingBottom: '10px', marginBottom: '20px', fontWeight: 'bold', fontSize: '1.2rem', flexWrap: 'wrap', gap: '10px' }}>
              <span>Serving Size: 5.5g</span>
              <span>30 Sachets per Box</span>
            </div>
            
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', minWidth: '500px', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '4px solid #000', fontFamily: "'Newsflash', 'Anton', sans-serif", fontSize: '2.5rem', color: '#000' }}>
                    <th style={{ padding: '10px 0' }}>AMOUNT PER SERVING</th>
                    <th style={{ padding: '10px 0', textAlign: 'right' }}>VALUE</th>
                    <th style={{ padding: '10px 0', textAlign: 'right' }}>% DV*</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { label: "Energy (Calories)", val: "~16 Kcal", dv: "<1%" },
                    { label: "Total Carbohydrate", val: "~4.95 Gm", dv: "2%" },
                    { label: "Dietary Fiber", val: "~4.40 Gm", dv: "16%" },
                    { label: "Soluble Fiber", val: "~3.52 Gm", dv: "**" },
                    { label: "Total Sugars", val: "0 Gm", dv: "**" },
                    { label: "Sodium", val: "~5.5 mg", dv: "<1%" },
                    { label: "Iron", val: "~0.6 mg", dv: "3%" },
                    { label: "Potassium", val: "~45 mg", dv: "1%" },
                    { label: "Psyllium Husk", val: "5500mg (5.5Gm)", dv: "**" },
                  ].map((row, i) => (
                    <tr key={i} style={{ borderBottom: '2px solid #000' }}>
                      <td style={{ padding: '15px 0', fontFamily: "'Space Mono', monospace", fontWeight: 'bold', fontSize: '1.2rem', textTransform: 'uppercase' }}>{row.label}</td>
                      <td style={{ padding: '15px 0', textAlign: 'right', fontFamily: "'Space Mono', monospace", fontWeight: 'bold', fontSize: '1.2rem' }}>{row.val}</td>
                      <td style={{ padding: '15px 0', textAlign: 'right', fontFamily: "'Space Mono', monospace", fontWeight: 'bold', fontSize: '1.2rem', color: 'var(--accent-strawberry)' }}>{row.dv}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <p style={{ marginTop: '20px', fontWeight: 'bold', fontSize: '1.1rem', borderTop: '8px solid #000', paddingTop: '20px' }}>
              Other Ingredients: Citric Acid, Mannitol, Sucralose, Natural and artificial strawberry Flavour.
            </p>
          </div>
          
        </div>
      </section>

      <section className="reviews-section">
        <h2 className="section-title">TONS OF 5 STAR REVIEWS!</h2>
        <div className="container">
          <div className="grid-3">
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <h3 className="review-title">IT'S HONESTLY DELICIOUS</h3>
              <p className="review-text">I was skeptical about fiber supplements, but this blends instantly. No chalky taste. Absolutely amazing.</p>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <h3 className="review-title">WOW! TASTES TERRIFIC!!!</h3>
              <p className="review-text">I travel a lot for work and my digestion used to suffer. Fibrevita completely fixed my routine. The strawberry flavor is my favorite.</p>
            </div>
            <div className="review-card">
              <div className="stars">★★★★★</div>
              <h3 className="review-title">GREAT TASTE. PERFECT MACROS</h3>
              <p className="review-text">The best fiber supplement I've tried. Keeps me full until dinner and mixes effortlessly into my morning smoothie.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="subscribe-section" style={{ padding: '120px 0', background: 'var(--accent-yellow)', borderBottom: 'var(--border-thick)', position: 'relative', overflow: 'hidden' }}>
        
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          
          {/* Discount Badge */}
          <div className="subscribe-badge">
            <span className="subscribe-badge-title">15% OFF</span><br/>
            <span className="subscribe-badge-sub">EVERY ORDER</span>
            {/* The little triangle for speech bubble */}
            <div style={{ position: 'absolute', bottom: '-22px', left: '20px', width: 0, height: 0, borderLeft: '20px solid transparent', borderRight: '20px solid transparent', borderTop: '20px solid #000' }} />
            <div style={{ position: 'absolute', bottom: '-15px', left: '24px', width: 0, height: 0, borderLeft: '16px solid transparent', borderRight: '16px solid transparent', borderTop: '16px solid #fff' }} />
          </div>

          <div style={{ position: 'relative', display: 'inline-block', marginBottom: '20px' }}>
            <h2 className="subscribe-title">SUBSCRIBE & SAVE!</h2>
            {/* White sparkles */}
            <div style={{ position: 'absolute', top: '-10px', left: '-50px', fontSize: '3rem', color: '#fff', transform: 'rotate(-20deg)', zIndex: 1, textShadow: '2px 2px 0 #000' }}>✦</div>
            <div style={{ position: 'absolute', top: '10px', right: '-40px', fontSize: '2rem', color: '#fff', transform: 'rotate(15deg)', zIndex: 1, textShadow: '2px 2px 0 #000' }}>✦</div>
            <div style={{ position: 'absolute', bottom: '-10px', left: '40%', fontSize: '2rem', color: '#fff', transform: 'rotate(45deg)', zIndex: 1, textShadow: '2px 2px 0 #000' }}>✦</div>
          </div>
          
          <p style={{ fontSize: '1.5rem', fontWeight: 'bold', maxWidth: '800px', margin: '0 auto 80px', lineHeight: 1.4 }}>
            Get serious about getting FIBREVITA. Save money and make sure you always have some on hand. You make the rules.
          </p>

          <div className="grid-4 features-grid">
            {/* SAVE BIG */}
            <div className="feature-card">
              <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'absolute', width: '130px', height: '60px', background: '#fff', transform: 'rotate(-5deg) skewX(-10deg)', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(4px 4px 0px #000)', transform: 'rotate(3deg)' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                    <IndianRupee size={70} strokeWidth={8} color="#fff" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <IndianRupee size={70} strokeWidth={2.5} color="#000" style={{ position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </div>
                {/* Price tag badge */}
                <div style={{ position: 'absolute', top: '-10px', right: '5%', background: '#000', color: '#fff', fontFamily: "'Anton', sans-serif", padding: '4px 8px', transform: 'rotate(10deg)', zIndex: 2, border: '2px solid #fff' }}>
                  <span style={{ textDecoration: 'line-through', fontSize: '0.8rem', opacity: 0.8 }}>₹1,999</span><br/>
                  <span style={{ fontSize: '1.2rem' }}>₹1,699!</span>
                </div>
              </div>
              <h3 className="feature-title">SAVE BIG</h3>
            </div>

            {/* SAVE TIME */}
            <div className="feature-card">
              <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'absolute', width: '130px', height: '60px', background: '#fff', transform: 'rotate(4deg) skewX(5deg)', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(4px 4px 0px #000)', transform: 'rotate(-4deg)' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                    <Timer size={70} strokeWidth={8} color="#fff" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <Timer size={70} strokeWidth={2.5} color="#000" style={{ position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </div>
              </div>
              <h3 className="feature-title">SAVE TIME</h3>
            </div>

            {/* MAKE THE RULES */}
            <div className="feature-card">
              <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'absolute', width: '130px', height: '60px', background: '#fff', transform: 'rotate(-3deg) skewX(-5deg)', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(4px 4px 0px #000)', transform: 'rotate(5deg)' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                    <Crown size={70} strokeWidth={8} color="#fff" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <Crown size={70} strokeWidth={2.5} color="#000" style={{ position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </div>
              </div>
              <h3 className="feature-title">MAKE THE RULES</h3>
            </div>

            {/* REST EASY */}
            <div className="feature-card">
              <div style={{ position: 'relative', width: '100%', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '30px' }}>
                <div style={{ position: 'absolute', width: '130px', height: '60px', background: '#fff', transform: 'rotate(6deg) skewX(10deg)', zIndex: 0 }} />
                <div style={{ position: 'relative', zIndex: 1, filter: 'drop-shadow(4px 4px 0px #000)', transform: 'rotate(-2deg)' }}>
                  <div style={{ position: 'relative', width: '70px', height: '70px' }}>
                    <Moon size={70} strokeWidth={8} color="#fff" style={{ position: 'absolute', top: 0, left: 0 }} />
                    <Moon size={70} strokeWidth={2.5} color="#000" style={{ position: 'absolute', top: 0, left: 0 }} />
                  </div>
                </div>
                {/* zzz */}
                <div style={{ position: 'absolute', top: '10px', right: '15%', fontFamily: "'Newsflash', 'Anton', sans-serif", fontSize: '2rem', color: '#fff', textShadow: '2px 2px 0 #000, -2px -2px 0 #000, 2px -2px 0 #000, -2px 2px 0 #000', transform: 'rotate(15deg)', zIndex: 2 }}>
                  z<span style={{ fontSize: '1.2rem', position: 'relative', top: '-10px' }}>z</span><span style={{ fontSize: '0.8rem', position: 'relative', top: '-20px' }}>z</span>
                </div>
              </div>
              <h3 className="feature-title">REST EASY</h3>
            </div>
          </div>
          
          <div style={{ marginTop: '80px' }}>
            <a href="#products" className="btn btn-strawberry btn-huge" style={{ transform: 'rotate(-2deg)', display: 'inline-block' }}>
              SHOP NOW
            </a>
          </div>

        </div>
      </section>

      <section className="guarantee-section" style={{ position: 'relative', background: 'var(--bg-color)', overflow: 'hidden', padding: '120px 0' }}>
        {/* Slanted pink floor */}
        <div style={{ position: 'absolute', bottom: '-20%', right: '-10%', width: '120%', height: '50%', background: 'var(--accent-strawberry)', transform: 'rotate(-8deg)', zIndex: 1, borderTop: 'var(--border-thick)' }} />
        
        {/* Right Image MUST be a sibling to the pink floor for mix-blend-mode to multiply against the background properly */}
        <img 
          src="/strongman_wheat.png" 
          alt="Vintage Strongman Guarantee" 
          className="guarantee-img"
        />

        <div className="container" style={{ position: 'relative', zIndex: 3, display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          
          {/* Left Text */}
          <div style={{ flex: '1 1 500px', paddingRight: '40px', marginBottom: '40px' }}>
            <h3 style={{ fontFamily: "'Newsflash', 'Anton', sans-serif", color: 'var(--accent-strawberry)', fontSize: '2.5rem', marginBottom: '20px' }}>GUARANTEED</h3>
            <h2 className="massive-title">
              100% SATISFIED.<br/>
              OR YOUR MONEY<br/>
              BACK.
            </h2>
            <a href="#products" className="btn btn-strawberry btn-huge" style={{ display: 'inline-block' }}>
              TRY IT NOW!
            </a>
          </div>

          {/* Spacer for Right Image */}
          <div className="guarantee-spacer"></div>

        </div>
      </section>

      <footer className="footer-new">
        <div className="footer-top">
          
          <div className="footer-left">
            <h2 style={{ fontFamily: "'Newsflash', 'Anton', sans-serif", fontSize: '3.5rem', color: '#000', marginBottom: '5px' }}>
              STAY FIBREVITA
            </h2>
            <p style={{ fontWeight: 'bold', fontSize: '1.1rem', color: '#000' }}>
              Sign up for updates, deals, and more
            </p>
            <div className="footer-input-group">
              <input type="email" placeholder="ENTER EMAIL" className="footer-input" />
              <button className="footer-btn">
                <ArrowRight size={32} color="#000" strokeWidth={3} />
              </button>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-links-col">
              <h4 className="footer-heading">PRODUCT</h4>
              <a href="#" className="footer-link">SHOP</a>
              <a href="#" className="footer-link">FAQS</a>
              <a href="#" className="footer-link">ACCOUNT</a>
            </div>
            
            <div className="footer-links-col">
              <h4 className="footer-heading">ABOUT</h4>
              <a href="#" className="footer-link">OUR STORY</a>
            </div>
            
            <div className="footer-links-col">
              <h4 className="footer-heading">CONTACT</h4>
              <a href="#" className="footer-link">CONTACT US</a>
              <a href="#" className="footer-link">INSTAGRAM</a>
            </div>
          </div>

        </div>
        
        <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', fontWeight: 'bold', fontSize: '1.2rem', padding: '40px 0 10px', marginTop: '20px', borderTop: '4px solid #000' }}>
          © 2026 Abuzz. All rights reserved.
        </div>
        
        {/* Massive clipping text at the very bottom */}
        <div className="footer-agro">FIBREVITA</div>
      </footer>
    </main>
  );
}
