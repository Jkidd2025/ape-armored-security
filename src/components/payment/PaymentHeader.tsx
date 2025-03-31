
interface PaymentHeaderProps {
  title: string;
  subtitle: string;
}

const PaymentHeader = ({ title, subtitle }: PaymentHeaderProps) => {
  return (
    <div className="mb-8 text-center">
      <h1 className="text-3xl font-bold mb-2 text-gradient-gold">{title}</h1>
      <p className="text-muted-foreground">{subtitle}</p>
    </div>
  );
};

export default PaymentHeader;
