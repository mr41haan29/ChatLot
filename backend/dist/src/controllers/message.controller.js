import prisma from "../db/prisma.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        //does a conversation exist between receiver and sender?
        let conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId],
                },
            },
        });
        //if not, then the first message will be sent, so a new conversation is needed between sender and receiver
        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    participantIds: {
                        set: [senderId, receiverId],
                    },
                },
            });
        }
        //create the message to send
        const newMessage = await prisma.message.create({
            data: {
                senderId,
                body: message,
                conversationId: conversation.id,
            },
        });
        //add that message to the conversation
        if (newMessage) {
            conversation = await prisma.conversation.update({
                where: {
                    id: conversation.id,
                },
                data: {
                    messages: {
                        connect: {
                            id: newMessage.id,
                        },
                    },
                },
            });
        }
        //socket.io for real-time communication
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage);
        }
        return res.status(201).json(newMessage);
    }
    catch (error) {
        console.log("error in sendMessage controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getMessages = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const senderId = req.user.id;
        const conversation = await prisma.conversation.findFirst({
            where: {
                participantIds: {
                    hasEvery: [senderId, receiverId],
                },
            },
            include: {
                messages: {
                    orderBy: {
                        createdAt: "asc",
                    },
                },
            },
        });
        if (!conversation) {
            return res.status(200).json([]);
        }
        return res.status(201).json(conversation.messages);
    }
    catch (error) {
        console.log("error in getMessages controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getUsersForSidebar = async (req, res) => {
    try {
        const authUserId = req.user.id;
        const users = await prisma.user.findMany({
            where: {
                id: {
                    not: authUserId,
                },
            },
            select: {
                id: true,
                fullName: true,
                profilePic: true,
            },
        });
        return res.status(200).json(users);
    }
    catch (error) {
        console.log("error in getUsersForSidebar controller", error.message);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};
