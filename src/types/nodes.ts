export type InputType = 'Text' | 'File';
export type OutputType = 'Text' | 'Image';

export interface InputNodeData {
  id: string;
  nodeType: 'customInput';
  inputName?: string;
  inputType?: InputType;
}

export interface OutputNodeData {
  id: string;
  nodeType: 'customOutput';
  outputName?: string;
  outputType?: OutputType;
}

export interface TextNodeData {
  id: string;
  nodeType: 'text';
  text?: string;
}

export interface LlmNodeData {
  id: string;
  nodeType: 'llm';
}

export type AnyNodeData = InputNodeData | OutputNodeData | TextNodeData | LlmNodeData;