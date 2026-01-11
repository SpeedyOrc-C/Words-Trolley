<script lang="ts">
	import {Structure, type Hieroglyphs} from "$lib/word/maya/hieroglyphs"
   import Self from "./RenderMayaHieroglyphs.svelte"

   const {
      hie,
      lineHeight,
      freeHeight = 1,
      freeWidth = 1,
   }: {
      hie: Hieroglyphs
      lineHeight: number
      freeHeight?: number
      freeWidth?: number
   } = $props()

   const [struct, arg] = hie

   function IsFlat(x: Hieroglyphs): boolean
   {
      const [struct] = x
      return struct == Structure.Prefix
         || struct == Structure.Suffix
         || struct == Structure.Subfix
         || struct == Structure.Superfix
   }
</script>

{#if struct == Structure.Glyph}
   <span
      style:height={`${lineHeight * freeHeight}px`}
      style:width={`${lineHeight * freeWidth}px`}
      class="bg-orange-400 box-border border border-white"
   >
   </span>
{:else if struct == Structure.Prefix || struct == Structure.Suffix || struct == Structure.Subfix || struct == Structure.Superfix}
   <span
      style:height={`${lineHeight * freeHeight}px`}
      style:width={`${lineHeight * freeWidth}px`}
      class="bg-green-400 box-border border border-white"
   >
   </span>
{:else if struct == Structure.Vertical}
   {@const flatCount = arg.filter(IsFlat).length}
   {@const bigCount = arg.length - flatCount}
   {@const weightSum = flatCount + 2 * bigCount}
   <span class="flex flex-col items-center justify-between">
      {#each arg as child}
         {#if IsFlat(child)}
            <Self {lineHeight} hie={child} freeHeight={freeHeight / weightSum} {freeWidth} />
         {:else}
            <Self {lineHeight} hie={child} freeHeight={2 * freeHeight / weightSum} {freeWidth} />
         {/if}
      {/each}
   </span>
{:else if struct == Structure.Horizontal}
   {@const flatCount = arg.filter(IsFlat).length}
   {@const bigCount = arg.length - flatCount}
   {@const weightSum = flatCount + 2 * bigCount}
   <span class="flex flex-row items-center justify-between">
      {#each arg as child}
         {#if IsFlat(child)}
            <Self {lineHeight} hie={child} freeWidth={freeWidth / weightSum} {freeHeight} />
         {:else}
            <Self {lineHeight} hie={child} freeWidth={2 * freeWidth / weightSum} {freeHeight} />
         {/if}
      {/each}
   </span>
{/if}
