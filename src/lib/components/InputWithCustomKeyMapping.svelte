<script lang="ts">
	import Input, {type Props} from "./ui/input/input.svelte"

   let {
      value = $bindable(""),
      onchange: _onchange,
      oninput: _oninput,
      onfocusout: _onfocusout,
      mapping = $bindable(),
      ...props
   }: Props & {
      mapping: Record<string, string>
   } = $props()

   let input: HTMLInputElement = $state(null as any)
   let newValue = $state(value)

   function onchange()
   {
      value = input.value
      _onchange?.(value)
   }

   function oninput()
   {
      newValue = input.value
      _oninput?.(newValue)
   }

   function onkeydown(e: KeyboardEvent & { currentTarget: HTMLInputElement })
   {
		if (e.metaKey || e.ctrlKey || e.altKey || e.isComposing)
			return

      if (e.code == "Enter" && value != newValue)
      {
         value = newValue
         _onchange?.(value)
         return
      }

		const {currentTarget: t} = e

      const actualChar = mapping[e.code] as string | undefined

      if (actualChar != undefined)
      {
         e.preventDefault()
         InsertChar(actualChar)
      }

      if (t.value != newValue)
      {
         newValue = t.value
         _oninput?.(newValue)
      }
   }

   function onfocusout(e: FocusEvent & { currentTarget: HTMLInputElement })
   {
      if (newValue != value)
      {
         value = newValue
         _onchange?.(value)
      }
      _onfocusout?.(e)
   }

   function InsertChar(char: string)
   {
      const oldStart = input.selectionStart
      const oldEnd = input.selectionEnd

      if (oldStart == null || oldEnd == null)
         return

      input.value = input.value.slice(0, oldStart) + char + input.value.slice(oldEnd)
      input.setSelectionRange(oldStart + 1, oldStart + 1)
   }
</script>

<Input
   bind:ref={input}
   {value}
   {oninput}
   {onchange}
   {onkeydown}
   {onfocusout}
   {...props}
/>
