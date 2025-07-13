import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for efficient hotel housekeeping management.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <p className="text-sm text-muted-foreground">
            © 2025 Prince De Galles, Paris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 