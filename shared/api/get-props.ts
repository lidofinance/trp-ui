import { GetServerSideProps } from 'next';
import { loadValidationFile } from './load-validation-file';

export const getProps = (): GetServerSideProps => async () => {
  const validationFile = await loadValidationFile();

  const props = { validationFile };

  return {
    props,
  };
};
