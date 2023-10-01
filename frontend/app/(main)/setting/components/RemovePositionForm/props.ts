export interface Props {
  reload?: boolean;
  setReload?: {
    on: () => void;
    off: () => void;
    toggle: () => void;
  };
}
