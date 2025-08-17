export default interface EditorNavProps
{
    settingsOpened: boolean
    online: boolean
    saving: boolean
    saved: boolean
    deleting: boolean
    Save: () => any
    Import: () => any
    Export: () => any
    Delete: () => any
}
