import Image from "next/image";
import { Fragment, type ReactNode } from "react";
import type {
  PortableBlock,
  PortableCode,
  PortableImage,
  PortableNode,
  PortableSpan,
  PortableTable,
  PortableVideo,
} from "@/lib/content/posts";

/**
 * Renders a Sanity Portable Text body as plain server-side React.
 *
 * Written out rather than pulled from a package because the surface is small
 * (paragraphs, headings, lists, links, an image and a code block) and because the
 * output has to land on this site's own type scale rather than a library's
 * defaults. Styling lives in app/blog.css under `.prose`.
 */

type ListNode = {
  type: "bullet" | "number";
  items: { block: PortableBlock; children: ListNode[] }[];
};

export type Group = { kind: "node"; node: PortableNode } | { kind: "list"; list: ListNode };

/**
 * Sanity stores a list as consecutive flat blocks with a `level`. This folds them
 * back into the nested lists HTML needs.
 */
export function groupNodes(nodes: PortableNode[]): Group[] {
  const groups: Group[] = [];
  let stack: ListNode[] = [];

  for (const node of nodes) {
    const block = node._type === "block" ? (node as PortableBlock) : null;

    if (!block?.listItem) {
      stack = [];
      groups.push({ kind: "node", node });
      continue;
    }

    const level = Math.max(1, block.level ?? 1);
    const type = block.listItem;

    // Close any lists deeper than this item.
    stack = stack.slice(0, level);

    // A different list type at this depth ends that list and starts another.
    if (stack.length === level && stack[level - 1].type !== type) stack = stack.slice(0, level - 1);

    // Open lists until there is one at this depth.
    while (stack.length < level) {
      const list: ListNode = { type, items: [] };
      const parent = stack[stack.length - 1];
      const lastItem = parent?.items[parent.items.length - 1];
      if (lastItem) lastItem.children.push(list);
      else groups.push({ kind: "list", list });
      stack.push(list);
    }

    stack[level - 1].items.push({ block, children: [] });
  }

  return groups;
}

/** A YouTube address worth linking to, or null. Anything else is not rendered. */
export function safeVideoUrl(url: string | undefined): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    const host = u.hostname.replace(/^www\./, "");
    return u.protocol === "https:" && (host === "youtube.com" || host === "youtu.be") ? u.toString() : null;
  } catch {
    return null;
  }
}

/** Only link schemes that are safe to follow; anything else renders as plain text. */
export function safeHref(href: string | undefined): string | null {
  if (!href) return null;
  const value = href.trim();
  if (/^(https?:\/\/|mailto:|tel:)/i.test(value)) return value;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (value.startsWith("#")) return value;
  return null;
}

export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function plainText(block: PortableBlock): string {
  return (block.children ?? []).map((c) => c.text).join("");
}

function withBreaks(text: string): ReactNode {
  const parts = text.split("\n");
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {part}
    </Fragment>
  ));
}

function renderSpan(span: PortableSpan, block: PortableBlock, key: string): ReactNode {
  let out: ReactNode = withBreaks(span.text);

  for (const mark of span.marks ?? []) {
    switch (mark) {
      case "strong":
        out = <strong>{out}</strong>;
        break;
      case "em":
        out = <em>{out}</em>;
        break;
      case "code":
        out = <code>{out}</code>;
        break;
      case "underline":
        out = <u>{out}</u>;
        break;
      case "strike-through":
        out = <s>{out}</s>;
        break;
      default: {
        const def = block.markDefs?.find((d) => d._key === mark);
        const href = def?._type === "link" ? safeHref(def.href) : null;
        if (href) {
          const external = /^https?:\/\//i.test(href);
          out = (
            <a href={href} {...(external ? { rel: "noopener noreferrer", target: "_blank" } : {})}>
              {out}
            </a>
          );
        }
      }
    }
  }
  return <Fragment key={key}>{out}</Fragment>;
}

function renderChildren(block: PortableBlock): ReactNode {
  return (block.children ?? []).map((span, i) => renderSpan(span, block, `${span._key ?? i}`));
}

