<script lang="ts">
   import {QuillEgyptianText} from "$lib/word/egyptian/RTE"
   import Quill from "quill"
	import { g, JoinVertically, JoinHorizontally, Ungroup, Structure } from "$lib/word/egyptian/hieroglyphs"
	import {onMount} from "svelte"
	import {preferredEgyptianTransliterationParserForEdit, preferredSentenceTransliterationDumperForEdit} from "$lib/settings/store/egyptian"
	import {CandidatesFromPhonemes} from "$lib/word/egyptian/dictionary"
	import EgyptianText from "$lib/components/EgyptianText.svelte"
	import {QuickSymbols} from "$lib/word/egyptian/IME"
   import {_} from "$lib/i18n/store"
	import Switch from "$lib/components/ui/switch/switch.svelte"
	import Label from "$lib/components/ui/label/label.svelte"
	import Button from "$lib/components/ui/button/button.svelte"
	import {CandidatesFromXiaoheKmt} from "$lib/word/egyptian/dictionary/xiaohe-kmt"

   let quill: Quill
   let editor: HTMLDivElement | undefined = $state(undefined)
   let imeEnabled = $state(true)

   let boundsTop = $state(0)
   let boundsLeft = $state(0)
   let boundsHeight = $state(0)

   let keyboardBuffer: string[] = $state([])

   const keyboardBufferEmpty = $derived(keyboardBuffer.length == 0)

   const phonemeBuffer = $derived($preferredEgyptianTransliterationParserForEdit.eval(keyboardBuffer.join("")))

   const candidates = $derived.by(() =>
   {
      if (keyboardBuffer[0] == "o")
      {
         const determinativeSearchString = keyboardBuffer.join("").substring(1)

         return CandidatesFromXiaoheKmt(determinativeSearchString)
      }

      if (phonemeBuffer instanceof Error)
         return []

      return CandidatesFromPhonemes(phonemeBuffer)
   })

   const popupTop = $derived.by(() =>
   {
      if (editor == undefined) return 0
      return editor.getBoundingClientRect().top + boundsTop + boundsHeight
   })

   const popupLeft = $derived.by(() =>
   {
      if (editor == undefined) return 0
      return editor.getBoundingClientRect().left + boundsLeft
   })

   $effect(() =>
   {
      keyboardBufferEmpty

      if (quill == undefined)
         return

      const range = quill.getSelection()

      if (range == null)
         return

      const bounds = quill.getBounds(range.index)

      if (bounds == null)
         return

      boundsTop = bounds.top
      boundsLeft = bounds.left
      boundsHeight = bounds.height
   })

   onMount(() =>
   {
      quill = new Quill("#editor", {
         modules: {
            keyboard: {
               bindings: {
                  imeBackspace: {
                     key: "Backspace",
                     collapsed: true,
                     handler: ImeBackspace
                  },
                  imeSpace: {
                     key: " ",
                     collapsed: true,
                     handler: ImeSpace
                  },
                  imeEqual: {
                     key: "=",
                     collapsed: true,
                     handler: ImeEqualKeyDown
                  },
                  imeMinus: {
                     key: "-",
                     collapsed: true,
                     handler: ImeMinusKeyDown
                  },
                  imeEnter: {
                     key: "Enter",
                     collapsed: true,
                     handler: ImeEnterKeyDown
                  },
               }
            }
         }
      })

      for (const letter of [
         "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
         "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
      ])
      {
         quill.keyboard.addBinding({
            key: letter,
            collapsed: true
         }, {}, () => ImePhonemeKeyDown(letter))
      }

      for (const letter of [
         "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
         "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
      ])
      {
         quill.keyboard.addBinding({
            key: letter,
            collapsed: true,
            shiftKey: true
         }, {}, () => ImePhonemeKeyDown(letter))
      }

      for (const i of [0,1,2,3,4,5,6,7,8,9])
      {
         quill.keyboard.addBinding({
            key: i.toString(),
            collapsed: true,
         }, {}, () => ImeNumberKeyDown(i))
      }
   })

   function ImePhonemeKeyDown(key: string)
   {
      if (!imeEnabled)
         return true

      keyboardBuffer.push(key)
      return false
   }

   function ImeNumberKeyDown(number: number)
   {
      if (!imeEnabled)
         return true

      if (keyboardBuffer.length == 0)
      {
         const symbol = g(QuickSymbols[number.toString()])
         quill.insertEmbed(quill.getSelection()!.index, QuillEgyptianText.blotName, symbol)
         quill.setSelection(quill.getSelection()!.index + 1)
         return false
      }

      if (number - 1 > candidates.length || number == 0)
         return

      const candidate = candidates[number - 1]

      quill.insertEmbed(quill.getSelection()!.index, QuillEgyptianText.blotName, candidate.Word)
      quill.setSelection(quill.getSelection()!.index + 1)

      keyboardBuffer = []

      return false
   }

   function ImeEqualKeyDown()
   {
      if (!imeEnabled)
         return true

      const range = quill.getSelection(true)

      if (range.index >= 2 && keyboardBuffer.length == 0)
      {
         const [blot1] = quill.getLeaf(range.index - 1)
         const [blot2] = quill.getLeaf(range.index)

         if (!(blot1 instanceof QuillEgyptianText))
            return true

         if (!(blot2 instanceof QuillEgyptianText))
            return true

         const text1 = blot1.value()
         const text2 = blot2.value()
         const newText = JoinVertically(text1, text2)

         quill.deleteText(range.index - 2, 2)
         quill.insertEmbed(range.index - 2, QuillEgyptianText.blotName, newText)
         quill.setSelection(range.index - 1)

         return false
      }

      if (range.index >= 1 && candidates.length > 0)
      {
         const [blot] = quill.getLeaf(range.index)

         if (!(blot instanceof QuillEgyptianText))
            return true

         const text = blot.value()
         const newText = JoinVertically(text, candidates[0].Word)

         quill.deleteText(range.index - 1, 1)
         quill.insertEmbed(range.index - 1, QuillEgyptianText.blotName, newText)
         quill.setSelection(range.index)

         keyboardBuffer = []

         return false
      }

      return true
   }

   function ImeMinusKeyDown()
   {
      if (!imeEnabled)
         return true

      const range = quill.getSelection(true)

      if (range.index >= 2 && keyboardBuffer.length == 0)
      {
         const [blot1] = quill.getLeaf(range.index - 1)
         const [blot2] = quill.getLeaf(range.index)

         if (!(blot1 instanceof QuillEgyptianText))
            return true

         if (!(blot2 instanceof QuillEgyptianText))
            return true

         const text1 = blot1.value()
         const text2 = blot2.value()
         const newText = JoinHorizontally(text1, text2)

         quill.deleteText(range.index - 2, 2)
         quill.insertEmbed(range.index - 2, QuillEgyptianText.blotName, newText)
         quill.setSelection(range.index - 1)

         return false
      }

      if (range.index >= 1 && candidates.length > 0)
      {
         const [blot] = quill.getLeaf(range.index)

         if (!(blot instanceof QuillEgyptianText))
            return true

         const text = blot.value()
         const newText = JoinHorizontally(text, candidates[0].Word)

         quill.deleteText(range.index - 1, 1)
         quill.insertEmbed(range.index - 1, QuillEgyptianText.blotName, newText)
         quill.setSelection(range.index)

         keyboardBuffer = []

         return false
      }

      return true
   }

   function ImeBackspace()
   {
      if (!imeEnabled)
         return true

      if (keyboardBuffer.length > 0)
      {
         keyboardBuffer.pop()
         return false
      }

      const range = quill.getSelection(true)

      if (range.index >= 1)
      {
         const [blot] = quill.getLeaf(range.index)

         if (!(blot instanceof QuillEgyptianText))
            return true

         const x = blot.value()

         if (x[0] == Structure.Glyph)
            return true

         const xs = Ungroup(blot.value())

         quill.deleteText(range.index - 1, 1)

         for (const x of xs.reverse())
            quill.insertEmbed(range.index - 1, QuillEgyptianText.blotName, x)

         quill.setSelection(range.index - 1 + xs.length)

         return false
      }

      return true
   }

   function ImeSpace()
   {
      if (!imeEnabled)
         return true

      if (keyboardBufferEmpty)
         return true

      if (candidates.length > 0)
         return ImeNumberKeyDown(1)

      return true
   }

   function ImeEnterKeyDown()
   {
      if (!imeEnabled)
         return true

      if (candidates.length > 0)
         return ImeNumberKeyDown(1)

      return true
   }
