import { ReactNode } from 'react';
import { render } from '@testing-library/react';

import { ThemeProvider } from 'styled-components';
import { Form } from '@unform/web';

import lightTheme from '../../themes/light';
import InputText from './index';

interface WrapperComponentProps {
  children: ReactNode;
}

const WrapperComponent = ({ children }: WrapperComponentProps) => {
  return (
    <ThemeProvider theme={lightTheme}>
      <Form onSubmit={() => {}}>
        {children}
      </Form>
    </ThemeProvider>
  );
};

describe('<InputText />', () => {
  it('should render the component correctly', async () => {
    const { getByPlaceholderText } = render(
      <WrapperComponent>
        <InputText name="field" placeholder="Field" />
      </WrapperComponent>,
    );

    const inputText = getByPlaceholderText('Field');

    expect(inputText).toBeInTheDocument();
    expect(inputText).toHaveStyle(`background-color: ${lightTheme.colors.base.primary}`);
  });

  it('should render component with different background when setting bg property as secondary', () => {
    const { getByPlaceholderText, rerender } = render(
      <WrapperComponent>
        <InputText name="field" placeholder="Field" />
      </WrapperComponent>,
    );

    expect(getByPlaceholderText('Field')).toHaveStyle(`background-color: ${lightTheme.colors.base.primary}`);

    rerender(
      <WrapperComponent>
        <InputText name="field" placeholder="Field" bg="secondary" />
      </WrapperComponent>,
    );

    expect(getByPlaceholderText('Field')).toHaveStyle(`background-color: ${lightTheme.colors.base.secondary}`);
  });
});
