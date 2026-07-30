import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const size = {
  width: 64,
  height: 64,
};

export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "transparent",
        }}
      >
        {/* Contenedor principal del logo */}
        <div
          style={{
            width: 52,
            height: 52,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
            borderRadius: "15px",
            background:
              "linear-gradient(145deg, #173f36 0%, #102e28 55%, #091f1b 100%)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            boxShadow: "0 4px 0 0 #071713",
          }}
        >
          {/* Elemento decorativo */}
          <div
            style={{
              position: "absolute",
              bottom: -18,
              left: -15,
              width: 46,
              height: 46,
              borderRadius: "50%",
              backgroundColor: "rgba(86, 197, 168, 0.16)",
            }}
          />

          {/* Letra C */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#f5f7f2",
              fontSize: 35,
              fontWeight: 900,
              fontFamily: "sans-serif",
              lineHeight: 1,
              letterSpacing: "-3px",
              transform: "translateX(-1px)",
            }}
          >
            C
          </div>

          {/* Insignia superior derecha */}
          <div
            style={{
              position: "absolute",
              top: -3,
              right: -3,
              width: 21,
              height: 21,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "50%",
              backgroundColor: "#d8ff65",
              border: "3px solid #f5f7f2",
            }}
          >
            {/* Flecha de crecimiento */}
            <svg
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#102e28"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7" />
              <path d="M9 7H17V15" />
            </svg>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
