function parseFrontMatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: markdown.trim() };

  const meta = {};
  match[1].split("\n").forEach((line) => {
    const [key, ...rest] = line.split(":");
    if (!key || rest.length === 0) return;
    const value = rest.join(":").trim();
    if (value.startsWith("[") && value.endsWith("]")) {
      meta[key.trim()] = value
        .slice(1, -1)
        .split(",")
        .map((item) => item.trim().replace(/^"|"$/g, ""))
        .filter(Boolean);
    } else {
      meta[key.trim()] = value.replace(/^"|"$/g, "");
    }
  });

  return { meta, body: match[2].trim() };
}

export function parseBlogPosts(modules) {
  return Object.entries(modules)
    .map(([path, markdown]) => {
      const { meta, body } = parseFrontMatter(markdown);
      return {
        slug: path.split("/").pop().replace(/\.md$/, ""),
        title: meta.title || "Untitled",
        date: meta.date || "",
        summary: meta.summary || body.slice(0, 140),
        tags: meta.tags || [],
        body
      };
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}
