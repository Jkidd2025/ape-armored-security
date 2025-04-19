import { BlogPostData } from "@/types/blogTypes";

export const getBlockchainPosts = (): Record<string, BlogPostData> => ({
  "blockchain-basics": {
    title: "Blockchain Basics: Understanding the Technology",
    publishDate: "April 8, 2025",
    author: "ApeArmor Research Team",
    readTime: "10 min",
    category: "Education",
    imageUrl: "/lovable-uploads/c129d5f2-d603-4e13-9ffe-3971adc1dedd.png",
    content: `
        <p class="mb-4">Blockchain technology is a decentralized digital ledger that records transactions across multiple computers in a secure and transparent manner. It is the underlying technology behind cryptocurrencies like Bitcoin and Ethereum.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Key Components of a Blockchain</h2>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Blocks: Each block contains a set of transactions and a reference to the previous block in the chain.</li>
          <li>Nodes: Computers that participate in the blockchain network and validate transactions.</li>
          <li>Consensus Mechanism: A process by which nodes agree on the validity of transactions and update the blockchain.</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">How Blockchain Works</h2>
        <p class="mb-4">When a transaction is made on a blockchain, it is broadcast to the network and verified by nodes. Once verified, the transaction is added to a block and included in the blockchain. The block is then added to the chain, and the process repeats.</p>
        
        <p class="mb-4">This decentralized nature of blockchain technology ensures that transactions are secure and tamper-proof, as any attempt to alter a block would require the consensus of the entire network.</p>
      `,
    relatedPosts: [
      {
        id: "1",
        title: "Understanding Rug Pulls: How to Identify and Avoid Them",
        slug: "understanding-rug-pulls"
      },
      {
        id: "7",
        title: "Top Crypto News of the Week",
        slug: "crypto-news-weekly"
      }
    ]
  }
});
