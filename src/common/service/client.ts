import axios from 'axios';

const client = axios.create({
  baseURL: process.env.VITE_SERVER_URI,
});

export default client;

export const api = {
  unfollowFriend: (memberId: string, followingId: string) => {
    return client.delete(`/members/${memberId}/following/${followingId}`);
  },
  followFriend: (memberId: string, followingId: string) => {
    return client.post(`/members/${memberId}/following/${followingId}`);
  },
};
