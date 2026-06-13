
export async function initFooterVersion() {
  try {
    const res = await fetch("./docs/CHANGELOG.md");
    const text = await res.text();

    const match = text.match(/\[(\d+\.\d+\.\d+)\]/);
    const latestVersion = match?.[1] ?? "1.0.0";

    const footerText = document.querySelector(".footer__text");

    if (footerText) {
      footerText.innerHTML = `&copy; Oleh Vicky Suganda Putra (V${latestVersion})`;
    }
  } catch (error) {
    console.error("Gagal memuat versi:", error);
  }
}