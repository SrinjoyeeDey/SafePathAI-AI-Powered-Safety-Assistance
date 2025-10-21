const decodeHtml = (str: string) => {
  const txt = document.createElement('textarea');
  txt.innerHTML = str;
  return txt.value;
};

const formatResponse = (text: string) => {
  if (!text) return { __html: '' };

  // 🔹 Step 1: Decode entities if text looks like escaped HTML
  if (text.includes('&lt;') && text.includes('&gt;')) {
    text = decodeHtml(text);
  }

  let html = text;

  // 🔹 Step 2: Handle code blocks
  html = html.replace(/```([\s\S]*?)```/g, (_match: any, code: string) => {
    const escapedCode = escapeHtml(code.trim());
    return `<pre class="bg-gray-800 text-white p-4 rounded-lg my-4 overflow-x-auto text-sm font-mono">${escapedCode}</pre>`;
  });

  // 🔹 Step 3: Handle lists
  html = html.replace(
    /^((\s*([*]|\-)\s+[^\n]+)|(\s*\d+\.\s+[^\n]+))(\n((\s*([*]|\-)\s+[^\n]+)|(\s*\d+\.\s+[^\n]+)))*$/gm,
    (match: string) => {
      const lines = match.trim().split('\n');
      const isOrdered = /^\s*\d+\./.test(lines[0]);
      const tag = isOrdered ? 'ol' : 'ul';
      const items = lines
        .map(
          (line: string) =>
            `<li>${processInlineFormatting(
              line.replace(/^\s*([*]|\-|\d+\.)\s*/, '')
            )}</li>`
        )
        .join('');
      return `<${tag} class="list-inside my-2 pl-4 space-y-1">${items}</${tag}>`;
    }
  );

  // 🔹 Step 4: Paragraphs
  const paragraphs = html.split(/\n\s*\n/).filter((p: string) => p.trim() !== '');
  html = paragraphs
    .map((p: string) => {
      if (p.startsWith('<pre>') || p.startsWith('<ul>') || p.startsWith('<ol>')) {
        return p;
      }
      return `<p>${processInlineFormatting(p).replace(/\n/g, '<br/>')}</p>`;
    })
    .join('');

  return { __html: html };
};
const processInlineFormatting = (text: string) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code class="bg-gray-200 text-red-600 font-mono py-0.5 px-1.5 rounded-md text-sm">$1</code>');
};

function escapeHtml(_arg0: string) {
    throw new Error("Function not implemented.");
}
export { formatResponse };