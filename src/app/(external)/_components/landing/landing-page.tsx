import { HeroCollage } from "./hero-collage";
import { LandingDither } from "./landing-dither";
import { LandingMarkup } from "./landing-markup";

export function LandingPage() {
  return (
    <div
      className="gitcrew scroll-smooth text-white antialiased"
      data-v2-theme="light"
      style={{ colorScheme: "light" }}
    >
      <LandingMarkup />
      <HeroCollage />
      <LandingDither />
    </div>
  );
}
