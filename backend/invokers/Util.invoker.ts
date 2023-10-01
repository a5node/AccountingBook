import { InvokerBase } from './InvokerBase';
import { ChannelUtil, ReqError, ConstantUtil } from '../types';

export class UtilInvoker extends InvokerBase<ChannelUtil> {
  constructor() {
    super();
  }

  public generateToken = async (): Promise<string | Partial<ReqError>> => {
    return await this.invoker<undefined, string | Partial<ReqError>>(ConstantUtil.GENERATE_TOKEN);
  };
}
