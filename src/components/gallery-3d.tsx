import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { ChevronLeft, ChevronRight, Maximize2, Pause, Play } from "lucide-react";
import { TOUR } from "@/lib/property";

type Props = {
  onSelect: (src: string) => void;
};

export function Gallery3D({ onSelect }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef(onSelect);
  selectRef.current = onSelect;
  const api = useRef<{
    step: (dir: number) => void;
    setSpin: (v: boolean) => void;
    focus: (i: number) => void;
  } | null>(null);

  const [active, setActive] = useState(0);
  const [spin, setSpin] = useState(true);
  const [hint, setHint] = useState("Drag to orbit · tap a frame");

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const width = () => host.clientWidth || 640;
    const height = () => Math.max(280, host.clientHeight || 480);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0c0a09, 0.042);

    const camera = new THREE.PerspectiveCamera(40, width() / height(), 0.1, 80);
    camera.position.set(0, 0.55, 8.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(width(), height());
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.setAttribute("aria-label", "3D photo tour");
    renderer.domElement.tabIndex = 0;
    host.appendChild(renderer.domElement);

    scene.add(new THREE.AmbientLight(0xfff1dc, 0.58));
    const gold = new THREE.PointLight(0xc4a35a, 42, 28, 2);
    gold.position.set(2.2, 3.2, 4.2);
    scene.add(gold);
    const fill = new THREE.PointLight(0x8b6b3a, 16, 24, 2);
    fill.position.set(-4.2, -0.8, 2.4);
    scene.add(fill);

    const ring = new THREE.Group();
    scene.add(ring);

    const loader = new THREE.TextureLoader();
    const frames: THREE.Mesh[] = [];
    const radius = 4.55;
    const count = TOUR.length;
    const step = (Math.PI * 2) / count;

    TOUR.forEach((shot, i) => {
      const tex = loader.load(shot.src);
      tex.colorSpace = THREE.SRGBColorSpace;
      const mesh = new THREE.Mesh(
        new THREE.PlaneGeometry(2.4, 1.74),
        new THREE.MeshStandardMaterial({
          map: tex,
          roughness: 0.32,
          metalness: 0.1,
        }),
      );
      const angle = i * step;
      mesh.position.set(Math.sin(angle) * radius, Math.sin(i * 1.15) * 0.16, Math.cos(angle) * radius);
      mesh.lookAt(0, mesh.position.y, 0);
      mesh.userData.index = i;
      mesh.userData.src = shot.src;
      ring.add(mesh);
      frames.push(mesh);

      const frame = new THREE.Mesh(
        new THREE.PlaneGeometry(2.54, 1.88),
        new THREE.MeshStandardMaterial({
          color: 0xc4a35a,
          metalness: 0.88,
          roughness: 0.22,
          side: THREE.BackSide,
        }),
      );
      frame.position.z = -0.025;
      mesh.add(frame);
    });

    const dustGeo = new THREE.BufferGeometry();
    const n = 120;
    const pos = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    dustGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const dust = new THREE.Points(
      dustGeo,
      new THREE.PointsMaterial({ color: 0xc4a35a, size: 0.032, transparent: true, opacity: 0.5 }),
    );
    scene.add(dust);

    const ray = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-10, -10);
    let rotY = 0;
    let targetRot = 0;
    let dragging = false;
    let lastX = 0;
    let moved = 0;
    let hover: THREE.Mesh | null = null;
    let spinning = !reduced;
    let lastIndex = 0;

    const snapTo = (i: number) => {
      const wrapped = ((i % count) + count) % count;
      targetRot = -wrapped * step;
      setActive(wrapped);
    };

    const frontIndex = () => {
      let best = 0;
      let z = -Infinity;
      frames.forEach((m, i) => {
        const v = m.getWorldPosition(new THREE.Vector3());
        if (v.z > z) {
          z = v.z;
          best = i;
        }
      });
      return best;
    };

    api.current = {
      step: (dir) => {
        spinning = false;
        setSpin(false);
        snapTo(frontIndex() + dir);
      },
      setSpin: (v) => {
        spinning = v;
      },
      focus: (i) => {
        spinning = false;
        setSpin(false);
        snapTo(i);
      },
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      host.setPointerCapture(e.pointerId);
      renderer.domElement.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      if (dragging) {
        const dx = e.clientX - lastX;
        moved += Math.abs(dx);
        targetRot += dx * 0.0055;
        lastX = e.clientX;
        if (spinning) {
          spinning = false;
          setSpin(false);
        }
        setHint("Release to snap · click a frame to open");
      }
    };
    const onUp = () => {
      if (dragging && moved > 8) snapTo(frontIndex());
      dragging = false;
      renderer.domElement.style.cursor = "grab";
    };
    const onClick = () => {
      if (moved > 8) return;
      if (hover) {
        const i = hover.userData.index as number;
        snapTo(i);
        selectRef.current(hover.userData.src as string);
      }
    };
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      spinning = false;
      setSpin(false);
      targetRot += e.deltaY * 0.0022;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        api.current?.step(1);
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        api.current?.step(-1);
      }
      if (e.key === "Enter" && hover) selectRef.current(hover.userData.src as string);
    };

    renderer.domElement.addEventListener("pointerdown", onDown);
    renderer.domElement.addEventListener("pointermove", onMove);
    renderer.domElement.addEventListener("pointerup", onUp);
    renderer.domElement.addEventListener("pointerleave", onUp);
    renderer.domElement.addEventListener("click", onClick);
    renderer.domElement.addEventListener("wheel", onWheel, { passive: false });
    renderer.domElement.addEventListener("keydown", onKey);

    let raf = 0;
    const tick = () => {
      if (spinning && !dragging && !reduced) targetRot += 0.003;
      rotY += (targetRot - rotY) * 0.1;
      ring.rotation.y = rotY;
      dust.rotation.y = rotY * 0.18;

      ray.setFromCamera(pointer, camera);
      const hits = ray.intersectObjects(frames);
      const next = (hits[0]?.object as THREE.Mesh) ?? null;
      if (hover && hover !== next) hover.scale.setScalar(1);
      hover = next;
      if (hover) hover.scale.setScalar(1.08);
      if (!dragging) renderer.domElement.style.cursor = hover ? "pointer" : "grab";

      const idx = frontIndex();
      if (idx !== lastIndex) {
        lastIndex = idx;
        setActive(idx);
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    const onResize = () => {
      camera.aspect = width() / height();
      camera.updateProjectionMatrix();
      renderer.setSize(width(), height());
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      api.current = null;
      renderer.domElement.removeEventListener("pointerdown", onDown);
      renderer.domElement.removeEventListener("pointermove", onMove);
      renderer.domElement.removeEventListener("pointerup", onUp);
      renderer.domElement.removeEventListener("pointerleave", onUp);
      renderer.domElement.removeEventListener("click", onClick);
      renderer.domElement.removeEventListener("wheel", onWheel);
      renderer.domElement.removeEventListener("keydown", onKey);
      frames.forEach((m) => {
        m.geometry.dispose();
        const mat = m.material as THREE.MeshStandardMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
      dustGeo.dispose();
      (dust.material as THREE.PointsMaterial).dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  const shot = TOUR[active] ?? TOUR[0];

  return (
    <div className="relative">
      <div ref={hostRef} className="h-[420px] w-full touch-none md:h-[540px]" />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-4">
        <p className="rounded-full bg-ink/70 px-3 py-1 text-xs tracking-wide text-muted backdrop-blur">
          {hint}
        </p>
        <p className="rounded-full bg-ink/70 px-3 py-1 text-xs text-gold backdrop-blur">
          {String(active + 1).padStart(2, "0")} / {String(TOUR.length).padStart(2, "0")}
        </p>
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent px-4 pb-4 pt-16">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="font-display text-2xl text-cream">{shot.label}</p>
            <p className="mt-1 max-w-md text-sm text-muted">{shot.detail}</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-cream"
              onClick={() => api.current?.step(-1)}
              aria-label="Previous photo"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-cream"
              onClick={() => {
                const next = !spin;
                setSpin(next);
                api.current?.setSpin(next);
              }}
              aria-label={spin ? "Pause auto-rotate" : "Play auto-rotate"}
            >
              {spin ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-cream"
              onClick={() => api.current?.step(1)}
              aria-label="Next photo"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <button
              type="button"
              className="grid h-11 w-11 place-items-center rounded-full bg-gold text-ink"
              onClick={() => onSelect(shot.src)}
              aria-label="Open full photo"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {TOUR.map((item, i) => (
            <button
              key={item.src}
              type="button"
              onClick={() => api.current?.focus(i)}
              className={`h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 ${
                i === active ? "ring-gold" : "ring-transparent"
              }`}
            >
              <img src={item.src} alt={item.label} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
