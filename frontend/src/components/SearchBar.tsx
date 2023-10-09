import { FormEventHandler } from 'react';

type TSearchBar = {
  onSubmit: FormEventHandler<HTMLFormElement>;
};

export default function SearchBar({ onSubmit }: TSearchBar) {
  return (
    <form onSubmit={onSubmit}>
      <div className='mb-4 flex'>
        <input
          className='mr-2 w-full rounded px-4 py-2'
          name='search'
          placeholder='Search Jobs...'
        />
        <button className='rounded bg-blue-700 px-4 text-white' type='submit'>
          Search
        </button>
      </div>
    </form>
  );
}