</script>

<svelte:head>
   <title>{$_.egyptian.rte.title}</title>
</svelte:head>

<div class="m-4 print:hidden flex items-center space-x-4">
   <Button onclick={() => window.print()} variant="outline">
      {$_.print}
   </Button>
   <Label>
      {$_?.egyptian.rte.enable_ime}
      <Switch bind:checked={imeEnabled}/>
   </Label>
</div>

<div id="editor" class="text-xl" bind:this={editor}>
</div>

{#if !keyboardBufferEmpty}
   <div
      id="ime-popup"
      class="absolute mt-1 py-1 px-2 border-2 border-foreground/20 rounded shadow-lg bg-card flex flex-col"
      class:text-red-500={phonemeBuffer instanceof Error && keyboardBuffer[0] != "o"}
      style="top: {popupTop}px; left: {popupLeft}px;"
   >

      <div>
         {keyboardBuffer.join("")}
      </div>

      <div class="flex flex-col">
         {#each candidates as candidate, index}
            <div class="inline-flex space-x-2">
               <span>{index + 1}.</span>
               <EgyptianText t={[candidate.Word]} />
               {#if candidate.Tail != undefined}
                  <span class="text-foreground/50">
                     {$preferredSentenceTransliterationDumperForEdit(candidate.Tail)}
                  </span>
               {/if}
            </div>
         {/each}
      </div>
   </div>
{/if}

<style lang="postcss">
   @import "tailwindcss";

   #editor {
      @apply p-4 outline-1 bg-white text-black;

      @media print {
         @apply m-0 p-0 outline-none;
      }
   }

   #ime-popup {
      @media print {
         display: none;
      }
   }

   :global(.ql-editor) {
      outline: none;
   }
</style>
