export type MicButtonState = "idle" | "hover" | "pressed" | "listening" | "disabled";

export type MicButtonIcon = "mic" | "pause" | "play";

export interface MicButtonProps {
  /**
   * Current state of the button.
   * @default "idle"
   */
  state?: MicButtonState;

  /**
   * Icon to display.
   * @default "mic"
   */
  icon?: MicButtonIcon;
  
  /**
   * Visible diameter in pixels.
   * @default 84
   */
  size?: number;
  
  /**
   * If true, the button is non-interactive and visually muted.
   */
  disabled?: boolean;
  
  /**
   * Click handler for the button.
   */
  onClick?: () => void;
  
  /**
   * Accessibility label.
   */
  ariaLabel?: string;
  
  /**
   * Additional CSS class names.
   */
  className?: string;
}
