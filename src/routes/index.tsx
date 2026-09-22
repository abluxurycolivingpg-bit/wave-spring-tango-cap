import { createFileRoute } from "@tanstack/react-router";
import { FormEvent, useState } from "react";
import {
  ADDRESS,
  GALLERY,
  MAPS,
  PHONE_LABEL,
  ROOMS,
  WHATSAPP,
} from "@/lib/property";
import { Gallery3D } from "@/components/gallery-3d";
import {
  Dumbbell,
  Gamepad2,
  MapPin,
  Phone,
  Refrigerator,
  ShieldCheck,
  Tv,
  Wifi,
  Wind,
  X,
} from "lucide-react";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const [lightbox, setLightbox] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const year = 2026;

  const onEnquire = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "");
    const phone = String(data.get("phone") || "");
    const room = String(data.get("room") || "");
    const msg = String(data.get("message") || "");
    const text = encodeURIComponent(
      `Hi AB Luxury PG, I am ${name}. Phone: ${phone}. Room: ${room}. ${msg}`,
    );
    setSent(true);
    window.open(`${WHATSAPP}?text=${text}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-ink text-cream">
      <nav className="fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-ink/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#top" className="flex items-center gap-3">
            <img
              src="/media/logo.jpg"
              alt="AB Luxury"
              className="h-10 w-10 rounded-full object-cover ring-1 ring-gold"
            />
            <span className="font-display text-lg tracking-wide text-cream">
              AB Luxury
            </span>
          </a>
          <div className="hidden items-center gap-6 text-sm text-muted md:flex">
            <a href="#tour" className="hover:text-gold">
              3D Tour
            </a>
            <a href="#rooms" className="hover:text-gold">
              Rooms
            </a>
            <a href="#life" className="hover:text-gold">
              Gym & Games
            </a>
            <a href="#enquire" className="hover:text-gold">
              Enquire
            </a>
          </div>
          <a
            href={WHATSAPP}
            className="rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink hover:bg-gold-deep hover:text-cream"
          >
            WhatsApp
          </a>
        </div>
      </nav>

      <section id="top" className="relative isolate min-h-[100svh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover ken-burn"
          autoPlay
          muted
          loop
          playsInline
          poster="/media/building.jpg"
        >
          <source src="/media/building-loop.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28">
          <img
            src="/media/logo.gif"
            alt=""
            className="mb-6 h-20 w-20 rounded-full object-cover ring-2 ring-gold rise-in"
          />
          <p className="mb-3 text-xs uppercase tracking-[0.28em] text-gold rise-in">
            CV Raman Nagar · Bangalore
          </p>
          <h1 className="max-w-3xl font-display text-5xl leading-[0.95] text-cream md:text-7xl rise-in">
            AB Luxury
            <span className="block italic text-gold">CoLiving PG</span>
          </h1>
          <p className="mt-5 max-w-xl text-base text-muted md:text-lg">
            Furnished rooms, rooftop gym with blue night lights, games terrace,
            and a gold-marked home on SG Palya.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#tour"
              className="rounded-full bg-gold px-6 py-3 font-medium text-ink"
            >
              Enter 3D tour
            </a>
            <a
              href={`tel:+91${PHONE_LABEL.replace(/\s/g, "")}`}
              className="rounded-full border border-gold/50 px-6 py-3 text-cream"
            >
              Call {PHONE_LABEL}
            </a>
          </div>
        </div>
      </section>

      <section id="tour" className="border-t border-line bg-ink-soft py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Live 3D</p>
          <h2 className="mt-2 font-display text-4xl md:text-5xl">
            Orbit the property
          </h2>
          <p className="mt-3 max-w-xl text-muted">
            Drag or scroll to orbit. Arrows step one frame. Release snaps to the
            nearest photo — tap it for the full still.
          </p>
          <div className="mt-8 overflow-hidden rounded-[1.25rem] border border-line bg-ink">
            <Gallery3D onSelect={setLightbox} />
          </div>
        </div>
      </section>

      <section id="rooms" className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Stay</p>
          <h2 className="mt-2 font-display text-4xl">Rooms</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {ROOMS.map((room) => (
              <article
                key={room.name}
                className={`overflow-hidden rounded-[1.25rem] border bg-surface ${
                  room.featured ? "border-gold" : "border-line"
                }`}
              >
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={room.image}
                    alt={room.name}
                    className="h-full w-full object-cover ken-burn"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-2xl">{room.name}</h3>
                  <p className="mt-1 text-3xl font-medium text-gold">{room.price}</p>
                  <p className="mt-1 text-sm text-muted">{room.note}</p>
                  <a
                    href="#enquire"
                    className="mt-5 inline-block rounded-full bg-ink px-4 py-2 text-sm ring-1 ring-gold/40 hover:bg-gold hover:text-ink"
                  >
                    Hold a bed
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="life" className="border-y border-line bg-ink-soft py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2">
          <VideoCard src="/media/gym-loop.mp4" poster="/media/gym-2.jpg" title="Rooftop gym" />
          <VideoCard src="/media/games-loop.mp4" poster="/media/games.jpg" title="Games terrace" />
        </div>
        <div className="mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 px-4 md:grid-cols-4">
          <Amenity icon={Dumbbell} title="Gym" copy="Bikes, Hercules rack, free weights" />
          <Amenity icon={Gamepad2} title="Games deck" copy="Night turf, hanging lamps" />
          <Amenity icon={Wifi} title="Wi-Fi" copy="Free high-speed throughout" />
          <Amenity icon={ShieldCheck} title="CCTV" copy="Gated entry, cameras" />
          <Amenity icon={Refrigerator} title="Fridge" copy="Common refrigerator" />
          <Amenity icon={Tv} title="TV" copy="Common area television" />
          <Amenity icon={Wind} title="Hot water" copy="Attached western baths" />
          <Amenity icon={MapPin} title="SG Palya" copy="Opp. Food City, CV Raman Nagar" />
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
          <p className="text-xs uppercase tracking-[0.28em] text-gold">Stills</p>
          <h2 className="mt-2 font-display text-4xl">The real house</h2>
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {GALLERY.map((shot) => (
              <button
                key={shot.src}
                type="button"
                onClick={() => setLightbox(shot.src)}
                className="group relative overflow-hidden rounded-[0.85rem]"
              >
                <img
                  src={shot.src}
                  alt={shot.label}
                  className="aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-3 text-left text-sm">
                  {shot.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section id="enquire" className="border-t border-line bg-ink-soft py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-gold">Visit</p>
            <h2 className="mt-2 font-display text-4xl">Come see a room tonight</h2>
            <p className="mt-4 text-muted">
              {ADDRESS.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </p>
            <div className="mt-6 flex flex-col gap-3 text-cream">
              <a href={`tel:+919247045268`} className="inline-flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold" /> {PHONE_LABEL}
              </a>
              <a href={MAPS} className="inline-flex items-center gap-2" target="_blank" rel="noreferrer">
                <MapPin className="h-4 w-4 text-gold" /> Open in Google Maps
              </a>
            </div>
            <img
              src="/media/building.jpg"
              alt="AB Luxury CoLiving PG facade"
              className="mt-8 h-64 w-full rounded-[1.25rem] object-cover"
            />
          </div>
          <form
            onSubmit={onEnquire}
            className="rounded-[1.25rem] border border-line bg-ink p-6 md:p-8"
          >
            <h3 className="font-display text-2xl">Enquire</h3>
            <label className="mt-5 block text-sm text-muted">
              Name
              <input
                name="name"
                required
                                className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-3 text-cream outline-none focus:border-gold"
                suppressHydrationWarning

              />
            </label>
            <label className="mt-4 block text-sm text-muted">
              Phone
              <input
                name="phone"
                required
                type="tel"
                                className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-3 text-cream outline-none focus:border-gold"
                suppressHydrationWarning

              />
            </label>
            <label className="mt-4 block text-sm text-muted">
              Room
              <select
                name="room"
                                className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-3 text-cream outline-none focus:border-gold"
                suppressHydrationWarning

              >
                <option>Private · ₹8,000</option>
                <option>Triple · ₹8,000</option>
                <option>Quad · ₹6,500</option>
              </select>
            </label>
            <label className="mt-4 block text-sm text-muted">
              Message
              <textarea
                name="message"
                rows={3}
                                className="mt-1 w-full rounded-md border border-line bg-surface px-3 py-3 text-cream outline-none focus:border-gold"
                suppressHydrationWarning

              />
            </label>
            <button
              type="submit"
              className="mt-6 w-full rounded-full bg-gold py-3 font-medium text-ink"
            >
              {sent ? "Opening WhatsApp…" : "Send on WhatsApp"}
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-line py-8 text-center text-sm text-muted">
        © {year} AB Luxury CoLiving PG · CV Raman Nagar
      </footer>

      {lightbox ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-surface p-2"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
          <img
            src={lightbox}
            alt=""
            className="max-h-[88vh] max-w-full rounded-lg object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      ) : null}
    </div>
  );
}

function VideoCard({
  src,
  poster,
  title,
}: {
  src: string;
  poster: string;
  title: string;
}) {
  return (
    <figure className="overflow-hidden rounded-[1.25rem] border border-line">
      <video
        className="aspect-video w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        poster={poster}
      >
        <source src={src} type="video/mp4" />
      </video>
      <figcaption className="bg-ink px-4 py-3 font-display text-xl">{title}</figcaption>
    </figure>
  );
}

function Amenity({
  icon: Icon,
  title,
  copy,
}: {
  icon: typeof Wifi;
  title: string;
  copy: string;
}) {
  return (
    <div className="rounded-[0.85rem] border border-line bg-ink p-4">
      <Icon className="h-5 w-5 text-gold" />
      <h3 className="mt-3 font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted">{copy}</p>
    </div>
  );
}
