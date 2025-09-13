<script lang="ts">
	import InputEgyptianHieroglyphs from "$lib/components/editor/InputEgyptianHieroglyphs.svelte"
	import {Label} from "$lib/components/ui/label"
	import {Slider} from "$lib/components/ui/slider"
	import {Switch} from "$lib/components/ui/switch"
	import {_} from "$lib/i18n"

	let useCustomTextColour = $state(false)
	let customTextColour = $state("#000000")
	let hideCursor = $state(false)
	let hideInputBorder = $state(false)
	let hideControls = $state(false)
	let height = $state(48)

	const textColour = $derived(useCustomTextColour ? customTextColour : "inherit")
</script>

<svelte:head>
	<title>{$_.egyptian.typewriter.title}</title>
</svelte:head>

<div class="mx-auto p-4 w-full xl:w-fit flex flex-col xl:flex-row gap-4">

	<div class="xl:w-xs flex flex-col gap-4">

		<div class="flex gap-4">
			<Label for="height">{$_.egyptian.typewriter.height}</Label>
			<Slider bind:value={height} id="height" class="flex-1" max={96} min={16} type="single"/>
			<code>{height}</code>
		</div>

		<div class="flex items-center">
			<div class="flex items-center gap-2">
				<Switch bind:checked={useCustomTextColour} title={$_.egyptian.typewriter.enable_custom_text_colour}/>
				<input bind:value={customTextColour} class="h-9 w-12 outline-1" id="text-colour" type="color">
			</div>
			<Label class="pl-4" for="text-colour">
				{$_.egyptian.typewriter.custom_text_colour}
			</Label>
		</div>

		<div class="flex items-center">
			<Switch bind:checked={hideCursor} id="hide-cursor"/>
			<Label class="pl-4" for="hide-cursor">
				{$_.egyptian.typewriter.hide_cursor}
			</Label>
		</div>

		<div class="flex items-center">
			<Switch bind:checked={hideInputBorder} id="hide-input-border"/>
			<Label class="pl-4" for="hide-input-border">
				{$_.egyptian.typewriter.hide_input_border}
			</Label>
		</div>

		<div class="flex items-center">
			<Switch bind:checked={hideControls} id="hide-controls"/>
			<Label class="pl-4" for="hide-controls">
				{$_.egyptian.typewriter.hide_controls}
			</Label>
		</div>

	</div>

	<div class="xl:w-3xl">
		<InputEgyptianHieroglyphs
			color={textColour}
			{height}
			{hideControls}
			{hideCursor}
			{hideInputBorder}
		/>
	</div>

</div>
