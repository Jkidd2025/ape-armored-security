
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface WalletAvatarProps {
  name: string;
  imageUrl: string;
}

export const WalletAvatar = ({ name, imageUrl }: WalletAvatarProps) => {
  const initials = name.substring(0, 1).toUpperCase();
  
  return (
    <Avatar className="h-6 w-6">
      <AvatarImage 
        src={imageUrl} 
        alt={name} 
        onError={(e) => {
          console.error(`Failed to load avatar image: ${imageUrl}`);
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      <AvatarFallback className="bg-apearmor-darkbronze text-xs">
        {initials}
      </AvatarFallback>
    </Avatar>
  );
};
