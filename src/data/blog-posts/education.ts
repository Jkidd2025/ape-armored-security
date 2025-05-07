
import { BlogPostData } from "@/types/blogTypes";
import { getSmartContractsPosts } from "./education/smart-contracts";
import { getBlockchainPosts } from "./education/blockchain";
import { getSecurityPosts } from "./education/security";
import { getWalletPosts } from "./education/wallets";
import { getInsurancePosts } from "./education/insurance";

export const getEducationPosts = (): Record<string, BlogPostData> => ({
  ...getSmartContractsPosts(),
  ...getBlockchainPosts(),
  ...getSecurityPosts(),
  ...getWalletPosts(),
  ...getInsurancePosts()
});
