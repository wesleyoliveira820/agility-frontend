import { Link } from 'react-router-dom';
import LottiePlayer from 'react-lottie-player';
import { Animated } from 'react-animated-css';

import { Container, ModalContainer } from './styles';
import checkAnimation from '../../../assets/register/check-animation.json';

function Modal() {
  return (
    <Container>
      <Animated animationIn="bounceIn" animationOut="bounceOut" isVisible>
        <ModalContainer>
          <LottiePlayer
            animationData={checkAnimation}
            loop={false}
            play
            style={{ width: 115, height: 115 }}
          />
          <h6>Sua conta foi criada com sucesso!</h6>
          <p>Agora falta pouco...Enviamos um email de verificação para a sua caixa de entrada.</p>
          <Link to="/login">
            <button type="button">Entendi!</button>
          </Link>
        </ModalContainer>
      </Animated>
    </Container>
  );
}

export default Modal;
