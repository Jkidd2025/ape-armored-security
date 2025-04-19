
import { BlogPostData } from "@/types/blogTypes";
import { getWalletBasics } from "./basics";

export const getWalletPosts = (): Record<string, BlogPostData> => ({
  ...getWalletBasics()
});
