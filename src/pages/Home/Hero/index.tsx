import { FormEvent, ChangeEvent, useState } from 'react';

import { useEmail } from '../../../contexts/email-context';

import { Container, Content, Form } from './styles';
import illustration from '../../../assets/home/illustration.png';

function Hero() {
  const { handleEmail } = useEmail();
  const [email, setEmail] = useState('');

  function onSubmitForm(event: FormEvent) {
    event.preventDefault();

    if (!email) return;

    handleEmail(email);
  }

  function onChangeInput(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
  }

  return (
    <Container>
      <Content>
        <h3>
          Crie e gerencie seus projetos de forma ágil e escalável
        </h3>
        <p className="description">
          Com uma plataforma de gerenciamento de tarefas no modelo kanban,
          transforme a experiência de planejamento da sua equipe.
        </p>
        <Form onSubmit={onSubmitForm}>
          <input
            name="email"
            type="email"
            placeholder="Email"
            onChange={onChangeInput}
            value={email}
            spellCheck={false}
          />
          <button type="submit">Criar conta</button>
        </Form>
        <p className="description">Experimente, é grátis</p>
      </Content>
      <img
        src={illustration}
        alt="illustration"
        id="illustration"
        draggable={false}
      />
    </Container>
  );
}

export default Hero;
