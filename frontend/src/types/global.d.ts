//this is special file in TypeScript (global.d.ts)
//types added in this file can be used globally throughout the project without importing them specifically

type ConversationType = {
  id: string;
  fullName: string;
  profilePic: string;
};

type MessageType = {
  id: string;
  body: string;
  senderId: string;
  createdAt: string;
};
