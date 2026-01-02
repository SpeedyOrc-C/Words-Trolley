<script lang="ts">
	import {BlockEditor} from "$lib/components/block-editor"
	import * as M from "$lib/components/ui/menubar"
	import {_} from "$lib/i18n/store"
	import {Validate} from "$lib/components/block-editor/validate"
	import {toast} from "svelte-sonner"

	import FolderInput from "@lucide/svelte/icons/folder-input"
	import FolderOutput from "@lucide/svelte/icons/folder-output"
	import EditorNavRightButtons from "$lib/components/EditorNavRightButtons.svelte"
	import EditorPreviewPanes from "$lib/components/block-editor/EditorPreviewPanes.svelte"
	import RenderDocument from "$lib/components/block-editor/RenderDocument.svelte"

	import Columns2 from "@lucide/svelte/icons/columns-2"
	import Rows2 from "@lucide/svelte/icons/rows-2"
	import Eye from "@lucide/svelte/icons/eye"

	let saved = $state(false)
	let viewMode = $state(BlockEditor.ViewMode.Horizontal)
	let content: BlockEditor.Document = $state([])

	function Import()
	{
		const input = document.createElement("input")
		input.type = "file"
		input.accept = ".json"

		input.onchange = async function ()
		{
			const {files} = input

			if (files == null || files.length != 1)
			{
				console.error("Expect exactly one file")
				return
			}

			const rawText = await files[0].text()

			let rawJson: any

			try
			{
				rawJson = JSON.parse(rawText)
			}
			catch (e)
			{
				console.error(e)
				toast.error($_.file.import.bad_file_error)
				return
			}

			const result = Validate(rawJson)

			if (result instanceof Error)
			{
				console.error(result)
				toast.error($_.file.import.bad_file_error)
				return
			}

			content = result
			toast.success($_.file.import.win)
		}

		input.click()
	}

	function Export()
	{
		const output = new Blob([JSON.stringify($state.snapshot<any>(content))])
		const url = URL.createObjectURL(output)

		const a = document.createElement("a")
		a.href = url
		a.download = "document.doc.wt.json"
		a.click()

		URL.revokeObjectURL(url)
	}
</script>

<svelte:head>
	<title>{$_.block_editor._}</title>
</svelte:head>

<div class="box-border p-4 pt-2 flex flex-col gap-4" style="height: 100svh">

	<nav class="flex justify-between items-center gap-2 print:hidden">

		<M.Root class="flex-1">
			<M.Menu>
				<M.Trigger>
					{$_.file._}
				</M.Trigger>
				<M.Content>
					<M.Item onclick={Import}>
						<FolderInput />
						{$_.file.import._}
					</M.Item>
					<M.Item onclick={Export}>
						<FolderOutput />
						{$_.file.export}
					</M.Item>
				</M.Content>
			</M.Menu>
			<M.Menu>
				<M.Trigger>
					{$_.editor.view._}
				</M.Trigger>
				<M.Content>
					<M.RadioGroup bind:value={viewMode}>
						<M.RadioItem value={BlockEditor.ViewMode.Horizontal}>
							<Columns2 />
							{$_.block_editor.view.left_right}
						</M.RadioItem>
						<M.RadioItem value={BlockEditor.ViewMode.Vertical}>
							<Rows2 />
							{$_.block_editor.view.top_bottom}
						</M.RadioItem>
						<M.Separator/>
						<M.RadioItem value={BlockEditor.ViewMode.Preview}>
							<Eye />
							{$_.block_editor.view.preview}
						</M.RadioItem>
					</M.RadioGroup>
				</M.Content>
			</M.Menu>
		</M.Root>

		<EditorNavRightButtons {saved} />

	</nav>

	<main class="min-h-0 grow">
		{#if viewMode == BlockEditor.ViewMode.Horizontal || viewMode == BlockEditor.ViewMode.Vertical}
			<EditorPreviewPanes bind:content direction={viewMode} />
		{:else if viewMode == BlockEditor.ViewMode.Preview}
			<RenderDocument {content} />
		{/if}
	</main>

</div>
