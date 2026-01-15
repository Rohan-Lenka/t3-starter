"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";

type PasswordProps = {
  onClick: () => void;
  showPassword: boolean;
  field: any;
  placeholder?: string;
};

const Password = ({
  onClick,
  showPassword,
  field,
  placeholder = "********",
}: PasswordProps) => {
  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        {...field}
      />
      <Button
        className="absolute top-0 right-0 h-full px-3 hover:bg-transparent"
        onClick={onClick}
        size="icon"
        type="button"
        variant="ghost"
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4 text-muted-foreground" />
        ) : (
          <Eye className="h-4 w-4 text-muted-foreground" />
        )}
      </Button>
    </div>
  );
};

export default Password;
