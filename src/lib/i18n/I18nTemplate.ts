type s = string

export type I18nTemplate = {
	hello: s
	login: s
	signup: s
	login_and_signup: s
	logout: s
	email: s
	password: s
	submit: s
	name: s
	edit: s
	delete: s
	insert: s
	close: s
	more: s
	word_set: s
	goto: s
	settings: {
		_: s
		follows_your_system: s
		mandarin_spelling_scheme: s
		ui_language: s
		egyptian_transliteration_scheme: s
		hieroglyphs_style: {
			_: s
			sans_serif: s
			colourful: s
		}
		customise_voices: {
			_: s
			tip: s
		}
	}
	home: {
		_: s
		welcome_to_words_trolley: s
		welcome_back: s
		create_a_new_set: s
		browse_my_sets: s
	}
	new: {
		_: s
		create_a_new_set_of_words: s
	}
	set: {
		learn: s
		test: s
		origin: s
	}
	creator: {
		title: (name: s) => s
		title_me: s
	}
	learn: {
		title: (name: s) => s
		speak: s
		next: s
		previous: s
		flip: s
		progress: s
	}
	test: {
		title: (name: s) => s
		show_answer: s
		next: s
		finish: s
		progress: s
	}
	editor: {
		title: {
			edit: (name: s) => s
			unsaved: (name: s) => s
		}
		save: s
		saving: s
		saved: s
		you_have_unsaved_changes: s
		fork: {
			_: s
			success: s
		}
		export: s
		import: s
		delete: s
		deleting: s
		delete_confirm: {
			this_will_be_deleted: s
			are_you_sure: s
		}
		rename: s
		renaming: s
		new_name: s
		word: s
		meaning: s
		type: s
		extra: s
		add_a_word: s
		move_up: s
		move_down: s
		insert_here: s
		card_type_select_label: (i: number) => s
		initialise: s
		initialisation: {
			_: s
			word_count: s
			create_blank: {
				_: (n: number) => s
				tip: s
			}
			word_language: s
			set_all_languages: {
				_: s
				tip: s
			}
			create_and_set_languages: s
		}
		view: {
			_: s
			word_operations: s
			extra_options: s
		}
		hieroglyphs_editor: {
			ime_buffer: s
			move_cursor_left: s
			move_cursor_right: s
			backspace: s
			make_ligature: s
			ungroup: s
			join_horizontally: s
			join_vertically: s
			join_2: s
			join_3: s
			join_4: s
		}
		furigana_editor: {
			merge_into_above: s
			merge_into_below: s
			split: s
		}
	}
	WordType: {
		Simple: s
		English: s
		Mandarin: s
		Japanese: s
		French: s
		German: s
		Egyptian: s
	}
	linguistics: {
		noun: s
		gender: s
		masculine: s
		feminine: s
		neutral: s
		verb: s
		verb_group: s
		pinyin: s
		bopomofo: s
		transliteration: s
		abbr: {
			masculine: s
			feminine: s
			neutral: s
		}
	}
	mandarin: {
		region: {
			prc: s
			roc: s
		}
	}
	english: {
		region: {
			gb: s
			us: s
		}
	}
	japanese: {
		furigana: s
	}
	egyptian: {
		identity: s
		egyptology: s
		transliteration: s
	}
	stack: {
		vertical: s
		horizontal: s
		split: s
	}
	error: {
		code: s
		auth: {
			_: s
		}
	}
}
