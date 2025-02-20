import * as appDom from '../appDom';
import { RuntimeState } from './types';

export interface CreateRuntimeStateParams {
  dom: appDom.AppDom;
}

export default function createRuntimeState({ dom }: CreateRuntimeStateParams): RuntimeState {
  return {
    dom: appDom.createRenderTree(dom),
  };
}
