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
    home: {
        _: "主页",
        welcome_to_words_trolley: "欢迎来到 Words Trolley",
        welcome_back: "欢迎回来",
        create_a_new_set: "创建一套新单词集",
        browse_my_sets: "浏览我的单词集",
    },
    new: {
        create_a_new_set_of_words: "创建一套新单词集……",
    },
    set: {
        learn: "学习",
        test: "测验"
    },
    test: {
        show_answer: "显示答案",
        next: "下一个",
        finish: "结束"
    },
    editor: {
        title: {
            edit: name => `编辑《${name}》`,
            unsaved: name => `未保存《${name}》`
        },
        save: "保存",
        saving: "保存中",
        saved: "已保存",
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
        card_type_select_label: i => `第 ${i} 个卡片的类型`
    },
    CardType: {
        Simple: "正常",
        Mandarin: "普通话",
        Japanese: "日语",
        JapaneseVerb: "日语动词",
        FrenchNoun: "法语名词",
        GermanNoun: "德语名词",
    },
    linguistics: {
        gender: "阴阳性",
        masculine: "阳性",
        feminine: "阴性",
        neutral: "中性",
        verb_group: "动词组",
        pinyin: "拼音",
        abbr: {
            masculine: "阳",
            feminine: "阴",
            neutral: "中",
        },
    }
}

export default ZhCn
