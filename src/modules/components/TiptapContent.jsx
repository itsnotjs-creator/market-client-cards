import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";

const extensions = [
  StarterKit,
  TextAlign.configure({ types: ["heading", "paragraph"] }),
  Underline,
  Link.configure({ openInNewTab: true }),
];

export default function TiptapContent({ content }) {
  if (!content) return null;

  let html = "";

  // If content is already an HTML string, render it directly
  if (typeof content === "string") {
    html = content.startsWith("{") ? "" : content;
    if (!html) {
      try {
        const json = JSON.parse(content);
        html = generateHTML(json, extensions);
      } catch {
        html = content;
      }
    }
  } else if (typeof content === "object") {
    // It's a TipTap JSON object
    html = generateHTML(content, extensions);
  }

  return (
    <div
      className="tiptap-content"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}