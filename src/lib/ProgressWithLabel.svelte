<script lang="ts">
	import {Progress} from "$lib/components/ui/progress"

	const {index, length}: { index: number, length: number } = $props()
</script>

<div class="w-full inline-flex justify-around items-center gap-4 px-4 py-4">

<!--    <span>-->
<!--        <code class="text-xl text-base-content/30">-->
<!--            <b>{index + 1}</b>/{length}-->
<!--        </code>-->
<!--    </span>-->

	<Progress value={index + 1} max={length} class="opacity-20"/>

</div>
