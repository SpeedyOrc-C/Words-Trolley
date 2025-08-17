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
    settings: {
        _: s
        follows_your_system: s
        mandarin_script: s
        ui_language: s
    }
    home: {
        _: s
        welcome_to_words_trolley: s
        welcome_back: s
        create_a_new_set: s
        browse_my_sets: s
    }
    new: {
        create_a_new_set_of_words: s
    }
    set: {
        learn: s
        test: s
    }
    test: {
        show_answer: s
        next: s
        finish: s
    }
    editor: {
        title: {
            edit: (name: s) => s
            unsaved: (name: s) => s
        }
        save: s
        saving: s
        saved: s
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
        card_type_select_label: (i: number) => s
    }
    Card: {
        Simple: s
        Mandarin: s
        Japanese: s
        French: s
        German: s
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
}
