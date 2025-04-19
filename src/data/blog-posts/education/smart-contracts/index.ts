
import { BlogPostData } from "@/types/blogTypes";
import { getSmartContractsBasics } from "./basics";
import { getSmartContractsReading } from "./reading";
import { getBlockExplorersPosts } from "./block-explorers";

export const getSmartContractsPosts = (): Record<string, BlogPostData> => ({
  ...getSmartContractsBasics(),
  ...getSmartContractsReading(),
  ...getBlockExplorersPosts()
});
