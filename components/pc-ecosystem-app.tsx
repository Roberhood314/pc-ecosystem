"use client";

import { useEffect, useState } from "react";

type Health = {
  ok: boolean;
  service: string;
  version: string;
  nodeConfigured: boolean;
  tunnelEnabled: boolean;
  localAiEnabled: boolean;
  timestamp: string;
};

const modules = [
  ["P01", "Green Technology", "Công nghệ xanh, AIoT, cây xanh và Digital Twin"],
  ["P02", "Public Safety", "An toàn cộng đồng và điều phối sự kiện"],
  ["P03", "Education", "Học tập và trợ lý AI giáo dục"],
  ["P04", "Vehicle Intelligence", "Phân tích xe, hành trình và chẩn đoán"],
  ["P05", "Utilities", "Tiện ích, cảnh báo và dịch vụ hệ sinh thái"]
];

export function PcEcosystemApp() {
  const [health, setHealth] = useState<Health | null>(null);

  useEffect(() => {
    const load = () =>
      fetch("/api/health", { cache: "no-store" })
        .then((r) => r.json())
        .then(setHealth)
        .catch(() => setHealth(null));
    load();
    const id = setInterval(load, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="shell">
      <section className="hero">
        <div className="eyebrow">JOHNPC THE NEXUS</div>
        <h1>PC Ecosystem</h1>
        <p>Trung tâm kết nối an toàn cho hệ sinh thái AI trên Pi Network và SoloHost.</p>
        <div className="status">
          <span className={health?.ok ? "dot ok" : "dot"} />
          <span>{health?.ok ? "Node Runtime đang hoạt động" : "Đang kiểm tra Node Runtime"}</span>
        </div>
      </section>

      <section className="grid">
        {modules.map(([id, name, desc]) => (
          <article className="card" key={id}>
            <div className="cardTop">
              <span className="badge">{id}</span>
              <span className="state">Độc lập</span>
            </div>
            <h2>{name}</h2>
            <p>{desc}</p>
          </article>
        ))}
      </section>

      <section className="runtime card">
        <h2>SoloHost Runtime</h2>
        <dl>
          <div><dt>NODE_KEY</dt><dd>{health?.nodeConfigured ? "Đã cấu hình" : "Chưa cấu hình"}</dd></div>
          <div><dt>Secure Tunnel</dt><dd>{health?.tunnelEnabled ? "Bật" : "Tắt"}</dd></div>
          <div><dt>Local AI</dt><dd>{health?.localAiEnabled ? "Bật" : "Tắt"}</dd></div>
          <div><dt>Phiên bản</dt><dd>{health?.version ?? "0.1.0"}</dd></div>
        </dl>
      </section>

      <footer>PC Ecosystem Hub • Không trộn dữ liệu P01–P05</footer>
    </main>
  );
}
