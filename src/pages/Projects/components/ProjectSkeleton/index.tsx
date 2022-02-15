import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Container, Content } from './styles';

function ProjectSkeleton() {
  return (
    <Container>
      <SkeletonTheme color="#ebebeb">
        <header>
          <Skeleton width={145} height={21} />
        </header>
        <Content>
          <li>
            <div>
              <Skeleton width={100} />
              <Skeleton />
            </div>
            <div className="loader-avatars">
              <Skeleton circle width={32} height={32} />
            </div>
          </li>
          <li>
            <div>
              <Skeleton width={100} />
              <Skeleton />
            </div>
            <div className="loader-avatars">
              <Skeleton circle width={32} height={32} />
            </div>
          </li>
          <li>
            <div>
              <Skeleton width={100} />
              <Skeleton />
            </div>
            <div className="loader-avatars">
              <Skeleton circle width={32} height={32} />
            </div>
          </li>
          <li>
            <div>
              <Skeleton width={100} />
              <Skeleton />
            </div>
            <div className="loader-avatars">
              <Skeleton circle width={32} height={32} />
            </div>
          </li>
          <li>
            <div>
              <Skeleton width={100} />
              <Skeleton />
            </div>
            <div className="loader-avatars">
              <Skeleton circle width={32} height={32} />
            </div>
          </li>
          <li>
            <div>
              <Skeleton width={100} />
              <Skeleton />
            </div>
            <div className="loader-avatars">
              <Skeleton circle width={32} height={32} />
            </div>
          </li>
        </Content>
      </SkeletonTheme>
    </Container>
  );
}

export default ProjectSkeleton;
