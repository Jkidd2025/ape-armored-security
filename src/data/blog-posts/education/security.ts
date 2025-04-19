import { BlogPostData } from "@/types/blogTypes";

export const getSecurityPosts = (): Record<string, BlogPostData> => ({
  "crypto-rug-pulls": {
    title: "Crypto Rug Pulls: A Deep Dive into Deceptive Practices",
    publishDate: "April 19, 2025",
    author: "ApeArmor Security Team",
    readTime: "8 min",
    category: "Education",
    imageUrl: "/lovable-uploads/50c3c6ba-b7be-4937-8f4c-f75237cb7c15.png",
    content: `
        <p class="mb-4">In the rapidly evolving world of cryptocurrency, "rug pulls" have become one of the most notorious forms of fraud. Let's explore what they are, how they work, and most importantly, how to protect yourself.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">What is a Rug Pull?</h2>
        <p class="mb-4">A rug pull occurs when cryptocurrency project developers abandon the project and run away with investors' funds. The term comes from the phrase "pulling the rug out from under someone," as victims are left with worthless tokens and empty promises.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Common Types of Rug Pulls</h2>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Liquidity Stealing: Developers remove all liquidity from the trading pool</li>
          <li>Selling Pressure: Team dumps large amounts of tokens, crashing the price</li>
          <li>Limited Sell Access: Investors can't sell their tokens due to contract restrictions</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Warning Signs</h2>
        <p class="mb-4">Watch out for these red flags:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Anonymous team members with no verifiable background</li>
          <li>Unrealistic promises of returns</li>
          <li>Aggressive marketing with little substance</li>
          <li>No lock-up period for team tokens</li>
          <li>Unaudited smart contracts</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Protection Strategies</h2>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Research the team thoroughly</li>
          <li>Check if the smart contract is audited</li>
          <li>Verify token distribution and vesting schedules</li>
          <li>Look for locked liquidity</li>
          <li>Use tools like ApeArmor for project verification</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Recovery and Reporting</h2>
        <p class="mb-4">If you've fallen victim to a rug pull:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Document all transactions and communications</li>
          <li>Report to relevant authorities</li>
          <li>Share information with the community to warn others</li>
          <li>Consider legal action if the team is identified</li>
        </ul>
        
        <p class="mb-4">Remember, in the crypto space, if something seems too good to be true, it probably is. Always DYOR (Do Your Own Research) and consider using protection services like ApeArmor to safeguard your investments.</p>
      `,
    relatedPosts: [
      {
        id: "1",
        title: "Understanding Rug Pulls: How to Identify and Avoid Them",
        slug: "understanding-rug-pulls"
      },
      {
        id: "2",
        title: "Smart Contracts: The Building Blocks of Web3",
        slug: "smart-contracts-basics"
      }
    ]
  },
  "understanding-rug-pulls": {
    title: "Understanding Rug Pulls: How to Identify and Avoid Them",
    publishDate: "April 10, 2025",
    author: "ApeArmor Security Team",
    readTime: "5 min",
    category: "Security",
    imageUrl: "/lovable-uploads/50c3c6ba-b7be-4937-8f4c-f75237cb7c15.png",
    content: `
        <p class="mb-4">The crypto space is filled with opportunities, but also with risks. One of the most notorious risks is the "rug pull" - a type of scam where developers abandon a project and run away with investors' funds.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">What is a Rug Pull?</h2>
        <p class="mb-4">A rug pull occurs when crypto developers create what appears to be a legitimate cryptocurrency project, build community interest and investment, then disappear with the investors' money, leaving them with worthless tokens.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Common Signs of a Potential Rug Pull</h2>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Anonymous team with no verifiable backgrounds</li>
          <li>Unrealistic promises of returns</li>
          <li>Lack of clear roadmap or whitepaper</li>
          <li>No code audits from reputable security firms</li>
          <li>Limited or locked liquidity</li>
          <li>Aggressive marketing tactics with little substance</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">How ApeArmor Protects You</h2>
        <p class="mb-4">ApeArmor's protection services are designed to identify these warning signs before you invest. Our team conducts thorough analyses of project fundamentals, team credibility, code security, and tokenomics to provide you with comprehensive protection against potential rug pulls.</p>
        
        <p class="mb-4">By subscribing to ApeArmor, you get access to:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Real-time alerts about suspicious projects</li>
          <li>Detailed security reports for projects you're interested in</li>
          <li>Claims process if you're affected despite our protection</li>
          <li>Educational resources to help you spot scams yourself</li>
        </ul>
        
        <p class="mb-4">Remember, the best defense against rug pulls is education and vigilance. Stay informed, do your research, and consider ApeArmor as your extra layer of security in the unpredictable world of cryptocurrency.</p>
      `,
    relatedPosts: [
      {
        id: "3",
        title: "Smart Contract Audits: Why They Matter for Every Project",
        slug: "smart-contract-audits"
      }
    ]
  },
  "crypto-honey-pots": {
    title: "Crypto Honey Pots: Understanding the Sweet Deception",
    publishDate: "April 19, 2025",
    author: "ApeArmor Security Team",
    readTime: "6 min",
    category: "Education",
    imageUrl: "/lovable-uploads/1fdcab54-9edc-464a-82be-259d2cc25a0d.png",
    content: `
        <p class="mb-4">In the world of cryptocurrency, honey pots are sophisticated scams designed to lure investors with attractive opportunities, only to trap their funds through malicious smart contract code. Let's explore how these deceptive schemes work and how to avoid them.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">What is a Crypto Honey Pot?</h2>
        <p class="mb-4">A crypto honey pot is a smart contract deliberately designed with malicious code that prevents investors from selling their tokens or withdrawing their funds. The name comes from the concept of a trap baited with "honey" to attract victims.</p>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">How Honey Pots Work</h2>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Attractive Marketing: Projects present compelling tokenomics and rewards</li>
          <li>Buy Function Works: Users can successfully purchase tokens</li>
          <li>Hidden Restrictions: Sell functions are blocked or limited to specific addresses</li>
          <li>False Security: May show verified contract code but hide malicious functions</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Common Types of Honey Pots</h2>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Buy-Only Contracts: Users can buy but not sell tokens</li>
          <li>Balance Manipulators: Contracts that show false wallet balances</li>
          <li>Fee Traps: Excessive selling fees that make transactions impossible</li>
          <li>Owner-Only Sells: Only specific addresses can execute sell functions</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">How to Identify Honey Pots</h2>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Check contract verification and audit status</li>
          <li>Review transaction history for successful sells by non-team wallets</li>
          <li>Use honey pot checker tools and ApeArmor's security analysis</li>
          <li>Look for unusual restrictions in the contract code</li>
          <li>Verify the liquidity lock status and ownership renouncement</li>
        </ul>
        
        <h2 class="text-2xl font-bold mt-8 mb-4">Protection Strategies</h2>
        <p class="mb-4">To avoid honey pot scams:</p>
        <ul class="list-disc pl-6 mb-6 space-y-2">
          <li>Always use ApeArmor's contract analysis tools</li>
          <li>Test with small amounts before large investments</li>
          <li>Check community feedback and transaction patterns</li>
          <li>Be wary of projects with unusually high rewards</li>
          <li>Verify the development team's credibility</li>
        </ul>
        
        <p class="mb-4">Remember, if a crypto project's promises seem too good to be true, approach with extreme caution. Always use protection tools like ApeArmor to analyze smart contracts before investing.</p>
      `,
    relatedPosts: [
      {
        id: "1",
        title: "Crypto Rug Pulls: A Deep Dive into Deceptive Practices",
        slug: "crypto-rug-pulls"
      },
      {
        id: "2",
        title: "Smart Contracts: The Building Blocks of Web3",
        slug: "smart-contracts-basics"
      }
    ]
  }
});
