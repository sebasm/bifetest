export class Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export class User {
  id: number;
  name: string;
  username: string;
  email: string;
}

export class Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
