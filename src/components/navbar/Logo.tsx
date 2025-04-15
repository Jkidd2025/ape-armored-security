
import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <Link to="/">
        <img 
          src="/lovable-uploads/e90abdba-dcb2-49b7-b896-f8d7a491bc5c.png" 
          alt="ApeArmor Logo" 
          className="h-10 w-10 md:h-14 md:w-14" 
        />
      </Link>
      <Link to="/" className="text-lg md:text-xl font-bold text-gradient-gold">ApeArmor</Link>
    </div>
  );
};

export default Logo;
