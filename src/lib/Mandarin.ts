export enum Initial
{
    B, P, M, F,
    D, T, N, L,
    G, K, H,
    J, Q, X,
    Zh, Ch, Sh, R,
    Z, C, S,
    Y, W,
}

export enum Final
{
    A, O, E, E2, I, U, Yu,
    Ai, Ao, An, Ang,
    Ou, Ong,
    Ei, En, Eng,
    Ia, Iu, Ie, In, Ing,
    Ua, Ui, Un,
    Yue, Yun,
}

export type Tone = 1 | 2 | 3 | 4

export type Syllable = { Initial: Initial | null, Final: Final, Tone: Tone | null }


