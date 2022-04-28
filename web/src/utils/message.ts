import React from "react";

interface MessageContextProps{
    message:(msg:string)=>void
}

export const MessageContext = React.createContext<MessageContextProps>(null!);
