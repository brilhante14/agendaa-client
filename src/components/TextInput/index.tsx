import React from "react";

import "./styles.css";

interface Props {
  title?: string;
  error?: boolean;
  onChange: ((e: React.ChangeEvent<HTMLInputElement>) => void) | (() => void);
  placeholder: string;
  value?: string;
  isSecure?: boolean;
}

export function TextInput({
  title,
  error,
  onChange,
  placeholder,
  value,
  isSecure,
}: Props) {
  return (
    <div>
      <p className="textInputComponentTitle">{title}</p>
      <input
        className="textInputComponentInput"
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        {...(isSecure && { type: "password" })}
      />
    </div>
  );
}
