<script lang="ts">
	import type {BlockEditor} from "$lib/block-editor"
	import RenderDocument from "$lib/block-editor/RenderDocument.svelte"
	import * as M from "$lib/components/ui/menubar"
	import RenderBlockEditor from "$lib/block-editor/RenderDocumentEditor.svelte"
	import {_} from "$lib/i18n/store"
	import {Validate} from "$lib/block-editor/validate"
	import {toast} from "svelte-sonner"

	import FolderInput from "@lucide/svelte/icons/folder-input"
	import FolderOutput from "@lucide/svelte/icons/folder-output"
	import Separator from "$lib/components/ui/separator/separator.svelte"
	import EditorNavRightButtons from "$lib/components/EditorNavRightButtons.svelte"

	let saved = $state(false)
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

<div class="box-border p-4 pt-2 h-screen flex flex-col gap-4">

	<div class="flex justify-between items-center gap-2">

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
		</M.Root>

		<EditorNavRightButtons {saved} />

	</div>

	<main class="min-h-0 grow rounded outline-1 flex bg-card">
		<div class="p-2 flex-1 overflow-auto">
			<RenderBlockEditor bind:content />
		</div>

		<Separator orientation="vertical" />

		<div class="p-2 flex-1 overflow-auto">
			<RenderDocument {content} />
		</div>
	</main>
</div>
