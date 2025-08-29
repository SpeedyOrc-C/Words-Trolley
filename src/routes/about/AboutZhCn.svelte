<script lang="ts">
	import {Button} from "$lib/components/ui/button"
	import {Github, Home} from "@lucide/svelte"
</script>

<div class="flex gap-4">
	<Button href="/" size="lg" variant="outline">
		<Home/>
		返回首页
	</Button>

	<Button href="https://github.com/SpeedyOrc-C/Words-Trolley" size="lg">
		<Github/>
		GitHub 仓库
	</Button>
</div>

<h1>关于本软件</h1>

<h2>为什么要做这个？</h2>

<p>鄙人苦于 <a href="https://quizlet.com">Quizlet</a> 在很多方面没法满足自己的需求，比如在学习汉语词的时候不能标注拼音、学习法语的时候没法给名词标注阴阳性、以及测验模式只会拿你输入的文字和答案做一个简单的比对。可以从中看出，Quizlet 什么都有，就是没有关于语言本身的任何东西。正所谓，<strong>制作语言学习软件的人一定要懂语言</strong>，<a href="https://duolingo.com">多邻国</a>在这一方面做的很好。但多邻国除了单词之外，还有句子和朗读功能，和 Quizlet 相比又有些太多了。所以最终就做成了一个介于两者之间的软件。
</p>

<h2>有没有其他人做过这个？</h2>

<p>有，但也没有。另一个比较常用的单词软件是 <a href="https://apps.ankiweb.net">Anki</a>，功能比 Quizlet 还要简陋，界面也不太好看，优点大概只剩下开源了。
</p>

<h2>傲慢与偏见</h2>

<p>英语作为一门事实上的国际语言，有着大量的母语者以及第二语言学习者。这意味着，如果有一个人生于美国以及英国这些母语为英语的国家，他们可能不需要学习其他的语言就能和外国人打交道。当然，这样说也不绝对，美国作为一个散装的多民族国家，还有英国大量的外来移民都让不只会说英语的人数大大增加。
</p>

<p>我想说的问题不在这里，而是人们潜意识中的东西。学习语言还有让软件适配各种语言这种事，天生就是麻烦的。大家一定会先让自己的软件先适配自己的母语，然后再考虑引入多语言框架这种事。这东西跟是不是大公司还真没什么关系，比如 Windows 至今仍对世界上使用人数最多的语言（猜猜是什么语言），有着近乎伪人般的支持：在一个英语词有好几个意思时，他们几乎总是采取了错误的译项。就算大家正确翻译了所有的文本，有些语言的文字甚至是从右向左书写的，比如阿拉伯文，而阿拉伯文同样有大量母语者
</p>

<h1>鸣谢</h1>

<h2>非人</h2>

<ul>
	<li>
		服务器
		<Button href="https://vercel.com" variant="link">
			Vercel
		</Button>
	</li>
	<li>
		数据库
		<Button href="https://supabase.com" variant="link">
			Supabase
		</Button>
	</li>
	<li>
		框架
		<Button href="https://svelte.dev" variant="link">
			Svelte
		</Button>
	</li>
	<li>
		图标
		<Button href="https://lucide.dev" variant="link">
			Lucide Icons © 2013-2023 Cole Bemis
		</Button>
	</li>
</ul>

<h2>真人</h2>

<h3>测试</h3>

<ul>
	<li>
		<Button href="https://github.com/KenFeng04" variant="link">
			KenFeng04
		</Button>
	</li>
	<li>
		<Button href="https://space.bilibili.com/1386811212" variant="link">
			革凡普王i
		</Button>
	</li>
	<li>
		<Button href="https://vrchat.com/home/user/usr_3ccd487d-d6b9-476b-bb8b-373d0c05730e" variant="link">
			shiuneD116762
		</Button>
	</li>
</ul>

<h3>编码</h3>

<ul>
	<li>
		<Button href="https://github.com/SpeedyOrc-C" variant="link">
			SpeedyOrc-C（我）
		</Button>
	</li>
</ul>
