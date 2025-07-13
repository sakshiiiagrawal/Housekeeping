import React, { useState } from 'react';
import CustomPopup from './CustomPopup'; // Import the new custom popup
import { Badge } from '@/components/ui/badge';

interface StatusBadgeWithDialogProps {
  label: string;
  value: number | string;
  dialogTitle: string;
  dialogDescription: string;
  dialogContent: React.ReactNode; // The content to display inside the dialog
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  onClick?: () => void; // Optional click handler for the badge area if needed outside dialog trigger
}

const StatusBadgeWithDialog: React.FC<StatusBadgeWithDialogProps> = ({
  label,
  value,
  dialogTitle,
  dialogDescription,
  dialogContent,
  badgeVariant = "outline",
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenChange = (newOpenState: boolean) => {
    console.log(`Popup for ${label} changing to: ${newOpenState}`);
    setIsOpen(newOpenState);
  };

  return (
    <div 
      className="flex flex-col items-center space-y-2 p-4 bg-muted rounded-lg cursor-pointer hover:bg-muted/80 transition-colors"
      onClick={() => handleOpenChange(true)}
    >
      <Badge variant={badgeVariant} className="text-xs">
        {label}
      </Badge>
      <div className="text-lg font-semibold text-primary">
        {value}
      </div>

      <CustomPopup
        isOpen={isOpen}
        onClose={() => handleOpenChange(false)}
        title={dialogTitle}
        description={dialogDescription}
      >
        {dialogContent}
      </CustomPopup>
    </div>
  );
};

export default StatusBadgeWithDialog; 