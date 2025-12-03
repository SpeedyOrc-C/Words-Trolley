import type {I18nTemplate} from "$lib/i18n/I18nTemplate"
import {Language} from "$lib/i18n/Language"

export const JaJp: I18nTemplate = {
	hello: "こんにちは！",
	login: "ログイン",
	signup: "新規登録",
	login_and_signup: "ログイン / 新規登録",
	logout: "ログアウト",
	search: "検索",
	help: "ヘルプ",
	email: "メールアドレス",
	password: "パスワード",
	submit: "送信",
	name: "名前",
	display_name: "公開表示名",
	continue: "続ける",
	return: "戻る",
	edit: "編集",
	delete: "削除",
	insert: "挿入",
	close: "閉じる",
	more: "もっと見る",
	word_set: "単語セット",
	goto: "移動",
	copy: "コピー",
	copied: "コピーしました",
	paste: "貼り付け",
	pasted: "貼り付けました",
	print: "プリント",
	not_specified: "未指定",
	wiktionary: "Wiktionary",
	learning_resources: {
		_: "学習リソース",
		meta_description: "様々な言語を学ぶためのリソース。",
		japanese: {
			_: "日本語",
			alphabet: {
				_: "かな表",
				description: "ローマ字付きのひらがな・カタカナ表。",
				inner: {
					title: "日本語かな表",
					meta_description: "ローマ字付きの日本語ひらがな・カタカナ表。",
				}
			}
		},
      mandarin: {
         _: "現代中国語",
			alphabet: {
				_: "アルファベット",
				description: "拼音の声母・韻母・声調・整体読み音節の表。",
				inner: {
					title: "現代中国語アルファベット",
					meta_description: "現代中国語の拼音の声母・韻母・声調・整体読み音節の表。",
					initial: "声母",
					final: "韻母",
					atomic: "整体読み音節",
					use_single_layer_ag: "一層構造の a・g フォントを使う",
				}
			},
         spelling_converter: {
            _: "翻字変換",
            description: "拼音と注音の間で変換します。",
            inner: {
               title: "現代中国語翻字変換",
               meta_description: "現代中国語の拼音と注音の間で変換するツール。"
            }
         }
      },
		egyptian: {
			_: "エジプト語",
			alphabet: {
				_: "アルファベット",
				description: "IPA と翻字付きの単一文字アルファベット。",
				inner: {
					title: "エジプト語アルファベット",
					meta_description: "IPA と翻字を含む、古代エジプト語の単一文字ヒエログリフのアルファベット。",
					letter: "文字"
				}
			},
			typewriter: {
				_: "タイプライター",
				description: "ヒエログリフのエジプト語を入力します。",
				inner: {
					title: "エジプト語タイプライター",
					meta_description: "古代エジプト語ヒエログリフ（象形文字）を入力します。"
				}
			},
			transliteration_converter: {
				_: "翻字変換",
				description: "様々な翻字方式の間で変換します。",
				inner: {
					title: "エジプト語翻字変換",
					meta_description: "古代エジプト語の様々な翻字方式の間で変換するツール。"
				}
			},
			other_input_methods: {
				_: "その他の入力方法"
			},
		},
		tibetan: {
			_: "チベット語",
			alphabet: {
				_: "アルファベット",
				description: "ウィリー翻字付きのチベット文字表。",
				inner: {
					title: "チベット語アルファベット",
					meta_description: "ウィリー翻字付きのチベット文字表。",
				}
			}
		},
	},
	onboarding: {
		complete_your_profile: "プロフィールを完成させましょう",
	},
	my_profile: {
		_: "プロフィール",
		name: "名前",
		save: {
			_: "保存",
			win: "保存しました",
		}
	},
	settings: {
		_: "設定",
		follows_your_system: "システム設定に従う",
		ui_language: "言語",
		learning: {
			_: "学習",
			show_meaning_in_the_front: "正面に単語の意味を表示",
			show_pronunciation: "単語の発音を表示",
		},
		editor: {
			_: "エディター",
			autosave: "自動保存",
		},
		mandarin: {
			_: "現代中国語",
			spelling_scheme: "翻字方式",
		},
		egyptian: {
			_: "エジプト語",
			transliteration_scheme: {
				_: "翻字方式",
				fuzzy_sz: "音変化：/z/ を /s/ に",
				when_read: "閲覧時",
				when_edit: "編集時",
			},
			hieroglyphs_font: "ヒエログリフのフォント",
		},
		hieroglyphs_style: {
			_: "ヒエログリフのスタイル",
			sans_serif: "サンセリフ",
			colourful: "色鮮やか",
		},
		customise_voices: {
			_: "音声のカスタマイズ",
			tip: "声を変更したい言語にチェックを入れてください。",
		},
	},
	home: {
		_: "ホーム",
		welcome_to_words_trolley: "Words Trolley へようこそ",
		welcome_back: "お帰りなさい",
		create_a_word_set: "単語セットを作成",
		created_by_me: "自分が作成した単語セット",
		saved_by_me: "自分が保存した単語セット",
	},
	new: {
		_: "新規",
		create_a_new_word_set: "新しい単語セットを作成…",
	},
	set: {
		title: name => `単語セット「${name}」`,
		learn: "学習",
		test: "テスト",
		preview: "プレビュー",
		origin: "出典",
		creator_label: name => `作成者：${name}`,
		creator_profile_missing: "作成者のプロフィールが存在しません",
		main_language: "主要言語",
		main_language_missing: "単語セットの元の言語情報が存在しません",
		save: "保存",
		unsave: "保存を解除",
	},
	creator: {
		title: name => `${name} の単語セット`,
		title_me: "自分の単語セット",
	},
	learn: {
		title: name => `「${name}」を学習`,
		speak: "読み上げ",
		previous: "前へ",
		next: "次へ",
		flip: "裏返す",
		progress: "学習の進捗",
	},
	test: {
		title: name => `「${name}」をテスト`,
		show_answer: "答えを表示",
		next: "次へ",
		finish: "終了",
		progress: "テストの進捗",
	},
	editor: {
		title: {
			edit: name => `「${name}」を編集`,
			unsaved: name => `「${name}」（未保存）`,
		},
		save: "保存",
		saving: "保存中",
		saved: "保存しました",
		you_have_unsaved_changes: "未保存の変更があります。本当に離れますか？",
		fork: {
			_: "複製を作成",
			success: "複製を作成しました",
		},
		export: "エクスポート",
		import: {
			_: "インポート…",
			win: "単語のインポートに成功しました。",
			bad_file_error: "単語データが壊れています。詳細はコンソールを確認してください。",
		},
		delete: "削除…",
		deleting: "削除中",
		delete_confirm: {
			this_will_be_deleted: "次の単語セットを削除します：",
			are_you_sure: "本当に実行しますか？",
		},
		rename: "名前を変更…",
		renaming: "名前を変更中",
		new_name: "新しい名前",
		word: "単語",
		meaning: "意味",
		word_type: "単語の種類",
		extra: "追加情報",
		add_a_word: "単語を追加",
		move_up: "上に移動",
		move_down: "下に移動",
		insert_here: "ここに挿入",
		card_type_select_label: i => `カード ${i} 枚目の種類`,
		initialise: "初期化…",
		initialisation: {
			_: "初期化",
			word_count: "単語数",
			create_blank: {
				_: n => `${n} 個の空の単語を作成`,
				tip: "この操作は既存のすべての単語を削除します。",
			},
			word_language: "単語の言語",
			set_all_languages: {
				_: "単語の言語を一括設定",
				tip: "この操作は、すべての単語に紐づく言語特性に関する情報を削除します。単語本体と意味は残ります（例：フランス語名詞の性情報などは削除されます）。",
			},
			create_and_set_languages: "先に新規作成してから言語を設定",
		},
		view: {
			_: "ビュー",
			word_operations: "単語操作",
			extra_options: "追加オプション",
		},
		hieroglyphs_editor: {
			move_cursor_left: "カーソルを左へ",
			move_cursor_right: "カーソルを右へ",
			backspace: "バックスペース",
			make_ligature: "合字を作成",
			ungroup: "グループ解除",
			add_cartouche: "カルトゥーシュを付ける",
			join_horizontally: "横に結合",
			join_vertically: "縦に結合",
			syntax_error: "構文エラー",
		},
		furigana_editor: {
			merge_into_above: "上に統合",
			merge_into_below: "下に統合",
			split: "分割",
		},
	},
	WordType: {
		Simple: "通常",
		English: "英語",
		Mandarin: "中国語（標準語）",
		Japanese: "日本語",
		French: "フランス語",
		German: "ドイツ語",
		Egyptian: "エジプト語",
	},
	linguistics: {
		ipa: "IPA",
		noun: "名詞",
		gender: "文法性",
		masculine: "男性形",
		feminine: "女性形",
		neutral: "中性",
		verb: "動詞",
		verb_group: "動詞グループ",
		pinyin: "拼音",
		bopomofo: "注音符号",
		transliteration: "翻字",
		consonant: "子音",
		vowel: "母音",
		abbr: {
			masculine: "男",
			feminine: "女",
			neutral: "中",
		},
	},
	mandarin: {
		region: {
			prc: "中華人民共和国",
			roc: "中華民国",
		},
	},
	english: {
		region: {
			gb: "グレートブリテン",
			us: "アメリカ合衆国",
		}
	},
	japanese: {
		furigana: "振り仮名",
	},
	egyptian: {
		identity: "音と形が一致",
		egyptology: "エジプト学",
		transliteration: {
			gardiner: "ガーディナー式",
			chen: "陳式",
			chen_no_cap: "小陳式",
			mdc: "Manuel de Codage 式",
		},
		typewriter: {
			title: "ヒエログリフタイプライター",
			height: "高さ",
			enable_custom_text_colour: "文字色をカスタマイズする",
			custom_text_colour: "カスタム文字色",
			hide_cursor: "カーソルを非表示",
			hide_input_border: "入力枠を非表示",
			hide_controls: "コントロールを非表示",
			number_shortcut: "数字ショートカット",
			number: "数字",
			glyph: "文字",
		},
		rte: {
			title: "エジプト語リッチテキストエディター",
			enable_ime: "IME を有効に",
		}
	},
	stack: {
		vertical: "上下",
		horizontal: "左右",
		split: "分割",
	},
	error: {
		code: "エラーコード",
		auth: {
			_: "認証エラー",
		},
	},
	language: {
		[Language.ZhCn]: "中国語（中国大陸）",
		[Language.ZhTw]: "中国語（台湾）",
		[Language.EnGb]: "英語（イギリス）",
		[Language.EnUs]: "英語（アメリカ）",
		[Language.JaJp]: "日本語",
		[Language.FrFr]: "フランス語（フランス）",
		[Language.DeDe]: "ドイツ語（ドイツ）",
		[Language.Egy]: "エジプト語",
	},
	not_by_ai: {
		developer: "人間がコーディングしました。AI 生成ではありません。",
	}
}

export default JaJp
