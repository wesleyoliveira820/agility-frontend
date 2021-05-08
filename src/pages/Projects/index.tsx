import { useAuth } from '../../contexts/auth-context';

function Projects() {
  const { user } = useAuth();

  return (
    <h2>
      Olá,
      {' '}
      {user.name}
      !
    </h2>
  );
}

export default Projects;
