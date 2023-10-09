type TTagList = {
  items: string[];
};

export default function TagList({ items }: TTagList) {
  return (
    <ul className='flex flex-row'>
      {items.length > 0 &&
        items.map((item, idx) => (
          <li
            key={`${idx}_${item}`}
            className='mr-1 rounded-sm bg-blue-100 px-2 text-xs text-blue-600'
          >
            {item}
          </li>
        ))}
    </ul>
  );
}
