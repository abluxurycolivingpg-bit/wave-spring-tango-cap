import { i as __toESM } from "../_runtime.mjs";
import { L as require_react, v as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as Play, d as Maximize2, f as MapPin, g as ChevronLeft, h as ChevronRight, i as Tv, l as Phone, m as Dumbbell, n as Wind, o as ShieldCheck, p as Gamepad2, r as Wifi, s as Refrigerator, t as X, u as Pause } from "../_libs/lucide-react.mjs";
import { _ as TextureLoader, a as FogExp2, c as MeshStandardMaterial, d as PointLight, f as Points, g as Scene, h as SRGBColorSpace, i as BufferGeometry, l as PerspectiveCamera, m as Raycaster, n as AmbientLight, o as Group, p as PointsMaterial, r as BufferAttribute, s as Mesh, t as WebGLRenderer, u as PlaneGeometry, v as Vector2, y as Vector3 } from "../_libs/three.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DbP6HVQP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PHONE = "9247045268";
var PHONE_LABEL = "92470 45268";
var WHATSAPP = `https://wa.me/91${PHONE}`;
var MAPS = "https://www.google.com/maps/search/?api=1&query=12.98231,77.657238";
var ADDRESS = [
	"H.No. 107/2, 5th Main, SG Palya",
	"CV Raman Nagar (opp. Food City)",
	"Bengaluru 560093"
];
var ROOMS = [
	{
		name: "Private Room",
		price: "₹8,000",
		note: "Single occupancy · Non-AC",
		image: "/media/room-1.jpg"
	},
	{
		name: "Triple Sharing",
		price: "₹8,000",
		note: "3-share · Non-AC",
		image: "/media/room-2.jpg",
		featured: true
	},
	{
		name: "Quad Sharing",
		price: "₹6,500",
		note: "4-share · Non-AC",
		image: "/media/room-1.jpg"
	}
];
var GALLERY = [
	{
		src: "/media/building.jpg",
		label: "Building",
		detail: "White tower on SG Palya. Gated parking, gold AB board, blue PG sign."
	},
	{
		src: "/media/room-1.jpg",
		label: "Private bed",
		detail: "Queen bed, gold geometric linen, tube light, attached-bath door."
	},
	{
		src: "/media/room-2.jpg",
		label: "Room view",
		detail: "Dark marble floor, mirrored wardrobe, blackout curtains, ceiling fan."
	},
	{
		src: "/media/gym-1.jpg",
		label: "Cardio gym",
		detail: "Spin bikes, dumbbell rack, blue LED roof, rooftop after dark."
	},
	{
		src: "/media/gym-2.jpg",
		label: "Strength gym",
		detail: "Hercules multi-gym, benches, plates. Same terrace as the games deck."
	},
	{
		src: "/media/games.jpg",
		label: "Games terrace",
		detail: "Turf, hanging lamps, tables. Gym on the left, hangout on the right."
	},
	{
		src: "/media/fridge.jpg",
		label: "Fridge",
		detail: "Common Godrej fridge beside the kitchen door."
	},
	{
		src: "/media/tv.jpg",
		label: "Common TV",
		detail: "Wall TV over the marble kitchen splash — house rules posted below."
	},
	{
		src: "/media/logo.jpg",
		label: "AB mark",
		detail: "Brass AB disc on fluted gold panelling."
	}
];
var TOUR = GALLERY.filter((g) => g.src !== "/media/logo.jpg");
function Gallery3D({ onSelect }) {
	const hostRef = (0, import_react.useRef)(null);
	const selectRef = (0, import_react.useRef)(onSelect);
	selectRef.current = onSelect;
	const api = (0, import_react.useRef)(null);
	const [active, setActive] = (0, import_react.useState)(0);
	const [spin, setSpin] = (0, import_react.useState)(true);
	const [hint, setHint] = (0, import_react.useState)("Drag to orbit · tap a frame");
	(0, import_react.useEffect)(() => {
		const host = hostRef.current;
		if (!host) return;
		const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const width = () => host.clientWidth || 640;
		const height = () => Math.max(280, host.clientHeight || 480);
		const scene = new Scene();
		scene.fog = new FogExp2(789001, .042);
		const camera = new PerspectiveCamera(40, width() / height(), .1, 80);
		camera.position.set(0, .55, 8.6);
		const renderer = new WebGLRenderer({
			antialias: true,
			alpha: true
		});
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
		renderer.setSize(width(), height());
		renderer.setClearColor(0, 0);
		renderer.domElement.setAttribute("aria-label", "3D photo tour");
		renderer.domElement.tabIndex = 0;
		host.appendChild(renderer.domElement);
		scene.add(new AmbientLight(16773596, .58));
		const gold = new PointLight(12886874, 42, 28, 2);
		gold.position.set(2.2, 3.2, 4.2);
		scene.add(gold);
		const fill = new PointLight(9136954, 16, 24, 2);
		fill.position.set(-4.2, -.8, 2.4);
		scene.add(fill);
		const ring = new Group();
		scene.add(ring);
		const loader = new TextureLoader();
		const frames = [];
		const radius = 4.55;
		const count = TOUR.length;
		const step = Math.PI * 2 / count;
		TOUR.forEach((shot, i) => {
			const tex = loader.load(shot.src);
			tex.colorSpace = SRGBColorSpace;
			const mesh = new Mesh(new PlaneGeometry(2.4, 1.74), new MeshStandardMaterial({
				map: tex,
				roughness: .32,
				metalness: .1
			}));
			const angle = i * step;
			mesh.position.set(Math.sin(angle) * radius, Math.sin(i * 1.15) * .16, Math.cos(angle) * radius);
			mesh.lookAt(0, mesh.position.y, 0);
			mesh.userData.index = i;
			mesh.userData.src = shot.src;
			ring.add(mesh);
			frames.push(mesh);
			const frame = new Mesh(new PlaneGeometry(2.54, 1.88), new MeshStandardMaterial({
				color: 12886874,
				metalness: .88,
				roughness: .22,
				side: 1
			}));
			frame.position.z = -.025;
			mesh.add(frame);
		});
		const dustGeo = new BufferGeometry();
		const n = 120;
		const pos = /* @__PURE__ */ new Float32Array(360);
		for (let i = 0; i < n; i++) {
			pos[i * 3] = (Math.random() - .5) * 16;
			pos[i * 3 + 1] = (Math.random() - .5) * 8;
			pos[i * 3 + 2] = (Math.random() - .5) * 16;
		}
		dustGeo.setAttribute("position", new BufferAttribute(pos, 3));
		const dust = new Points(dustGeo, new PointsMaterial({
			color: 12886874,
			size: .032,
			transparent: true,
			opacity: .5
		}));
		scene.add(dust);
		const ray = new Raycaster();
		const pointer = new Vector2(-10, -10);
		let rotY = 0;
		let targetRot = 0;
		let dragging = false;
		let lastX = 0;
		let moved = 0;
		let hover = null;
		let spinning = !reduced;
		let lastIndex = 0;
		const snapTo = (i) => {
			const wrapped = (i % count + count) % count;
			targetRot = -wrapped * step;
			setActive(wrapped);
		};
		const frontIndex = () => {
			let best = 0;
			let z = -Infinity;
			frames.forEach((m, i) => {
				const v = m.getWorldPosition(new Vector3());
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
			}
		};
		const onDown = (e) => {
			dragging = true;
			moved = 0;
			lastX = e.clientX;
			host.setPointerCapture(e.pointerId);
			renderer.domElement.style.cursor = "grabbing";
		};
		const onMove = (e) => {
			const rect = renderer.domElement.getBoundingClientRect();
			pointer.x = (e.clientX - rect.left) / rect.width * 2 - 1;
			pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
			if (dragging) {
				const dx = e.clientX - lastX;
				moved += Math.abs(dx);
				targetRot += dx * .0055;
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
				const i = hover.userData.index;
				snapTo(i);
				selectRef.current(hover.userData.src);
			}
		};
		const onWheel = (e) => {
			e.preventDefault();
			spinning = false;
			setSpin(false);
			targetRot += e.deltaY * .0022;
		};
		const onKey = (e) => {
			if (e.key === "ArrowRight") {
				e.preventDefault();
				api.current?.step(1);
			}
			if (e.key === "ArrowLeft") {
				e.preventDefault();
				api.current?.step(-1);
			}
			if (e.key === "Enter" && hover) selectRef.current(hover.userData.src);
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
			if (spinning && !dragging && !reduced) targetRot += .003;
			rotY += (targetRot - rotY) * .1;
			ring.rotation.y = rotY;
			dust.rotation.y = rotY * .18;
			ray.setFromCamera(pointer, camera);
			const next = ray.intersectObjects(frames)[0]?.object ?? null;
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
				const mat = m.material;
				mat.map?.dispose();
				mat.dispose();
			});
			dustGeo.dispose();
			dust.material.dispose();
			renderer.dispose();
			renderer.domElement.remove();
		};
	}, []);
	const shot = TOUR[active] ?? TOUR[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				ref: hostRef,
				className: "h-[420px] w-full touch-none md:h-[540px]"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "pointer-events-none absolute inset-x-0 top-0 flex justify-between p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "rounded-full bg-ink/70 px-3 py-1 text-xs tracking-wide text-muted backdrop-blur",
					children: hint
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "rounded-full bg-ink/70 px-3 py-1 text-xs text-gold backdrop-blur",
					children: [
						String(active + 1).padStart(2, "0"),
						" / ",
						String(TOUR.length).padStart(2, "0")
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink via-ink/80 to-transparent px-4 pb-4 pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-end justify-between gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-display text-2xl text-cream",
						children: shot.label
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 max-w-md text-sm text-muted",
						children: shot.detail
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-cream",
								onClick: () => api.current?.step(-1),
								"aria-label": "Previous photo",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-cream",
								onClick: () => {
									const next = !spin;
									setSpin(next);
									api.current?.setSpin(next);
								},
								"aria-label": spin ? "Pause auto-rotate" : "Play auto-rotate",
								children: spin ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "h-4 w-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid h-11 w-11 place-items-center rounded-full border border-line bg-surface text-cream",
								onClick: () => api.current?.step(1),
								"aria-label": "Next photo",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "grid h-11 w-11 place-items-center rounded-full bg-gold text-ink",
								onClick: () => onSelect(shot.src),
								"aria-label": "Open full photo",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Maximize2, { className: "h-4 w-4" })
							})
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 flex gap-2 overflow-x-auto pb-1",
					children: TOUR.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => api.current?.focus(i),
						className: `h-14 w-20 shrink-0 overflow-hidden rounded-md ring-2 ${i === active ? "ring-gold" : "ring-transparent"}`,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.src,
							alt: item.label,
							className: "h-full w-full object-cover"
						})
					}, item.src))
				})]
			})
		]
	});
}
function Home() {
	const [lightbox, setLightbox] = (0, import_react.useState)(null);
	const [sent, setSent] = (0, import_react.useState)(false);
	const year = 2026;
	const onEnquire = (e) => {
		e.preventDefault();
		const data = new FormData(e.currentTarget);
		const name = String(data.get("name") || "");
		const phone = String(data.get("phone") || "");
		const room = String(data.get("room") || "");
		const msg = String(data.get("message") || "");
		const text = encodeURIComponent(`Hi AB Luxury PG, I am ${name}. Phone: ${phone}. Room: ${room}. ${msg}`);
		setSent(true);
		window.open(`${WHATSAPP}?text=${text}`, "_blank");
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-ink text-cream",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "fixed inset-x-0 top-0 z-40 border-b border-line/80 bg-ink/80 backdrop-blur-md",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "#top",
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/media/logo.jpg",
								alt: "AB Luxury",
								className: "h-10 w-10 rounded-full object-cover ring-1 ring-gold"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-lg tracking-wide text-cream",
								children: "AB Luxury"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden items-center gap-6 text-sm text-muted md:flex",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#tour",
									className: "hover:text-gold",
									children: "3D Tour"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#rooms",
									className: "hover:text-gold",
									children: "Rooms"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#life",
									className: "hover:text-gold",
									children: "Gym & Games"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#enquire",
									className: "hover:text-gold",
									children: "Enquire"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: WHATSAPP,
							className: "rounded-full bg-gold px-4 py-2 text-sm font-medium text-ink hover:bg-gold-deep hover:text-cream",
							children: "WhatsApp"
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "top",
				className: "relative isolate min-h-[100svh] overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
						className: "absolute inset-0 h-full w-full object-cover ken-burn",
						autoPlay: true,
						muted: true,
						loop: true,
						playsInline: true,
						poster: "/media/building.jpg",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
							src: "/media/building-loop.mp4",
							type: "video/mp4"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-ink/40 via-ink/55 to-ink" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative mx-auto flex min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/media/logo.gif",
								alt: "",
								className: "mb-6 h-20 w-20 rounded-full object-cover ring-2 ring-gold rise-in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mb-3 text-xs uppercase tracking-[0.28em] text-gold rise-in",
								children: "CV Raman Nagar · Bangalore"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								className: "max-w-3xl font-display text-5xl leading-[0.95] text-cream md:text-7xl rise-in",
								children: ["AB Luxury", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block italic text-gold",
									children: "CoLiving PG"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 max-w-xl text-base text-muted md:text-lg",
								children: "Furnished rooms, rooftop gym with blue night lights, games terrace, and a gold-marked home on SG Palya."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-8 flex flex-wrap gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
									href: "#tour",
									className: "rounded-full bg-gold px-6 py-3 font-medium text-ink",
									children: "Enter 3D tour"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `tel:+91${PHONE_LABEL.replace(/\s/g, "")}`,
									className: "rounded-full border border-gold/50 px-6 py-3 text-cream",
									children: ["Call ", PHONE_LABEL]
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "tour",
				className: "border-t border-line bg-ink-soft py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.28em] text-gold",
							children: "Live 3D"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl md:text-5xl",
							children: "Orbit the property"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xl text-muted",
							children: "Drag or scroll to orbit. Arrows step one frame. Release snaps to the nearest photo — tap it for the full still."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 overflow-hidden rounded-[1.25rem] border border-line bg-ink",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Gallery3D, { onSelect: setLightbox })
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "rooms",
				className: "py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.28em] text-gold",
							children: "Stay"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl",
							children: "Rooms"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 grid gap-6 md:grid-cols-3",
							children: ROOMS.map((room) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: `overflow-hidden rounded-[1.25rem] border bg-surface ${room.featured ? "border-gold" : "border-line"}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-52 overflow-hidden",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: room.image,
										alt: room.name,
										className: "h-full w-full object-cover ken-burn"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
											className: "font-display text-2xl",
											children: room.name
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-3xl font-medium text-gold",
											children: room.price
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-sm text-muted",
											children: room.note
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
											href: "#enquire",
											className: "mt-5 inline-block rounded-full bg-ink px-4 py-2 text-sm ring-1 ring-gold/40 hover:bg-gold hover:text-ink",
											children: "Hold a bed"
										})
									]
								})]
							}, room.name))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				id: "life",
				className: "border-y border-line bg-ink-soft py-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, {
						src: "/media/gym-loop.mp4",
						poster: "/media/gym-2.jpg",
						title: "Rooftop gym"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VideoCard, {
						src: "/media/games-loop.mp4",
						poster: "/media/games.jpg",
						title: "Games terrace"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto mt-12 grid max-w-6xl grid-cols-2 gap-4 px-4 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amenity, {
							icon: Dumbbell,
							title: "Gym",
							copy: "Bikes, Hercules rack, free weights"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amenity, {
							icon: Gamepad2,
							title: "Games deck",
							copy: "Night turf, hanging lamps"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amenity, {
							icon: Wifi,
							title: "Wi-Fi",
							copy: "Free high-speed throughout"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amenity, {
							icon: ShieldCheck,
							title: "CCTV",
							copy: "Gated entry, cameras"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amenity, {
							icon: Refrigerator,
							title: "Fridge",
							copy: "Common refrigerator"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amenity, {
							icon: Tv,
							title: "TV",
							copy: "Common area television"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amenity, {
							icon: Wind,
							title: "Hot water",
							copy: "Attached western baths"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Amenity, {
							icon: MapPin,
							title: "SG Palya",
							copy: "Opp. Food City, CV Raman Nagar"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.28em] text-gold",
							children: "Stills"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl",
							children: "The real house"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-8 grid grid-cols-2 gap-3 md:grid-cols-3",
							children: GALLERY.map((shot) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setLightbox(shot.src),
								className: "group relative overflow-hidden rounded-[0.85rem]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: shot.src,
									alt: shot.label,
									className: "aspect-[4/3] h-full w-full object-cover transition duration-500 group-hover:scale-105"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-3 text-left text-sm",
									children: shot.label
								})]
							}, shot.src))
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "enquire",
				className: "border-t border-line bg-ink-soft py-16",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto grid max-w-6xl gap-10 px-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs uppercase tracking-[0.28em] text-gold",
							children: "Visit"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-4xl",
							children: "Come see a room tonight"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-muted",
							children: ADDRESS.map((line) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "block",
								children: line
							}, line))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-6 flex flex-col gap-3 text-cream",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: `tel:+919247045268`,
								className: "inline-flex items-center gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { className: "h-4 w-4 text-gold" }),
									" ",
									PHONE_LABEL
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: MAPS,
								className: "inline-flex items-center gap-2",
								target: "_blank",
								rel: "noreferrer",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "h-4 w-4 text-gold" }), " Open in Google Maps"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/media/building.jpg",
							alt: "AB Luxury CoLiving PG facade",
							className: "mt-8 h-64 w-full rounded-[1.25rem] object-cover"
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
						onSubmit: onEnquire,
						className: "rounded-[1.25rem] border border-line bg-ink p-6 md:p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-display text-2xl",
								children: "Enquire"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-5 block text-sm text-muted",
								children: ["Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "name",
									required: true,
									className: "mt-1 w-full rounded-md border border-line bg-surface px-3 py-3 text-cream outline-none focus:border-gold",
									suppressHydrationWarning: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 block text-sm text-muted",
								children: ["Phone", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									name: "phone",
									required: true,
									type: "tel",
									className: "mt-1 w-full rounded-md border border-line bg-surface px-3 py-3 text-cream outline-none focus:border-gold",
									suppressHydrationWarning: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 block text-sm text-muted",
								children: ["Room", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									name: "room",
									className: "mt-1 w-full rounded-md border border-line bg-surface px-3 py-3 text-cream outline-none focus:border-gold",
									suppressHydrationWarning: true,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Private · ₹8,000" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Triple · ₹8,000" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Quad · ₹6,500" })
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-4 block text-sm text-muted",
								children: ["Message", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									name: "message",
									rows: 3,
									className: "mt-1 w-full rounded-md border border-line bg-surface px-3 py-3 text-cream outline-none focus:border-gold",
									suppressHydrationWarning: true
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "mt-6 w-full rounded-full bg-gold py-3 font-medium text-ink",
								children: sent ? "Opening WhatsApp…" : "Send on WhatsApp"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
				className: "border-t border-line py-8 text-center text-sm text-muted",
				children: [
					"© ",
					year,
					" AB Luxury CoLiving PG · CV Raman Nagar"
				]
			}),
			lightbox ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "fixed inset-0 z-50 flex items-center justify-center bg-ink/90 p-4",
				onClick: () => setLightbox(null),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "absolute right-4 top-4 rounded-full bg-surface p-2",
					"aria-label": "Close",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-5 w-5" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: lightbox,
					alt: "",
					className: "max-h-[88vh] max-w-full rounded-lg object-contain",
					onClick: (e) => e.stopPropagation()
				})]
			}) : null
		]
	});
}
function VideoCard({ src, poster, title }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "overflow-hidden rounded-[1.25rem] border border-line",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("video", {
			className: "aspect-video w-full object-cover",
			autoPlay: true,
			muted: true,
			loop: true,
			playsInline: true,
			poster,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("source", {
				src,
				type: "video/mp4"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
			className: "bg-ink px-4 py-3 font-display text-xl",
			children: title
		})]
	});
}
function Amenity({ icon: Icon, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[0.85rem] border border-line bg-ink p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "h-5 w-5 text-gold" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
				className: "mt-3 font-medium",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: copy
			})
		]
	});
}
//#endregion
export { Home as component };
