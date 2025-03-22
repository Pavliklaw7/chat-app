'use client'

import React from "react"

export default function ChatForm({onSendMessage}: {onSendMessage: (message: string) => void}) {
    const [message, setMessage] = React.useState('')

    const submitHandler = (e: React.FormEvent) => {
        e.preventDefault()

        if (message.trim() !== '') {
            onSendMessage(message)
            setMessage('')
        }
    }

    return (
        <form className="flex gap-2" onSubmit={submitHandler}>
            <input className="grow px-4 py-2 border-2 rounded-lg" type="text" placeholder="Type your text" value={message} onChange={e => setMessage(e.target.value)}/>
            <button className="px-4 py-2 border-2 rounded-lg">Submit</button>
        </form>
    )
}
