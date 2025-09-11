import type {I18nTemplate} from "$lib/i18n/I18nTemplate"

const ZhCn: I18nTemplate = {
	hello: "你好！",
	login: "登录",
	signup: "注册",
	login_and_signup: "登录 / 注册",
	logout: "登出",
	email: "邮箱",
	password: "密码",
	submit: "提交",
	name: "名字",
	edit: "编辑",
	delete: "删除",
	insert: "插入",
	close: "关闭",
	more: "更多",
	word_set: "单词集",
	goto: "前往",
	settings: {
		_: "设置",
		follows_your_system: "跟随系统",
		ui_language: "界面语言",
		mandarin_spelling_scheme: "普通话拼读方案",
		egyptian_transliteration_scheme: "埃及语转写方案",
		hieroglyphs_style: {
			_: "圣书字风格",
			sans_serif: "无衬线",
			colourful: "彩色",
		},
		customise_voices: {
			_: "自定义语音",
			tip: "给想要更改声音的语言打钩。",
		},
	},
	home: {
		_: "主页",
		welcome_to_words_trolley: "欢迎来到 Words Trolley",
		welcome_back: "欢迎回来",
		create_a_new_set: "创建一套新单词集",
		browse_my_sets: "浏览我的单词集",
	},
	new: {
		_: "新建",
		create_a_new_set_of_words: "创建一套新单词集……",
	},
	set: {
		learn: "学习",
		test: "测验",
		origin: "源头",
	},
	creator: {
		title: name => `${name}的单词集`,
		title_me: "我的单词集",
	},
	learn: {
		title: name => `学习《${name}》`,
		speak: "朗读",
		previous: "上一个",
		next: "下一个",
		flip: "翻面",
		progress: "学习进度",
	},
	test: {
		title: name => `测验《${name}》`,
		show_answer: "显示答案",
		next: "下一个",
		finish: "结束",
		progress: "测验进度",
	},
	editor: {
		title: {
			edit: name => `编辑《${name}》`,
			unsaved: name => `未保存《${name}》`
		},
		save: "保存",
		saving: "保存中",
		saved: "已保存",
		you_have_unsaved_changes: "您有未保存的更改，确定要离开吗？",
		fork: {
			_: "创建副本",
			success: "成功创建副本",
		},
		export: "导出",
		import: "导入…",
		delete: "删除…",
		deleting: "删除中",
		delete_confirm: {
			this_will_be_deleted: "删除这个单词集：",
			are_you_sure: "你确定吗？",
		},
		rename: "改名…",
		renaming: "改名中",
		new_name: "新名字",
		word: "单词",
		meaning: "含义",
		type: "类型",
		extra: "额外信息",
		add_a_word: "添加一个单词",
		move_up: "上移",
		move_down: "下移",
		insert_here: "在这里插入",
		card_type_select_label: i => `第 ${i} 个卡片的类型`,
		initialise: "初始化…",
		initialisation: {
			_: "初始化",
			word_count: "单词数量",
			create_blank: {
				_: n => `新建${n}个空单词`,
				tip: "此操作将删除原有的所有单词。",
			},
			word_language: "单词语言",
			set_all_languages: {
				_: "批量设置单词语言",
				tip: "此操作将删除所有单词携带的有关其语言特性的信息，但单词本身以及意思将会留下。比如法语名词的阴阳性将会被删除。",
			},
			create_and_set_languages: "先新建再设置语言"
		},
		view: {
			_: "视图",
			word_operations: "单词操作",
			extra_options: "额外选项",
		},
		hieroglyphs_editor: {
			ime_buffer: "输入缓冲区",
			move_cursor_left: "左移光标",
			move_cursor_right: "右移光标",
			backspace: "退格",
			make_ligature: "创建连字",
			ungroup: "取消组合",
			join_horizontally: "横向连接",
			join_vertically: "纵向连接",
			join_2: "连接两个字",
			join_3: "连接三个字",
			join_4: "连接四个字",
		},
		furigana_editor: {
			merge_into_above: "合并到上方",
			merge_into_below: "合并到下方",
			split: "拆分",
		},
	},
	WordType: {
		Simple: "正常",
		English: "英语",
		Mandarin: "普通话",
		Japanese: "日语",
		French: "法语",
		German: "德语",
		Egyptian: "埃及语",
	},
	linguistics: {
		noun: "名词",
		gender: "阴阳性",
		masculine: "阳性",
		feminine: "阴性",
		neutral: "中性",
		verb: "动词",
		verb_group: "动词组",
		pinyin: "拼音",
		bopomofo: "注音符号",
		transliteration: "转写",
		abbr: {
			masculine: "阳",
			feminine: "阴",
			neutral: "中",
		},
	},
	mandarin: {
		region: {
			prc: "中华人民共和国",
			roc: "中华民国",
		},
	},
	english: {
		region: {
			gb: "大不列颠",
			us: "美利坚合众国",
		}
	},
	japanese: {
		furigana: "振假名",
	},
	egyptian: {
		identity: "音形如一",
		egyptology: "埃及学",
		transliteration: "埃及语转写",
	},
	stack: {
		vertical: "上下",
		horizontal: "左右",
		split: "分开",
	},
	error: {
		code: "错误代码",
		auth: {
			_: "授权错误",
		},
	},
}

export default ZhCn
