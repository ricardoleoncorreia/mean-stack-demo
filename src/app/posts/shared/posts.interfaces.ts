interface Post {
    id: string;
    title: string;
    content: string;
}

interface MongoPost {
  _id: string;
  title: string;
  content: string;
}

interface ServerData<bodyType = void> {
    message: string;
    body?: bodyType
}

export { Post, ServerData, MongoPost };
