export type User = {
    name: string,
    userName: string,
    password: string
}

export type Message = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id?: any | null,
    topic: OpenTopic | null,
    writer: string,
    message: string,
    timeCreated: Date
}

export type MessageWithTopicId = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id?: any | null,
    topic: number,
    writer: string,
    message: string,
    timeCreated: Date
}

export type OpenTopic = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id?: any | null,
    creator: string,
    content: string,
    messages: Message[],
    timeCreated: Date
}

export type TopicWithTimeToCompare = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id?: any | null,
    creator: string,
    content: string,
    messages: Message[],
    time: Date | null,
    timeToCompare: Date
}