import * as React from "react";

type EmailTemplateProps = {
  fullName: string;
  email: string;
  message: string;
  /** Pre-formatted receive time, e.g. "17 Nov 2026, 3:42 PM". */
  receivedAt: string;
  siteUrl: string;
};

// Email clients ignore classes and most modern CSS: tables + inline styles only.
const COLORS = {
  page: "#eef1f6",
  navy: "#0f1a33",
  card: "#ffffff",
  ink: "#0f172a",
  muted: "#64748b",
  line: "#e2e8f0",
  accent: "#f97316",
  accentSoft: "#ecfdf5",
  quote: "#f8fafc",
};
const FONT =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const MONO = "'SFMono-Regular', Menlo, Consolas, monospace";

const initialOf = (name: string) => name.trim().charAt(0).toUpperCase() || "?";

export const EmailTemplate = ({
  fullName,
  email,
  message,
  receivedAt,
  siteUrl,
}: EmailTemplateProps) => (
  <div style={{ margin: 0, padding: 0, backgroundColor: COLORS.page }}>
    {/* inbox preview text */}
    <div style={{ display: "none", maxHeight: 0, overflow: "hidden" }}>
      {fullName} sent you a message from your portfolio.
    </div>

    <table
      role="presentation"
      width="100%"
      cellPadding={0}
      cellSpacing={0}
      style={{ backgroundColor: COLORS.page, fontFamily: FONT }}
    >
      <tbody>
        <tr>
          <td align="center" style={{ padding: "32px 16px" }}>
            <table
              role="presentation"
              width="100%"
              cellPadding={0}
              cellSpacing={0}
              style={{
                maxWidth: 600,
                backgroundColor: COLORS.card,
                borderRadius: 20,
                overflow: "hidden",
                border: `1px solid ${COLORS.line}`,
              }}
            >
              <tbody>
                {/* header band */}
                <tr>
                  <td style={{ backgroundColor: COLORS.navy, padding: "28px 32px" }}>
                    <p
                      style={{
                        margin: 0,
                        fontFamily: MONO,
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: COLORS.accent,
                      }}
                    >
                      ● New contact message
                    </p>
                    <h1
                      style={{
                        margin: "10px 0 0",
                        fontSize: 26,
                        lineHeight: 1.2,
                        fontWeight: 800,
                        color: "#ffffff",
                      }}
                    >
                      Someone reached out from your portfolio
                    </h1>
                  </td>
                </tr>

                {/* sender */}
                <tr>
                  <td style={{ padding: "28px 32px 0" }}>
                    <table role="presentation" cellPadding={0} cellSpacing={0}>
                      <tbody>
                        <tr>
                          <td
                            width={48}
                            height={48}
                            align="center"
                            style={{
                              width: 48,
                              height: 48,
                              borderRadius: 12,
                              backgroundColor: COLORS.accentSoft,
                              color: COLORS.accent,
                              fontSize: 20,
                              fontWeight: 800,
                            }}
                          >
                            {initialOf(fullName)}
                          </td>
                          <td style={{ paddingLeft: 14 }}>
                            <p
                              style={{
                                margin: 0,
                                fontSize: 17,
                                fontWeight: 700,
                                color: COLORS.ink,
                              }}
                            >
                              {fullName}
                            </p>
                            <a
                              href={`mailto:${email}`}
                              style={{
                                fontSize: 14,
                                color: COLORS.accent,
                                textDecoration: "none",
                              }}
                            >
                              {email}
                            </a>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>

                {/* message */}
                <tr>
                  <td style={{ padding: "24px 32px 0" }}>
                    <p
                      style={{
                        margin: "0 0 10px",
                        fontFamily: MONO,
                        fontSize: 11,
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: COLORS.muted,
                      }}
                    >
                      Message
                    </p>
                    <div
                      style={{
                        backgroundColor: COLORS.quote,
                        borderLeft: `4px solid ${COLORS.accent}`,
                        borderRadius: 12,
                        padding: "18px 20px",
                        fontSize: 15,
                        lineHeight: 1.65,
                        color: COLORS.ink,
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-word",
                      }}
                    >
                      {message}
                    </div>
                  </td>
                </tr>

                {/* reply button */}
                <tr>
                  <td style={{ padding: "28px 32px 8px" }}>
                    <a
                      href={`mailto:${email}?subject=${encodeURIComponent(
                        "Re: your message on my portfolio"
                      )}`}
                      style={{
                        display: "inline-block",
                        backgroundColor: COLORS.accent,
                        color: "#ffffff",
                        fontSize: 15,
                        fontWeight: 700,
                        textDecoration: "none",
                        padding: "12px 24px",
                        borderRadius: 999,
                      }}
                    >
                      Reply to {fullName.split(" ")[0]} →
                    </a>
                  </td>
                </tr>

                {/* meta + footer */}
                <tr>
                  <td style={{ padding: "20px 32px 28px" }}>
                    <p style={{ margin: 0, fontSize: 13, color: COLORS.muted }}>
                      Received {receivedAt}
                    </p>
                  </td>
                </tr>
                <tr>
                  <td
                    style={{
                      borderTop: `1px solid ${COLORS.line}`,
                      padding: "18px 32px",
                      fontSize: 12,
                      color: COLORS.muted,
                    }}
                  >
                    Sent from the contact form on{" "}
                    <a
                      href={siteUrl}
                      style={{ color: COLORS.ink, fontWeight: 600, textDecoration: "none" }}
                    >
                      {siteUrl.replace(/^https?:\/\//, "")}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

/** Plain-text fallback for clients that block HTML. */
export const emailText = ({
  fullName,
  email,
  message,
  receivedAt,
}: EmailTemplateProps): string =>
  `New contact message from your portfolio\n\nFrom: ${fullName} <${email}>\nReceived: ${receivedAt}\n\n${message}\n`;
