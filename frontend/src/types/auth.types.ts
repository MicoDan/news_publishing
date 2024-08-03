/**
 * Interface for user input during authentication
 */
export interface Input {
  username: string;
  password: string;
}

/**
 * Interface for authenticated user properties
 */
export interface AuthUserProps {
  id: number;
  username: string;
  email: string;
}

/**
 * Interface for the context properties used in authentication
 */
export interface AuthContextProps {
  user: AuthUserProps | null;
  login: (inputs: Input) => Promise<void>;
  logout: () => Promise<void>;
  scrollToTop: () => void;
}

/**
 * Interface for the props of the AuthContextProvider component
 */
export interface AuthContextProviderProps {
  children: React.ReactNode;
}

/**
 * Interface for a single post's properties
 */
export interface PostProps {
  id: number;
  post_id: string;
  title: string;
  content: string;
  img: string;
  posts_img: string;
  date: string;
  category: string;
  uid: number;
  username: string;
  users_img: string;
}

/**
 * Interface for an array of posts
 */
export interface PostsArrayProps {
  posts: PostProps[];
}
