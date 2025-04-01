
const Tokenomics = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-apearmor-teal">5. Tokenomics</h2>
      <p className="mb-4">
        The ApeArmor ecosystem is powered by our native token, which serves multiple purposes within our platform.
      </p>
      
      <h3 className="text-xl font-semibold mt-6 mb-3">5.1 Token Utility</h3>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li><strong>Protection Eligibility:</strong> Minimum token holdings are required for each protection package</li>
        <li><strong>Governance:</strong> Token holders can participate in community governance decisions</li>
        <li><strong>Fee Reduction:</strong> Holding tokens reduces service fees</li>
        <li><strong>Staking Rewards:</strong> Token staking provides additional benefits</li>
      </ul>
      
      <h3 className="text-xl font-semibold mt-6 mb-3">5.2 Token Distribution</h3>
      <p className="mb-4">
        The total supply of ApeArmor tokens is capped at 1 billion, with the following distribution:
      </p>
      <ul className="list-disc pl-6 space-y-2 mb-4">
        <li>40% - Public Sale & Community Distribution</li>
        <li>25% - Protection Pool Reserves</li>
        <li>15% - Team & Advisors (vested over 24 months)</li>
        <li>10% - Marketing & Partnerships</li>
        <li>10% - Ecosystem Development & Future Expansion</li>
      </ul>
    </section>
  );
};

export default Tokenomics;
