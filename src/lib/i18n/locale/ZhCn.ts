import type {I18nTemplate} from "$lib/i18n/I18nTemplate"
import {Language} from "$lib/i18n/Language"

const ZhCn: I18nTemplate = {
	hello: "你好！",
	login: "登录",
	signup: "注册",
	login_and_signup: "登录 / 注册",
	logout: "登出",
	search: "搜索",
	email: "邮箱",
	password: "密码",
	submit: "提交",
	name: "名字",
	display_name: "对外展示名字",
	continue: "继续",
	return: "返回",
	edit: "编辑",
	delete: "删除",
	insert: "插入",
	close: "关闭",
	more: "更多",
	word_set: "单词集",
	goto: "前往",
	copy: "复制",
	copied: "已复制",
	paste: "粘贴",
	pasted: "已粘贴",
	not_specified: "未指定",
	wiktionary: "维基词典",
	learning_resources: {
		_: "学习资源",
		meta_description: "学习各种语言的资源。",
		japanese: {
			_: "日语",
			alphabet: {
				_: "假名表",
				description: "附带罗马字的平假名与片假名表。",
				inner: {
					title: "日语假名表",
					meta_description: "附带罗马字的日语平假名与片假名表。",
				}
			}
		},
		mandarin: {
			_: "现代汉语",
			spelling_converter: {
				_: "拼读转换器",
				description: "在拼音和注音之间转换。",
				inner: {
					title: "现代汉语拼读转换器",
					meta_description: "在现代汉语的拼音和注音之间转换的工具。"
				}
			}
		},
		egyptian: {
			_: "埃及语",
			alphabet: {
				_: "字母表",
				description: "附带国际音标与转写的单字符字母表。",
				inner: {
					title: "埃及语字母表",
					meta_description: "包含国际音标与转写的古埃及语单字符圣书字字母表。",
					letter: "字母"
				}
			},
			typewriter: {
				_: "打字机",
				description: "输入圣书字埃及文。",
				inner: {
					title: "埃及文打字机",
					meta_description: "输入古埃及文圣书字（象形文字）。"
				}
			},
			transliteration_converter: {
				_: "转写转换器",
				description: "在不同的转写方案之间转换。",
				inner: {
					title: "埃及语转写转换器",
					meta_description: "在不同的古埃及语转写方案之间进行转换的工具。"
				}
			}
		}
	},
	onboarding: {
		complete_your_profile: "完善您的个人资料",
	},
	my_profile: {
		_: "个人资料",
		name: "名字",
		save: {
			_: "保存",
			win: "保存成功",
		}
	},
	settings: {
		_: "设置",
		follows_your_system: "跟随系统",
		ui_language: "语言",
		learning: {
			_: "学习",
			show_meaning_in_the_front: "在正面显示单词意思",
			show_pronunciation: "显示单词发音",
		},
		editor: {
			_: "编辑器",
			autosave: "自动保存",
		},
		mandarin: {
			_: "现代汉语",
			spelling_scheme: "拼读方案",
		},
		egyptian: {
			_: "埃及语",
			transliteration_scheme: {
				_: "转写方案",
				fuzzy_sz: "音变：/z/ 归入 /s/",
				when_read: "阅读时",
				when_edit: "编辑时",
			},
			hieroglyphs_font: "圣书字字体",
		},
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
		create_a_word_set: "创建一套单词集",
		created_by_me: "我做的单词集",
		saved_by_me: "我收藏的单词集",
	},
	new: {
		_: "新建",
		create_a_new_word_set: "创建一套新单词集……",
	},
	set: {
		title: name => `单词集《${name}》`,
		learn: "学习",
		test: "测验",
		preview: "预览",
		origin: "源头",
		creator_label: name => `作者：${name}`,
		creator_profile_missing: "作者个人资料不存在",
		main_language: "主要语言",
		main_language_missing: "单词集源语言信息不存在",
		save: "收藏",
		unsave: "取消收藏",
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
		import: {
			_: "导入…",
			win: "成功导入单词。",
			bad_file_error: "单词已破损，请前往控制台查看错误详情。",
		},
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
		word_type: "单词类型",
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
			syntax_error: "语法错误",
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
		ipa: "国际音标",
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
		transliteration: {
			gardiner: "高德纳（Gardiner）",
			chen: "陈",
			mdc: "编码手册（MdC）",
		},
		typewriter: {
			title: "圣书字打字机",
			height: "高度",
			enable_custom_text_colour: "启用自定义文字颜色",
			custom_text_colour: "自定义文字颜色",
			hide_cursor: "隐藏光标",
			hide_input_border: "隐藏输入边框",
			hide_controls: "隐藏控件",
		},
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
	language: {
		[Language.ZhCn]: "汉语（内地）",
		[Language.ZhTw]: "汉语（台湾）",
		[Language.EnGb]: "英语（英国）",
		[Language.EnUs]: "英语（美国）",
		[Language.JaJp]: "日语",
		[Language.FrFr]: "法语（法国）",
		[Language.DeDe]: "德语（德国）",
		[Language.Egy]: "埃及语",
	},
	not_by_ai: {
		developer: "真人编码，非 AI 生成。",
	}
}

export default ZhCn
