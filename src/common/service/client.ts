import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VITE_SERVER_URI,
});

export default client;

export const api = {
  deleteUnfollowFriend: (memberId: string, followingId: string) => {
    return client.delete(`/members/${memberId}/following/${followingId}`);
  },
  postFollowFriend: (memberId: string, followingId: string) => {
    return client.post(`/members/${memberId}/following/${followingId}`);
  },
  getFollowings: (memberId: string, cursorId?: string, pageSize?: number) => {
    return client.get(`/members/${memberId}/followings`);
  },
  getFollowers: (memberId: string, cursorId?: string, pageSize?: number) => {
    return client.get(`/members/${memberId}/followers`);
  },
};
