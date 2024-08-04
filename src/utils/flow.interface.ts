export interface FlowRoot {
  flow: Flow;
}

export interface Flow {
  name: string;
  initWord: string;
  steps: Step[];
}

export interface Step {
  id: string;
  stepType: string;
  actions: Action[];
}

export interface Action {
  id: string;
  type: string;
  content?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  data?: Daum[];
}

export interface Daum {
  title: string;
  rows: Row[];
}

export interface Row {
  title: string;
  description: string;
}
