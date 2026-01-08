import {c, JoinHorizontally, JoinVertically, Overlap, Split, Structure, type Hieroglyphs} from "../hieroglyphs"

export const QuickSymbols: Record<string, string> =
{
   "1": "𓏤", "2": "𓏭", "3": "𓏥", "4": "𓏲",
   "5": "𓂜",
   "6": "𓏛", "7": "𓏜",
   "8": "𓀭", "9": "𓁐", "0": "𓀀",
}

export type State = {
   cursor: number
   value: Hieroglyphs[]
}

export enum CommandKind
{
   Column,
   Row,
   Ligature,
   Cartouche,
   DuplicateLast,
   Jump,
   Left,
   Right,
   Backspace,
   Insert,
   Replace,
}

export type Command
   = [CommandKind.Column]
   | [CommandKind.Row]
   | [CommandKind.Ligature]
   | [CommandKind.Cartouche]
   | [CommandKind.DuplicateLast]
   | [CommandKind.Jump, number]
   | [CommandKind.Left]
   | [CommandKind.Right]
   | [CommandKind.Backspace]
   | [CommandKind.Insert, Hieroglyphs]
   | [CommandKind.Replace, Hieroglyphs[]]

export function HieroglyphsEditCommandNoSideEffect(command: Command): boolean
{
   const [type] = command
   return type == CommandKind.Jump
      || type == CommandKind.Left
      || type == CommandKind.Right
}

export function CanMakeColumnOrRow(state: State): boolean
{
   return state.cursor >= 2
}

export function CanMakeLigature(state: State): boolean
{
   const v1 = state.value[state.cursor - 1]
   const v2 = state.value[state.cursor - 2]
   return state.cursor >= 2
      && (v1[0] == Structure.Glyph || v1[0] == Structure.Ligature)
      && (v2[0] == Structure.Glyph || v2[0] == Structure.Ligature)
}

export function CanMakeCartouche(state: State): boolean
{
   return state.cursor >= 1
}

export function CanBackspace(state: State): boolean
{
   return state.cursor >= 1
}

export function CanMoveLeft(state: State): boolean
{
   return state.cursor >= 1
}

export function CanMoveRight(state: State): boolean
{
   return state.cursor < state.value.length
}

export function Execute
   (
      state: State,
      command: Command,
   ): State
{
   const {cursor, value: content} = state
   const {length} = content
   const [kind, arg] = command

   switch (kind)
   {
   case CommandKind.Column:
      {
         if (!CanMakeColumnOrRow(state))
            throw "Not enough characters."

         const left = content.slice(0, cursor - 2)
         const middle = content.slice(cursor - 2, cursor)
         const right = content.slice(cursor)

         return {
            cursor: cursor - 1,
            value: [...left, JoinVertically(middle[0], middle[1]), ...right]
         }
      }
   case CommandKind.Row:
      {
         if (!CanMakeColumnOrRow(state))
            throw "Not enough characters."

         const left = content.slice(0, cursor - 2)
         const middle = content.slice(cursor - 2, cursor)
         const right = content.slice(cursor)

         return {
            cursor: cursor - 1,
            value: [...left, JoinHorizontally(middle[0], middle[1]), ...right]
         }
      }
   case CommandKind.Ligature:
      {
         if (!CanMakeLigature(state))
            throw "Not enough characters or invalid characters."

         const left = content.slice(0, cursor - 2)
         const middle = content.slice(cursor - 2, cursor)
         const right = content.slice(cursor)

         return {
            cursor: cursor - 1,
            value: [...left, Overlap(middle[0], middle[1]), ...right]
         }
      }
   case CommandKind.Cartouche:
      {
         if (!CanMakeCartouche(state))
            throw "No character to put in cartouche."

         const hie = content[cursor - 1]
         const left = content.slice(0, cursor - 1)
         const right = content.slice(cursor)

         return {
            cursor: cursor,
            value: [...left, c(hie), ...right]
         }
      }
   case CommandKind.DuplicateLast:
      {
         if (cursor == 0)
            throw "No character to duplicate."

         const hie = content[cursor - 1]
         const left = content.slice(0, cursor)
         const right = content.slice(cursor)

         return {
            cursor: cursor + 1,
            value: [...left, hie, ...right]
         }
      }
   case CommandKind.Jump:
      {
         if (arg < 0 || arg > content.length)
            throw "Out of range."

         return {
            cursor: arg,
            value: content,
         }
      }
   case CommandKind.Left:
      {
         if (!CanMoveLeft(state))
            throw "Already at the beginning."

         return {
            cursor: cursor - 1,
            value: content,
         }
      }
   case CommandKind.Right:
      {
         if (!CanMoveRight(state))
            throw "Already at the end."

         return {
            cursor: cursor + 1,
            value: content,
         }
      }
   case CommandKind.Backspace:
      {
         if (!CanBackspace(state))
            throw "Nothing to delete."

         const left = content.slice(0, cursor - 1)
         const right = content.slice(cursor)

         if (content[cursor - 1][0] == Structure.Glyph)
         {
            return {
               cursor: cursor - 1,
               value: [...left, ...right]
            }
         }
         else
         {
            const split = Split(content[cursor - 1])

            return {
               cursor: cursor + split.length - 1,
               value: [...left, ...split, ...right]
            }
         }
      }
   case CommandKind.Insert:
      {
         const left = content.slice(0, cursor)
         const right = content.slice(cursor)

         return {
            cursor: cursor + 1,
            value: [...left, arg, ...right]
         }
      }
   case CommandKind.Replace:
      {
         return {
            cursor: arg.length,
            value: arg,
         }
      }
   }
}