function renderList(list: ListNode, key: string): ReactNode {
  const Tag = list.type === "number" ? "ol" : "ul";
  return (
    <Tag key={key}>
      {list.items.map((item, i) => (
        <li key={item.block._key ?? i}>
          {renderChildren(item.block)}
          {item.children.map((child, j) => renderList(child, `${item.block._key ?? i}-${j}`))}
        </li>
      ))}
    </Tag>
  );
}

const warned = new Set<string>();

export default function PortableText({ value }: { value: PortableNode[] }) {
  // Each table is a labelled region, and landmarks on one page need distinct names.
  const tableTotal = value.filter((n) => n._type === "table").length;
  let tableNumber = 0;
  const usedIds = new Map<string, number>();
  const idFor = (block: PortableBlock) => {
    const base = slugifyHeading(plainText(block)) || "section";
    const seen = usedIds.get(base) ?? 0;
    usedIds.set(base, seen + 1);
    return seen === 0 ? base : `${base}-${seen + 1}`;
  };

  return (
    <div className="prose">
      {groupNodes(value).map((group, index) => {
        if (group.kind === "list") return renderList(group.list, `list-${index}`);

        const node = group.node;
        const key = node._key ?? `n-${index}`;

        if (node._type === "block") {
          const block = node as PortableBlock;
          if (plainText(block).trim() === "") return null;

          switch (block.style) {
            // The page title is the only h1, so a body "h1" is demoted to h2.
            case "h1":
            case "h2":
              return (
                <h2 key={key} id={idFor(block)}>
                  {renderChildren(block)}
                </h2>
              );
            case "h3":
              return (
                <h3 key={key} id={idFor(block)}>
                  {renderChildren(block)}
                </h3>
              );
            case "h4":
            case "h5":
            case "h6":
              return <h4 key={key}>{renderChildren(block)}</h4>;
            case "blockquote":
              return <blockquote key={key}>{renderChildren(block)}</blockquote>;
            default:
              return <p key={key}>{renderChildren(block)}</p>;
          }
        }

        if (node._type === "image") {
          const image = node as PortableImage;
          if (!image.src) return null;
          return (
            <figure key={key}>
              <Image
                src={image.src}
                alt={image.alt ?? ""}
                width={image.width || 1200}
                height={image.height || 800}
                sizes="(max-width: 800px) 100vw, 720px"
              />
              {image.caption && <figcaption>{image.caption}</figcaption>}
            </figure>
          );
        }

        if (node._type === "table") {
          const rows = (node as PortableTable).rows ?? [];
          if (rows.length === 0) return null;
          const [head, ...rest] = rows;
          return (
            // A wide table scrolls inside its own box instead of widening the
            // page; the box is focusable so a keyboard user can scroll it.
            <div
              key={key}
              className="prose-table"
              role="region"
              aria-label={tableTotal > 1 ? `Table ${++tableNumber}` : "Table"}
              tabIndex={0}
            >
              <table>
                <thead>
                  <tr>
                    {(head.cells ?? []).map((cell, i) => (
                      <th key={i} scope="col">
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>
                {rest.length > 0 && (
                  <tbody>
                    {rest.map((row, r) => (
                      <tr key={row._key ?? r}>
                        {(row.cells ?? []).map((cell, i) => (
                          <td key={i}>{cell}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          );
        }

        if (node._type === "youtube") {
          const href = safeVideoUrl((node as PortableVideo).url);
          if (!href) return null;
          // A link, not an embed: nothing is requested from YouTube until a reader
          // chooses to watch, which keeps this consistent with the cookie consent.
          return (
            <p key={key} className="prose-video">
              <a href={href} target="_blank" rel="noopener noreferrer">
                Watch the video on YouTube
              </a>
            </p>
          );
        }

        if (node._type === "code") {
          const code = node as PortableCode;
          return (
            <figure key={key} className="prose-code">
              {code.filename && <figcaption>{code.filename}</figcaption>}
              {/* Focusable so a keyboard user can scroll a long line. */}
              <pre tabIndex={0}>
                <code>{code.code}</code>
              </pre>
            </figure>
          );
        }

        // Surfaced in the build log rather than dropped silently, so a block the
        // CMS can produce but this renderer cannot is noticed.
        if (!warned.has(node._type)) {
          warned.add(node._type);
          console.warn(`[blog] PortableText: no renderer for block type "${node._type}"; it was skipped`);
        }
        return null;
      })}
    </div>
  );
}
