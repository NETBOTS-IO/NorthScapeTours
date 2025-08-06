export function calculateReadTime(content) {
  if (!content || !Array.isArray(content.blocks)) return 1;

  const plainText = content.blocks
    .map((block) => {
      if (block.type === "paragraph" && block.data?.text) {
        return block.data.text;
      }
      if (block.type === "header" && block.data?.text) {
        return block.data.text;
      }
      if (block.type === "list" && block.data?.items) {
        return block.data.items.join(" ");
      }
      return "";
    })
    .join(" ");

  const wordCount = plainText.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200); // avg: 200 wpm

  return readTime || 1;
}
