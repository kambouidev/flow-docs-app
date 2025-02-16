declare namespace JSX {
  interface IntrinsicElements {
    'mock-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      testID?: string;
      'data-icon-name'?: string;
      'data-color'?: string;
    };
  }
}
