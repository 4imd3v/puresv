import { error } from "@sveltejs/kit";
import { blocks, type BlockMeta } from "../_registry";

export function load({ params }: { params: { slug: string } }): { block: BlockMeta } {
  const block = blocks.find((candidate) => candidate.slug === params.slug);
  if (!block) error(404, "Block not found");
  return { block };
}
