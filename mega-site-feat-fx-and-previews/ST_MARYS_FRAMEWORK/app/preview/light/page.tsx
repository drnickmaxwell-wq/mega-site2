import Link from 'next/link';
import { SparkleButton } from '@/components/ui/SparkleButton';
import { WaveBackground } from '@/components/fx/WaveBackground';
import { ShimmerText } from '@/components/fx/ShimmerText';
import GlowCard from '@/components/fx/GlowCard';
import '@/styles/tokens.css';

export const dynamic = 'force-static';

export default function LightPreview() {
  return (
    <div data-theme="light" className="min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
      <header className="sticky top-0 z-20 backdrop-blur border-b border-white/10">
        <div className="container mx-auto flex items-center justify-between px-4 py-3">
          <span className="font-bold text-xl tracking-tight">St Mary's House</span>
          <nav className="hidden md:flex gap-6">
            <Link href="#">Home</Link>
            <Link href="#">Treatments</Link>
            <Link href="#">About</Link>
            <Link href="#">Contact</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 relative overflow-hidden">
        <WaveBackground />
        <section className="relative z-10 flex flex-col items-center justify-center text-center px-4 py-24 sm:py-32 lg:py-40">
          <ShimmerText asChild>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Experience Luxury Dentistry
            </h1>
          </ShimmerText>
          <p className="text-lg md:text-xl mb-8 max-w-3xl">
            This preview showcases our brand colours, gradients and interactive components.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <SparkleButton variant="primary" size="lg">
              Book a Consultation
            </SparkleButton>
            <SparkleButton variant="outline" size="lg">
              See 3D Dentistry
            </SparkleButton>
          </div>
        </section>
        <section className="relative z-10 container mx-auto grid gap-6 md:grid-cols-3 px-4 pb-24">
          <GlowCard>
            <h3 className="text-xl font-semibold mb-2">Guided Implants</h3>
            <p className="text-sm">
              Precise implant placement with digital planning for optimal results.
            </p>
          </GlowCard>
          <GlowCard>
            <h3 className="text-xl font-semibold mb-2">Same-day Veneers</h3>
            <p className="text-sm">
              3D printed veneers for a smile makeover delivered in a single visit.
            </p>
          </GlowCard>
          <GlowCard>
            <h3 className="text-xl font-semibold mb-2">Sedation Dentistry</h3>
            <p className="text-sm">
              Comfortable, anxiety-free dental care for nervous patients.
            </p>
          </GlowCard>
        </section>
      </main>
      <footer className="bg-[var(--color-background)] border-t border-white/10 py-6 px-4">
        <div className="container mx-auto flex flex-col md:flex-row justify-between gap-4 items-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} St Mary's House Dental Care</p>
          <nav className="flex gap-4">
            <Link href="#">Privacy</Link>
            <Link href="#">Terms</Link>
            <Link href="#">Accessibility</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
