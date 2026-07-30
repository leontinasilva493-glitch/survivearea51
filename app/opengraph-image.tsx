import { ImageResponse } from "next/server";

export const runtime = "edge";
export const alt = "Survive Verity in Area 51 verified field guide";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", overflow: "hidden", background: "#061115", color: "#e7f2ef", padding: "70px", fontFamily: "Arial Narrow, sans-serif" }}>
      <div style={{ position: "absolute", inset: 0, display: "flex", opacity: 0.22, backgroundImage: "linear-gradient(rgba(130,248,230,.22) 1px,transparent 1px),linear-gradient(90deg,rgba(130,248,230,.22) 1px,transparent 1px)", backgroundSize: "48px 48px" }} />
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", width: "72%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "monospace", fontSize: 20, letterSpacing: 4, color: "#82f8e6" }}><span style={{ width: 34, height: 2, background: "#82f8e6" }} /> VERIFIED PLAYER DASHBOARD</div>
        <div style={{ display: "flex", flexDirection: "column" }}><div style={{ fontSize: 88, lineHeight: 0.88, letterSpacing: -5, fontWeight: 800 }}>SURVIVE VERITY<br />IN AREA 51</div><div style={{ marginTop: 28, fontSize: 30, color: "#90aaa8" }}>Weapons · Map · Coins · Gamepasses</div></div>
        <div style={{ display: "flex", fontFamily: "monospace", fontSize: 18, letterSpacing: 3, color: "#ffc96b" }}>UNIVERSE / 10455462279</div>
      </div>
      <div style={{ position: "absolute", right: 68, top: 95, width: 320, height: 320, border: "2px solid rgba(130,248,230,.5)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 190, height: 190, border: "2px dashed rgba(130,248,230,.45)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 16, height: 16, background: "#ff756d", boxShadow: "0 0 35px #ff756d" }} /></div></div>
      <div style={{ position: "absolute", right: 68, bottom: 80, fontFamily: "monospace", fontSize: 16, letterSpacing: 2, color: "#90aaa8" }}>FACTS / SOURCES / DATES</div>
    </div>,
    size,
  );
}
