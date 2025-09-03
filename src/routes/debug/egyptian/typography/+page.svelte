<script>
    import Egyptian from "../Egyptian.svelte"
</script>

<div class="mx-auto p-4 w-full max-w-xl">

	<p class="text-3xl my-4">
		We're presenting beautiful Egyptian
		<Egyptian
			t={[["H",[["V",[["G","𓂋"],["G","𓏤"],["G","𓈖"]]],["H",[["G","𓆎"],["G","𓅓"],["V",[["G","𓏏"],["G","𓊖"]]]]]]]]}
		/>
		in a modern browser
	</p>

	<p class="my-2 text-xl">
		The word for
		"<span class="text-yellow-600">desert</span>"
		is
		<span class="text-yellow-600">
		<Egyptian t={[["V",[["G","𓊃"],["G","𓏏"],["G","𓈋"]]]]}/>
		</span>
		in Ancient Egyptian.
	</p>


	<p class="text-3xl my-4">
		我们正在现代浏览器中展示美丽的埃及文
		<Egyptian
			t={[["H",[["V",[["G","𓂋"],["G","𓏤"],["G","𓈖"]]],["H",[["G","𓆎"],["G","𓅓"],["V",[["G","𓏏"],["G","𓊖"]]]]]]]]}
		/>
	</p>

	<p class="my-2 text-xl">
		在古埃及语中，“<span class="text-yellow-600">沙漠</span>”一词是
		<span class="text-yellow-600">
		<Egyptian t={[["V",[["G","𓊃"],["G","𓏏"],["G","𓈋"]]]]}/>
		</span>
		。
	</p>

	<p class="text-3xl my-4">
		<Egyptian t={[["H",[["G","𓅭"],["G","𓆑"]]],["H",[["G","𓌸"],["G","𓇌"],["G","𓆑"]]],["H",[["V",[["G","𓊪"],["G","𓏏"]]],["G","𓎛"]]],["V",[["G","𓊵"],["H",[["G","𓏏"],["G","𓊪"]]]]]]}/>
		<br>
		<span class="font-serif">
			His beloved son, Ptahhotep.
			<br>
			他挚爱的儿子普塔霍特普。
		</span>
	</p>

</div>
