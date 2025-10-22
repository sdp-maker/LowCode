import type { Block } from "./block"

export type Page = {
  id: string,
  title: string,
  blocks: Block[]
}