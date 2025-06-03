
export const mapModelToServiceType = (modelId: string) => {
  switch (modelId) {
    case 'virtue-v1':
      return 'rnn';
    case 'virtue-v2':
    case 'llama-transformer':
      return 'transformer';
    default:
      return 'transformer';
  }
};
