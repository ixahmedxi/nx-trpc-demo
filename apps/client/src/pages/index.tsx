import type { NextPage } from 'next';
import { trpc } from '../utils/trpc';

const Home: NextPage = () => {
  const { data, isLoading, isError, error } = trpc.hello.useQuery({
    text: 'World',
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <main>
      <h1 className="text-blue-500">Hello World</h1>
      <p>{data.greeting}</p>
    </main>
  );
};

export default Home;
