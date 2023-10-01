export const ConstantUtil = {
  GENERATE_TOKEN: 'generate_token',
} as const;

export type TypeUtil = typeof ConstantUtil;
export type ChannelUtil = (typeof ConstantUtil)[keyof typeof ConstantUtil];
