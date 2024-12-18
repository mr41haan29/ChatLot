import { Request, Response } from "express";
import prisma from "../db/prisma.js";

export const sendMessage = async (
  req: Request,
  res: Response
): Promise<any> => {
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

    return res.status(201).json(newMessage);
  } catch (error: any) {
    console.log("error in sendMessage controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessages = async (
  req: Request,
  res: Response
): Promise<any> => {
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
  } catch (error: any) {
    console.log("error in getMessages controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUsersForSidebar = async (
  req: Request,
  res: Response
): Promise<any> => {
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
  } catch (error: any) {
    console.log("error in getUsersForSidebar controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
