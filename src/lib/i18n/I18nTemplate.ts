import {Language} from "$lib/i18n/Language"

type s = string

export type I18nTemplate = {
	hello: s
	login: s
	signup: s
	login_and_signup: s
	logout: s
	search: s
	help: s
	email: s
	password: s
	submit: s
	name: s
	display_name: s
	continue: s
	return: s
	edit: s
	delete: s
	insert: s
	close: s
	more: s
	word_set: s
	goto: s
	copy: s
	copied: s
	paste: s
	pasted: s
	not_specified: s
	wiktionary: s
	learning_resources: {
		_: s
		meta_description: s
		japanese: {
			_: s
			alphabet: {
				_: s
				description: s
				inner: {
					title: s
					meta_description: s
				}
			}
		}
		mandarin: {
			_: s
			alphabet: {
				_: s
				description: s
				inner: {
					title: s
					meta_description: s
					initial: s
					final: s
					atomic: s
					use_single_layer_ag: s
				}
			}
			spelling_converter: {
				_: s
				description: s
				inner: {
					title: s
					meta_description: s
				}
			}
		}
		egyptian: {
			_: s
			alphabet: {
				_: s
				description: s
				inner: {
					title: s
					meta_description: s
					letter: s
				}
			}
			typewriter: {
				_: s
				description: s
				inner: {
					title: s
					meta_description: s
				}
			}
			transliteration_converter: {
				_: s
				description: s
				inner: {
					title: s
					meta_description: s
				}
			}
		}
		tibetan: {
			_: s
			alphabet: {
				_: s
				description: s
				inner: {
					title: s
					meta_description: s
				}
			}
		}
	}
	onboarding: {
		complete_your_profile: s
	}
	my_profile: {
		_: s
		name: s
		save: {
			_: s
			win: s
		}
	}
	settings: {
		_: s
		follows_your_system: s
		learning: {
			_: s
			show_meaning_in_the_front: s
			show_pronunciation: s
		}
		editor: {
			_: s
			autosave: s
		}
		mandarin: {
			_: s
			spelling_scheme: s
		}
		ui_language: s
		egyptian: {
			_: s
			transliteration_scheme: {
				_: s
				fuzzy_sz: s
				when_read: s
				when_edit: s
			}
			hieroglyphs_font: s
		}
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
		create_a_word_set: s
		created_by_me: s
		saved_by_me: s
	}
	new: {
		_: s
		create_a_new_word_set: s
	}
	set: {
		title: (name: s) => s
		learn: s
		test: s
		preview: s
		origin: s
		creator_label: (name: s) => s
		creator_profile_missing: s
		main_language: s
		main_language_missing: s
		save: s
		unsave: s
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
		import: {
			_: s
			win: s
			bad_file_error: s
		}
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
		word_type: s
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
			move_cursor_left: s
			move_cursor_right: s
			backspace: s
			make_ligature: s
			ungroup: s
			join_horizontally: s
			join_vertically: s
			syntax_error: s
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
		ipa: s
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
		consonant: s
		vowel: s
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
		transliteration: {
			gardiner: s
			chen: s
			chen_no_cap: s
			mdc: s
		}
		typewriter: {
			title: s
			height: s
			enable_custom_text_colour: s
			custom_text_colour: s
			hide_cursor: s
			hide_input_border: s
			hide_controls: s
			number_shortcut: s
			number: s
			glyph: s
		}
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
	language: {
		[k in Language]: s
	}
	not_by_ai: {
		developer: s
	}
}
