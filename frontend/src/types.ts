export type User = {
    name: string,
    userName: string,
    password: string
}

export type OpenTopic = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id?: any | null,
    creator: string,
    content: string,
    messages: number | null
}

export type Message = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id?: any | null,
    topic: OpenTopic | null,
    writer: string,
    message: string
}