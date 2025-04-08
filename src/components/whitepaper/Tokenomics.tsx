
import TokenUtility from "./tokenomics/TokenUtility";
import TokenBasics from "./tokenomics/TokenBasics";
import TokenAllocation from "./tokenomics/TokenAllocation";
import PresaleOverview from "./tokenomics/PresaleOverview";
import LiquidityPoolSetup from "./tokenomics/LiquidityPoolSetup";
import VestingSchedule from "./tokenomics/VestingSchedule";

const Tokenomics = () => {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-apearmor-teal">5. Tokenomics</h2>
      <p className="mb-4">
        The ApeArmor ecosystem is powered by our native token, which serves multiple purposes within our platform.
      </p>
      
      <TokenUtility />
      <TokenBasics />
      <TokenAllocation />
      <PresaleOverview />
      <LiquidityPoolSetup />
      <VestingSchedule />
    </section>
  );
};

export default Tokenomics;
